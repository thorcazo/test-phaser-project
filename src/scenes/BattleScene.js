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

    // Estas se sobreescribirían si pongo this.physics.add.group() en la linea siguiente.
    this.enemies = this.add.group()
    this.projectiles = this.add.group()
    this.enemies.children.each(child => {
      const enemy = child
      enemy.setTarget(this.Player)
    })

    this.physics.add.collider(this.projectiles, this.enemies, this.dealDamage, null, this)

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
    this.enemySpawnTimer += delta;
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
            .setScale(0.03)
          const angle = Phaser.Math.Angle.Between(this.Player.x, this.Player.y, enemy.x, enemy.y);

          /* Activar sonido ButtleShot */
          this.audioManager.play('BulletShot');

          // Set the bullet's velocity based on the angle
          bullet.setVelocity(Math.cos(angle) * 1000, Math.sin(angle) * 1000);
          bullet.type = "player";
          bullet.currentWord = this.currentWord;
          bullet.damage = 100;
          this.projectiles.add(bullet);
          this.Player.angle = angle * (180 / Math.PI) + 90;
          this.currentWord = "";
          return;
        }
      });
    }

    this.currentWordText.setText("Current Word: " + this.currentWord);

    /* animacion stars */
    this.stars.tilePositionX += 3;
    this.stars2.tilePositionX += 0.05;

  } // FINAL UPDATE


  /* FUNCIONES EXTRAS
  ==================================== */
  dealDamage(bullet, object) {
    // Destroy the bullet only if the type and the object's texture key are different
    if (bullet.type !== object.texture.key) {
      bullet.destroy();
      // Check if the object is an enemy
      if (object.texture.key === "Enemy") {
        // Decrease the enemy's health by the bullet's damage
        object.health -= bullet.damage;
        // Update the enemy's health text
        object.healthText.text = "Health: " + object.health;
        // Destroy the enemy if its health is <= 0
        if (object.health <= 0) {
          object.healthText.destroy();
          object.wordText.destroy();
          object.destroy();
          this.enemiesKilled += 1;
          console.log(this.enemiesKilled, ' ==> ', this.maxEnemies);


          /* sumar enemigos matados, cuando llega a 5 entonces Gameover */
          if (this.enemiesKilled == this.maxEnemies) {
            this.scene.stop('BattleScene');
            this.scene.start('Gameover');
          }

        }
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
        this.audioManager.play('WrongKey');

      }
    }
  }
  // MOVIDA LA LÓGICA DE CREACIÓN DE ENEMIGOS A UNA FUNCIÓN
  createEnemy() {
    // COMPRUEBA QUE LA PALABRA ESCOGIDA ALEATORIAMENTE NO ESTÁ YA EN EL GRUPO DE ENEMIGOS
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

    // Generate a random y-coordinate for the enemy
    const randomY = Phaser.Math.Between(0, this.game.config.height);
    // Create a new enemy at the specified x and y coordinates
    const enemy = new Enemy(this, window.innerWidth + 20, randomY, "Enemy")
      .setScale(0.6);
    enemy.setAngle(180);
    enemy.wordText.text = palabraAleatoria;

    // Add the enemy to the group
    this.enemies.add(enemy);
    // Reset the enemy spawn timer
    this.enemySpawnTimer = 0;
  }


}
