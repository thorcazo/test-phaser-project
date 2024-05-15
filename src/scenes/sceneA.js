import Player from "../gameObjects/player.js";
import Enemy from "../gameObjects/enemy.js";

export default class SceneA extends Phaser.Scene {

  enemigosMatados = 0;

  constructor() {
    super({ key: "SceneA" });
  }

  preload() {


  }


  create() {
    /* Mostrar la UIScene */
    this.palabras = ["casa", "perro", "luz", "mesa", "parque", "sol", "auto", "flor", "pan", "lago", "pista", "curva", "leche", "ping", "pong", "pica", "rasca"];
    this.scene.launch('UIScene');
    this.enemySpawnTimer = 0;
    this.isFiring = false;
    this.maxEnemies = 5;
    // Control del jugador con teclado. Actualmente no se usa. ->
    // this.keys = this.input.keyboard.addKeys("W,A,S,D,SPACE");
    this.cameras.main.setBackgroundColor('d3d3d3');
    this.Player = new Player(this, 200, 400, "Player")
      .setScale(0.1)
      .setAngle(90)

    this.input.keyboard.on('keydown', this.handlekeyInput, this)
    this.currentKey = null
    this.currentWord = ""

    // **********************************************
    // OPCIÓN DE DEBUG PARA VER LA PALABRA ACTIVA
    this.currentWordText = this.add.text(400, 200, "", {
      fontSize: '16px',
      fill: '#000'
    });
    // ***********************************************

    // Para darle físicas a un objeto podémos añadir physics en el .add (this.physics.add) 
    // y en elo aplicar la lógica de la física usando 'this.body.funcionFísica()' 
    // en cuestión (dar velocidad, gravedad..)

    // En este caso, enemy.js tiene ya funciones que definen su física usando .body.
    // Estas se sobreescribirían si pongo this.physics.add.group() en la linea siguiente.
    this.enemies = this.add.group()
    this.projectiles = this.add.group()
    // this.Enemy = new Enemy(this, 1000, 700, "Enemy")
    //     .setScale(0.1)
    // this.enemies.add(this.Enemy)
    this.enemies.children.each(child => {
      const enemy = child
      enemy.setTarget(this.Player)
    })

    // Physics
    
    // TODO: CAMBIAR EL SISTEMA DE COLISIÓN PARA QUE LA BALA SOLO COLISIONE CON OBJETIVOS QUE COMPARTEN EL MISMO this.currentWord.

    this.physics.add.collider(this.projectiles, this.enemies, this.dealDamage, null, this)
    // this.physics.add.collider(this.projectiles, this.Player, this.dealDamage, null, this)

  }

  dealDamage(bullet, object) {
    // Destroy the bullet only if the type and the object.texture.key isn't the same
    // This way we avoid bullets shot from the player to affect the player
    // Or bullets shot by the enemies affecting the enemies
    // Our bullet now receives the damage and type parameters, which help us tell how fast it is, how much damage it deals and who it affects uppon impact

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
          this.enemigosMatados += 1;

          /* sumar enemigos matados, cuando llega a 5 entonces Gameover */
          // if (this.enemigosMatados == 5) {
          //   this.scene.stop('SceneA');
          //   this.scene.start('Gameover');
          // }

        }
      }
    }
  }



  // Para controlar los updates de los enemigos, esta es la manera comprovada más efectiva para hacerlo comentada por otros desarrolladores; sobretodo si hablamos de grupos indefinidos de muchos enemigos.
  update(time, delta) {

    // /* CONTROL DEL JUGADOR */
    // this.Player.body.setVelocity(0)
    // if (this.keys.A.isDown) {
    //   this.Player.body.setVelocityX(-300);
    // } else if (this.keys.D.isDown) {
    //   this.Player.body.setVelocityX(300);
    // }
    // if (this.keys.W.isDown) {
    //   this.Player.body.setVelocityY(-300);
    // } else if (this.keys.S.isDown) {
    //   this.Player.body.setVelocityY(300);
    // }


    // /* CONTROL de la bala*/
    // if (this.keys.SPACE.isDown && !this.isFiring) {
    //   const bullet = this.physics.add.image(this.Player.x, this.Player.y, "Bullet")
    //     .setScale(0.05)
    //     .setVelocityX(800)
    //   bullet.type = "player"
    //   bullet.damage = 50;
    //   this.projectiles.add(bullet)
    //   this.isFiring = true;
    // }
    // this.input.keyboard.on("keyup-SPACE", () => {
    //   this.isFiring = false;
    // })

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

      // TODO: AÑADIR WOBBLE A LOS ENEMIGOS, HACER QUE SE DESTRUYAN AL IMPACTAR, IMPLEMENTAR GAME OVER


      // angleDiff tampoco es necesario de momento.
      // const angleDiff = Phaser.Math.Angle.Wrap(angleToPlayer - enemy.rotation)
      // Nota: Este cálculo de la velocidad no necesita ser tan complejo. Está pensado para usar setAcceleration y no setVelocity. Se va a quedar así de momento.

      // enemy.setRotation(angleToPlayer)
      // const acceleration = new Phaser.Math.Vector2(
      //     enemy.speed * Math.cos(angleToPlayer),
      //     enemy.speed * Math.sin(angleToPlayer)
      // );
      // enemy.body.setVelocity(acceleration.x, acceleration.y)

      // enemy.body.setAngularVelocity(Phaser.Math.DegToRad(360));
      // enemy.body.setAcceleration((enemy.speed * Math.cos(rotation) * 2), (enemy.speed * Math.sin(rotation) * 2))
      // enemy.body.setVelocityX(enemy.speed * Math.cos(rotation))
      // enemy.body.setVelocityY(enemy.speed * Math.sin(rotation))
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


  } // FINAL UPDATE

  handlekeyInput(event) {
    if (event.key === "Backspace") {
      this.currentWord = "";
    } else {
      this.currentKey = event.key;
      this.currentWord += event.key;
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
    
// GENERA UNA COORDENADA ALEATORIA PARA EL ENEMIGO Y LO AÑADE AL GRUPO
    // Generate a random y-coordinate for the enemy
    const randomY = Phaser.Math.Between(0, this.game.config.height);
    // Create a new enemy at the specified x and y coordinates
    const enemy = new Enemy(this, 1000, randomY, "Enemy")
      .setScale(0.5);
    enemy.setAngle(180);
    enemy.wordText.text = palabraAleatoria;
    console.log(enemy);

    // Add the enemy to the group
    this.enemies.add(enemy);
    // Reset the enemy spawn timer
    this.enemySpawnTimer = 0;
  }
}
