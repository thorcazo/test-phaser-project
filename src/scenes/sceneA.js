import Player from "../gameObjects/player.js";
import Enemy from "../gameObjects/enemy.js";

export default class SceneA extends Phaser.Scene {

  enemigosMatados = 0;
  maximoEnemigos = 5;



  constructor() {
    super({ key: "SceneA" });
  }

  preload() {
  }

  create() {
    this.scene.launch('UIScene');
    document.querySelector('.tabla-jugadores').classList.add('hidden');

    this.enemySpawnTimer = 0;
    this.isFiring = false;
    this.maxEnemies = 5;
    this.keys = this.input.keyboard.addKeys("W,A,S,D,SPACE");
    this.cameras.main.setBackgroundColor('d3d3d3');
    this.Player = new Player(this, 200, 400, "Player")
      .setScale(0.1)
      .setAngle(90)

    this.enemies = this.add.group()
    this.projectiles = this.add.group()
    this.enemies.children.each(child => {
      const enemy = child
      enemy.setTarget(this.Player)
    })

    // Physics
    this.physics.add.collider(this.projectiles, this.enemies, this.dealDamage, null, this)

  }

  dealDamage(bullet, object) {
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
          if (this.enemigosMatados == this.maximoEnemigos) {
            this.scene.stop('SceneA');
            this.scene.start('Gameover');
          }

        }
      }
    }
  }

  update(time, delta) {

    /* CONTROL del jugador */
    this.Player.body.setVelocity(0)
    if (this.keys.A.isDown) {
      this.Player.body.setVelocityX(-300);
    } else if (this.keys.D.isDown) {
      this.Player.body.setVelocityX(300);
    }
    if (this.keys.W.isDown) {
      this.Player.body.setVelocityY(-300);
    } else if (this.keys.S.isDown) {
      this.Player.body.setVelocityY(300);
    }


    /* CONTROL de la bala*/
    if (this.keys.SPACE.isDown && !this.isFiring) {
      const bullet = this.physics.add.image(this.Player.x, this.Player.y, "Bullet")
        .setScale(0.05)
        .setVelocityX(800)
      bullet.type = "player"
      bullet.damage = 50;
      this.projectiles.add(bullet)
      this.isFiring = true;
    }
    this.input.keyboard.on("keyup-SPACE", () => {
      this.isFiring = false;
    })
    var target = this.Player
    this.enemies.getChildren().forEach((enemy) => {
      enemy.healthText.setPosition((enemy.x - 35), (enemy.y + 50));


      enemy.wordText.setPosition((enemy.x - 55), (enemy.y + 50));



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

    this.enemySpawnTimer += delta;
    // Create a new enemy every second if there are less than 5 enemies on the screen
    if (this.enemySpawnTimer >= 1700 && this.enemies.getLength() < this.maxEnemies) {
      // Generate a random y-coordinate for the enemy
      const randomY = Phaser.Math.Between(0, this.game.config.height);
      // Create a new enemy at the specified x and y coordinates
      const enemy = new Enemy(this, 1000, randomY, "Enemy")
        .setScale(0.5);
      enemy.setAngle(180);
      console.log(enemy);

      // Add the enemy to the group
      this.enemies.add(enemy);
      // Reset the enemy spawn timer
      this.enemySpawnTimer = 0;
    }
  } // FINAL UPDATE



  /* FUNCIONES EXTRAS */
  shutdown() {
    // Mostrar la tabla de jugadores cuando la escena ya no está activa
    document.querySelector('.tabla-jugadores').classList.remove('hidden');
  }


}
