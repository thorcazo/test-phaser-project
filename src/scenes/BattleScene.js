import Player from "../gameObjects/player.js";
import Enemy from "../gameObjects/enemy.js";

import { addScore, getScores } from '../utils/firestoreTest.js';

export default class BattleScene extends Phaser.Scene {

  enemiesKilled = 0;
  maxEnemies = 200;
  scorePlayer = 0;

  errorText = 0;

  enemigosEnPantalla = 10;

  enemySpawnThreshold = 5500; // Umbral inicial
  reduceThresholdInterval = 5000; // Intervalo de reducción (2 segundos)
  minSpawnThreshold = 400; // Umbral mínimo para evitar que el juego sea imposible

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
    this.bg = this.add.image(0, 0, 'bg').setOrigin(0, 0);

    /* STARS PARA ANIMACION */
    this.stars = this.add.tileSprite(0, 0, this.cameras.main.width, this.cameras.main.height, 'stars1').setOrigin(0, 0).setAlpha(0.3);
    this.stars2 = this.add.tileSprite(0, 0, this.cameras.main.width, this.cameras.main.height, 'stars2').setOrigin(0, 0);

    /*LOAD MUSIC */
    this.audioManager.play('BattleMusic');

    /* Mostrar ScorePlayer en la parque de arriba izquierda */
    this.scoreText = this.add.text(10, 10, "Score: " + this.scorePlayer, {
      font: "24px PressStart2P",
      fill: "#fff",
    });


    this.textoCentral("¡Prepárate!");

    this.palabras = ["casa", "perro", "luz", "mesa", "parque", "sol", "auto", "flor", "pan", "lago", "pista", "curva", "leche", "ping", "pica", "gato"];
    this.colors = ["#236FE0", "#FFE040", "#E02389", "#E02350"];


    this.scene.launch('UIScene');
    this.enemySpawnTimer = 0;
    this.isFiring = false;
    this.cameras.main.setBackgroundColor('d3d3d3');
    this.Player = new Player(this, 100, this.cameras.main.height / 2, "Player").setScale(0.5).setOrigin(0.5, 0.5).setAngle(90);

    this.input.keyboard.on('keydown', this.handlekeyInput, this);
    this.currentKey = null;

    // **********************************************
    // OPCIÓN DE DEBUG PARA VER LA PALABRA ACTIVA

    /* Marco para currentWordText */
    this.bgCurrentWord = this.add.image(200, this.game.config.height - 100, 'bgCurrentWord');

    this.currentWordText = this.add.text(this.bgCurrentWord.x, this.bgCurrentWord.y + 10, "", {
      font: "24px PressStart2P",
      fill: "#fff",
    }).setOrigin(0.5, 1);
    // ***********************************************

    this.enemies = this.add.group();
    this.projectiles = this.add.group();
    this.enemies.children.each(child => {
      const enemy = child;
      enemy.setTarget(this.Player);
    });

    // Physics
    this.physics.add.overlap(this.projectiles, this.enemies, this.dealDamage, null, this);
    this.physics.add.collider(this.Player, this.enemies, this.takeDamage, null, this);

    // Configurar el temporizador para reducir el umbral de spawn cada 10 segundos
    this.time.addEvent({
      delay: this.reduceThresholdInterval,
      callback: this.reduceSpawnThreshold,
      callbackScope: this,
      loop: true
    });

  } // FINAL CREATE

  update(time, delta) {
    var target = this.Player;
    this.enemies.getChildren().forEach((enemy) => {
      // enemy.healthText.setPosition((enemy.x), (enemy.y + 50));
      enemy.wordText.setPosition((enemy.x), (enemy.y + -60));

      const tx = target.x;
      const ty = target.y;
      const x = enemy.x;
      const y = enemy.y;
      const angleToPlayer = Phaser.Math.Angle.Between(x, y, tx, ty);
      if (enemy.rotation !== angleToPlayer) {
        var delta = angleToPlayer - enemy.rotation;
        if (delta > Math.PI) delta -= Math.PI * 2;
        if (delta < -Math.PI) delta += Math.PI * 2;
        if (delta > 0) {
          enemy.angle += enemy.turn_rate;
        } else {
          enemy.angle -= enemy.turn_rate;
        }
      }
      enemy.body.setVelocityX(enemy.speed * Math.cos(enemy.rotation));
      enemy.body.setVelocityY(enemy.speed * Math.sin(enemy.rotation));
    });

    this.enemySpawnTimer += delta;

    if (this.enemySpawnTimer >= this.enemySpawnThreshold && this.enemies.getLength() < this.maxEnemies) {
      this.createEnemy();
      this.enemySpawnTimer = 0;
    }

    if (this.currentWord !== "") {
      let wordPossible = false;
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
          const bullet = this.physics.add.image(this.Player.x, this.Player.y, "Bullet").setScale(0.05);
          const angle = Phaser.Math.Angle.Between(this.Player.x, this.Player.y, enemy.x, enemy.y);
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

    this.currentWordText.setText(this.currentWord);

    /* Estilar input currentWordText */

    this.stars.tilePositionX += 3;
    this.stars2.tilePositionX += 0.05;

  } // FINAL UPDATE

  dealDamage(bullet, object) {
    if (bullet.type !== object.texture.key) {
      if (object.texture.key === "Enemy") {
        if (object.wordText.text === bullet.currentWord) {
          bullet.destroy();
          object.health -= bullet.damage;
          object.setTint(0xff0000);
          this.time.addEvent({
            delay: 40,
            callback: () => {
              object.clearTint();
            },
            callbackScope: this,
          });
          const originalSpeed = object.speed;
          object.speed = -(originalSpeed * 2);
          this.time.addEvent({
            delay: 200,
            callback: () => {
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
          // object.healthText.text = "Health: " + object.health;
          if (object.health <= 0) {
            // object.healthText.destroy();
            object.wordText.destroy();
            object.destroy();
            this.enemiesKilled += 1;
            this.scorePlayer += 5;
            this.scoreText.setText("Score: " + this.scorePlayer); // Actualizar el texto del puntaje
            console.log(this.enemiesKilled);
          }
        }
      }
    }
  }

  takeDamage(player, enemy) {
    if (enemy.texture.key === "Enemy") {
      enemy.destroy();
      enemy.wordText.destroy();
      player.health -= 1;
      if (player.health <= 0) {
        // Añadir los datos de la partida
        const gameOverData = {
          nombreJugador: "ABC",
          navesDestruidas: this.enemiesKilled,
          erroresCometidos: this.errorText,
          puntuacionTotal: this.scorePlayer
        };

        addScore(gameOverData.nombreJugador, gameOverData.navesDestruidas, gameOverData.erroresCometidos, gameOverData.puntuacionTotal);
        this.scene.pause('BattleScene');
        this.scene.launch('Gameover', gameOverData);
      }
    }
  }

  handlekeyInput(event) {
    // Solo maneja las letras del alfabeto y la tecla Backspace
    if (!/^[a-zA-Z]$/.test(event.key) && event.key !== "Backspace") {
      return;
    }

    if (event.key === "Backspace") {
      // Eliminar la última letra de currentWord
      this.currentWord = this.currentWord.slice(0, -1);
    } else {
      this.currentKey = event.key;
      const isKeyCorrect = this.enemies.getChildren().some((enemy) => enemy.wordText.text.startsWith(this.currentWord + event.key));
      if (isKeyCorrect) {
        this.audioManager.play('NumKey');
        this.currentWord += event.key;
      } else {
        if (this.currentWord !== "") { // Solo reproduce el sonido si hay una palabra actual
          console.log('WrongKey');
          this.currentWord = "";
          this.audioManager.play('WrongKey');
          this.scorePlayer -= 2; // Restar puntos
          this.errorText += 1; // Aumentar el contador de errores
          if (this.scorePlayer < 0) {
            this.scorePlayer = 0; // Evitar puntaje negativo
          }
          this.scoreText.setText("Score: " + this.scorePlayer); // Actualizar el texto del puntaje
        }
      }
    }

    // Actualizar el texto de currentWord
    this.currentWordText.setText(this.currentWord);
  }







  createEnemy() {
    if (this.enemies.getLength() < this.enemigosEnPantalla) {
      let palabraAleatoria = this.palabras[Math.floor(Math.random() * this.palabras.length)];
      let palabraUnica = true;
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
      let colorAleatorio = this.colors[Math.floor(Math.random() * this.colors.length)];
      const randomY = Phaser.Math.Between(0, this.game.config.height);
      const enemy = new Enemy(this, this.game.config.width + 20, randomY, "Enemy").setScale(0.3);
      enemy.setAngle(180);
      this.randomizarPalabra(enemy, palabraAleatoria, colorAleatorio);
      this.enemies.add(enemy);
      this.enemySpawnTimer = 0;
    }
  }

  // TODO: randomizarPalabra no comprueba si la palabra ya está.
  randomizarPalabra(enemy, palabra = null, color = null) {
    let palabraAleatoria = palabra || this.palabras[Math.floor(Math.random() * this.palabras.length)];
    let colorAleatorio = color || this.colors[Math.floor(Math.random() * this.colors.length)];
    let palabraUnica = true;
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
    enemy.wordText.setText(palabraAleatoria);
    enemy.wordText.setStyle({ backgroundColor: colorAleatorio });
  }


  textoCentral(texto) {
    for (let i = 0; i < 4; i++) {
      const textObject = this.add.text(this.game.config.width / 2, this.game.config.height / 2, texto, {
        font: '64px PressStart2P',
        fill: '#fff'
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

  /* mecanica para reducir el tiempo de spawnEnemy */
  reduceSpawnThreshold() {
    if (this.enemySpawnThreshold > this.minSpawnThreshold) {
      this.enemySpawnThreshold -= 200; // Reduce el umbral en 200 ms cada 10 segundos
      if (this.enemySpawnThreshold < this.minSpawnThreshold) {
        this.enemySpawnThreshold = this.minSpawnThreshold;
      }
      console.log('Nuevo umbral de spawn: ' + this.enemySpawnThreshold);
    } else {
      console.log('Umbral de spawn mínimo alcanzado');
    }
  }


}
