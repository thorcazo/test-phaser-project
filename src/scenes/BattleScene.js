import Player from "../gameObjects/player.js";
import Enemy from "../gameObjects/enemy.js";

export default class BattleScene extends Phaser.Scene {

  enemiesKilled = 0;
  maxEnemies = 200;

  constructor() {
    super({ key: "BattleScene" });
  }

  preload() {
  }

  init(data) {
    this.audioManager = data.audioManager;
  }

  create() {

    /* IMAGEN FONDO */
    this.bg = this.add.image(0, 0, 'bg')
      .setOrigin(0, 0)

    /* STARS PARA ANIMACION */
    this.stars = this.add.tileSprite(0, 0, this.cameras.main.width, this.cameras.main.height, 'stars1')
      .setOrigin(0, 0)
      .setAlpha(0.3)

    this.stars2 = this.add.tileSprite(0, 0, this.cameras.main.width, this.cameras.main.height, 'stars2')
      .setOrigin(0, 0)


    /*LOAD MUSIC */
    this.audioManager.play('BattleMusic');

    this.palabras = ["casa", "perro", "luz", "mesa", "parque", "sol", "auto", "flor", "pan", "lago", "pista", "curva", "leche", "ping", "pong", "pica", "rasca"];

    this.scene.launch('UIScene');
    this.enemySpawnTimer = 0;
    this.isFiring = false;
    this.cameras.main.setBackgroundColor('d3d3d3');
    this.Player = new Player(this, 200, 400, "Player")
      .setScale(0.5)
      .setAngle(90)


    this.input.keyboard.on('keydown', this.handlekeyInput, this)
    this.currentKey = null
    this.currentWord = ""

    // **********************************************
    // OPCIÓN DE DEBUG PARA VER LA PALABRA ACTIVA
    this.currentWordText = this.add.text(100, 50, "", {
      fontSize: '24px',
      fill: '#fff'
    });
    // ***********************************************

    // Para darle físicas a un objeto podémos añadir physics en el .add (this.physics.add) 
    // y en elo aplicar la lógica de la física usando 'this.body.funcionFísica()' 
    // en cuestión (dar velocidad, gravedad..)

    // En este caso, enemy.js tiene ya funciones que definen su física usando .body.
    // Estas se sobreescribirían si pongo this.physics.add.group() en la linea siguiente.
    this.enemies = this.add.group()
    this.projectiles = this.add.group()
    this.enemies.children.each(child => {
      const enemy = child
      enemy.setTarget(this.Player)
    })

    // Physics
    this.physics.add.overlap(this.projectiles, this.enemies, this.dealDamage, null, this)
    this.physics.add.collider(this.Player, this.enemies, this.takeDamage, null, this)

  } // FINAL CREATE

  /* UPDATE
  =========================== */
  update(time, delta) {

    var target = this.Player
    // Iterate through all enemies and update their healthText positions
    this.enemies.getChildren().forEach((enemy) => {
      enemy.healthText.setPosition((enemy.x - 35), (enemy.y + 50));
      enemy.wordText.setPosition((enemy.x - 20), (enemy.y + -80));

      const tx = target.x
      const ty = target.y
      const x = enemy.x
      const y = enemy.y
      const angleToPlayer = Phaser.Math.Angle.Between(x, y, tx, ty)
      if (enemy.rotation !== angleToPlayer) {
        var delta = angleToPlayer - enemy.rotation
        if (delta > Math.PI) delta -= Math.PI * 2
        if (delta < -Math.PI) delta += Math.PI * 2
        if (delta > 0) {
          enemy.angle += enemy.turn_rate
        } else {
          enemy.angle -= enemy.turn_rate
        }
      }
      enemy.body.setVelocityX(enemy.speed * Math.cos(enemy.rotation))
      enemy.body.setVelocityY(enemy.speed * Math.sin(enemy.rotation))

    });
    // LÓGICA DE CREACIÓN DE ENEMIGOS
    this.time.addEvent({
      delay: 4000,
      callback: () => {
        this.enemySpawnTimer += delta;
      },
      callbackScope: this,
    });
    // this.enemySpawnTimer += delta;
    // Create a new enemy every second if there are less than 5 enemies on the screen
    if (this.enemySpawnTimer >= 1700 && this.enemies.getLength() < this.maxEnemies) {
      this.createEnemy()
    }

    // LÓGICA DE ESCRITURA
    if (this.currentWord !== "") {
      let wordPossible = false
      this.enemies.getChildren().forEach((enemy) => {
        if (enemy.wordText.text.startsWith(this.currentWord)) {
          wordPossible = true;
          return;
        }
        return;
      });
      if (!wordPossible) {
        this.currentWord = "";
      }
      this.enemies.getChildren().forEach((enemy) => {
        if (this.currentWord === enemy.wordText.text) {
          const bullet = this.physics.add.image(this.Player.x, this.Player.y, "Bullet")
            .setScale(0.05)
          const angle = Phaser.Math.Angle.Between(this.Player.x, this.Player.y, enemy.x, enemy.y);
          // Set the bullet's velocity based on the angle
          bullet.setVelocity(Math.cos(angle) * 800, Math.sin(angle) * 800);
          bullet.type = "player";
          bullet.currentWord = this.currentWord;
          bullet.damage = 50;
          this.projectiles.add(bullet);
          this.Player.angle = angle * (180 / Math.PI) + 90;
          this.currentWord = "";
          return;
        }
      });
    }

    this.currentWordText.setText("Current Word: " + this.currentWord);

    /* Animación de STARS para el fondo */
    this.stars.tilePositionX += 3;
    this.stars2.tilePositionX += 0.05;

  } // FINAL UPDATE


  /* FUNCIONES EXTRAS
  ==================================== */
  dealDamage(bullet, object) {
    // Destroy the bullet only if the type and the object.texture.key isn't the same
    // This way we avoid bullets shot from the player to affect the player
    // Or bullets shot by the enemies affecting the enemies
    // Our bullet now receives the damage and type parameters, which help us tell how fast it is, how much damage it deals and who it affects uppon impact

    // Destroy the bullet only if the type and the object's texture key are different
    if (bullet.type !== object.texture.key) {
      // Check if the object is an enemy
      if (object.texture.key === "Enemy") {
        if (object.wordText.text === bullet.currentWord) {
          bullet.destroy();
          // Decrease the enemy's health by the bullet's damage
          object.health -= bullet.damage;
          // EL ENEMIGO PARPADEA DURANTE 0.04 SEGUNDOS
          object.setTint(0xff0000);
          this.time.addEvent({
            delay: 40,
            callback: () => {
              object.clearTint();
            },
            callbackScope: this,
          });
          // EL ENEMIGO SE ATURDE MOMENTANEAMENTE
          const originalSpeed = object.speed;
          object.speed = -(originalSpeed * 2)
          // object accelerates in the opposite direction
          this.time.addEvent({
            delay: 200,
            callback: () => {
              // Gradually accelerate the enemy back to its original speed
              this.tweens.add({
                targets: object,
                speed: originalSpeed,
                ease: 'Linear',
                duration: 500,
              });
            },
            callbackScope: this,
          });
          this.randomizarPalabra(object);
          // Update the enemy's health text
          object.healthText.text = "Health: " + object.health;
          // Destroy the enemy if its health is <= 0
          if (object.health <= 0) {
            object.healthText.destroy();
            object.wordText.destroy();
            object.destroy();
            this.enemigosMatados += 1;

          }

        }
      }
    }
  }

  takeDamage(player, enemy) {
    if (enemy.texture.key === "Enemy") {
      enemy.destroy();
      enemy.healthText.destroy();
      enemy.wordText.destroy();
      player.health -= 1;
      player.healthText.text = "Health: " + player.health;
      if (player.health <= 0) {
        this.scene.pause('BattleScene');
        this.scene.launch('Gameover');
      }
    }
  }


  handlekeyInput(event) {
    if (event.key === "Backspace") {
      this.currentWord = "";
    } else {
      this.currentKey = event.key;
      const isKeyCorrect = this.enemies.getChildren().some((enemy) => enemy.wordText.text.startsWith(this.currentWord + event.key));
      if (isKeyCorrect) {
        this.audioManager.play('NumKey');
        this.currentWord += event.key;
      } else {
        console.log('WrongKey');
        this.currentWord = "";
        this.audioManager.play('WrongKey');

      }
    }
  }
  // MOVIDA LA LÓGICA DE CREACIÓN DE ENEMIGOS A UNA FUNCIÓN
  createEnemy() {
    // Verifica si el número actual de enemigos es menor a 10
    if (this.enemies.getLength() < 10) {
      // COMPRUEBA QUE LA PALABRA ESCOGIDA ALEATORIAMENTE NO ESTÁ YA EN EL GRUPO DE ENEMIGOS
      let palabraAleatoria = this.palabras[Math.floor(Math.random() * this.palabras.length)];
      let palabraUnica = true;
      this.enemies.getChildren().forEach((enemy) => {
        if (enemy.wordText.text === palabraAleatoria) {
          palabraUnica = false;
          while (!palabraUnica) {
            palabraAleatoria = this.palabras[Math.floor(Math.random() * this.palabras.length)];
            palabraUnica = true;
            this.enemies.getChildren().forEach((enemy) => {
              if (enemy.wordText.text === palabraAleatoria) {
                palabraUnica = false;
              }
            });
          }
        }
      });
  
      // GENERA UNA COORDENADA ALEATORIA PARA EL ENEMIGO Y LO AÑADE AL GRUPO
      const randomY = Phaser.Math.Between(0, this.game.config.height);
      const enemy = new Enemy(this, 1000, randomY, "Enemy")
        .setScale(0.4);
      enemy.setAngle(180);
      this.randomizarPalabra(enemy);
  
      // Añade el enemigo al grupo
      this.enemies.add(enemy);
      // Reinicia el temporizador de spawn de enemigos
      this.enemySpawnTimer = 0;
    }
  }


  // ESTE MÉTODO SE ACTIVA SI UN EFECTO FUESE A RANDOMIZAR LA PALABRA DE UN ENEMIGO EXISTENTE.
  // EN UN FUTURO MECÁNICAS MÁS COMPLEJAS PODRÍAN PASARLE UN PARÁMETRO ESPECIAL DE CONFIGURACIÓN
  // (Ej. un poder que cambie todas las palabras a la misma palabra o bajen la dificultad de las palabras)

  randomizarPalabra(enemy) {
    let palabraAleatoria = this.palabras[Math.floor(Math.random() * this.palabras.length)]
    let palabraUnica = true

    this.enemies.getChildren().forEach((enemy) => {
      if (enemy.wordText.text === palabraAleatoria) {
        palabraUnica = false;
        while (!palabraUnica) {
          palabraAleatoria = this.palabras[Math.floor(Math.random() * this.palabras.length)]
          palabraUnica = true
          this.enemies.getChildren().forEach((enemy) => {
            if (enemy.wordText.text === palabraAleatoria) {
              palabraUnica = false;
            }
          });
        }
      }
    });
    enemy.wordText.text = palabraAleatoria;
  }




  /* añadir texto central para el comienzo de la batalla */
  textoCentral(texto) {
    for (let i = 0; i < 4; i++) {
      const textObject = this.add.text(this.game.config.width / 2, this.game.config.height / 2, texto, {
        fontSize: '32px',
        fill: '#000'
      });
      textObject.setOrigin(0.5);
      this.time.addEvent({
        delay: 2000,
        callback: () => {
          textObject.destroy();
        },
        callbackScope: this,
      });
    }
  }


}
