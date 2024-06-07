import Player from "../gameObjects/player.js";
import Enemy from "../gameObjects/enemy.js";
import { getDataEnemies, getWordsEnemies, getTopPlayers } from '../utils/firestore.js';

export default class BattleScene extends Phaser.Scene {

  maxEnemies = 1000;
  enemiesKilled = 0;
  scorePlayer = 0;
  errorText = 0;

  enemigosEnPantalla;

  enemySpawnThreshold = 0; // Umbral inicial
  reduceThresholdInterval = 10000; // Intervalo de reducción (2 segundos)
  minSpawnThreshold = 200; // Umbral mínimo para evitar que el juego sea imposible

  palabras = [];
  colors = [];

  constructor() {
    super({ key: "BattleScene" });
  }

  preload() {

  }

  init(data) {
    this.audioManager = data.audioManager;
    this.enemigosEnPantalla = 10;
    this.bulletVelocity = 1000;

    // umbral de spawn de enemigos
    this.enemySpawnThreshold = 2000;

    /* si BattleMusic esta sinlenciado entonces desinlenciar */
    if (this.audioManager.isPlaying('BattleMusic')) {
      this.audioManager.unmute('BattleMusic');

    }
  }

  async create() {

    /* IMAGEN FONDO */
    this.bg = this.add.image(0, 0, 'bg').setOrigin(0, 0);

    /* STARS PARA ANIMACION */
    this.stars = this.add.tileSprite(0, 0, this.cameras.main.width, this.cameras.main.height, 'stars1').setOrigin(0, 0).setAlpha(0.3);
    this.stars2 = this.add.tileSprite(0, 0, this.cameras.main.width, this.cameras.main.height, 'stars2').setOrigin(0, 0);

    /*Cargar musica del archivo llamado "battleMusic" -> Cargará la canción de la escena */
    this.audioManager.play('BattleMusic');

    /* Mostrar ScorePlayer en la parte de arriba izquierda */
    this.scoreText = this.add.text(50, 40, "PUNTUACIÓN: " + this.scorePlayer, {
      font: "16px PressStart2P",
      fill: "#fff",
    });

    this.textoCentral("¡Prepárate!");
    this.cargarDatos();

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

          if (this.scorePlayer > 100) {
            this.bulletVelocity = 2000;
          }

          bullet.setVelocity(Math.cos(angle) * this.bulletVelocity, Math.sin(angle) * this.bulletVelocity);
          bullet.type = "player";
          bullet.currentWord = this.currentWord;
          bullet.damage = 50;

          if (this.scorePlayer > 100) {
            bullet.damage = 100;
          }

          this.projectiles.add(bullet);
          this.Player.angle = angle * (180 / Math.PI) + 90;
          this.currentWord = "";
          return;
        }
      });
    }

    this.currentWordText.setText(this.currentWord);

    this.stars.tilePositionX += 3;
    this.stars2.tilePositionX += 0.05;

  } // FINAL UPDATE

  dealDamage(bullet, object) {
    if (bullet.type !== object.texture.key) {
      if (object.texture.key.startsWith("Enemy")) {
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
          if (object.health <= 0) {
            object.wordText.destroy();
            object.destroy();
            this.enemiesKilled += 1;


            const enemyPoints = object.points ? parseInt(object.points) : 0;

            this.scorePlayer += enemyPoints;

            this.scoreText.setText("PUNTUACIÓN: " + this.scorePlayer); // Actualizar el texto del puntaje
            if (this.enemiesKilled >= this.maxEnemies) {
              let battleSceneData = {
                nombreJugador: "ABC",
                navesDestruidas: this.enemiesKilled ? this.enemiesKilled : 0,
                erroresCometidos: this.errorText ? this.errorText : 0,
                puntuacionTotal: this.scorePlayer ? this.scorePlayer : 0
              };

              this.scene.pause('BattleScene');
              this.audioManager.stop('BattleMusic');

              const topPlayers = getTopPlayers();

              topPlayers.then((players) => {
                if (players.length < 10 || battleSceneData.puntuacionTotal > players[players.length - 1].totalScore) {
                  this.scene.launch('leaderboardScene', { playerData: battleSceneData });
                } else {
                  this.scene.launch('Gameover', { playerData: battleSceneData });
                }
              });
            }
          }
        }
      }
    }
  }



  //TAKEDAMAGE -> TERMINAR PARTIDA e ir a GAMEOVER o a LEADERBOARD
  takeDamage(player, enemy) {
    if (enemy.texture.key.startsWith("Enemy")) {
      enemy.destroy();
      enemy.wordText.destroy();
      player.health -= 1;
      if (player.health <= 0) {
        // Añadir los datos de la partida
        let battleSceneData = {
          nombreJugador: "ABC",
          navesDestruidas: this.enemiesKilled ? this.enemiesKilled : 0,
          erroresCometidos: this.errorText ? this.errorText : 0,
          puntuacionTotal: this.scorePlayer ? this.scorePlayer : 0
        };

        this.scene.pause('BattleScene');
        this.audioManager.stop('BattleMusic');

        const topPlayers = getTopPlayers();

        topPlayers.then((players) => {
          // Si no hay jugadores en la base de datos, lanza la escena 'Gameover'
          if (players.length === 0) {
            console.log('No hay jugadores en la base de datos');
            this.scene.launch('leaderboardScene', { playerData: battleSceneData });
          } else {
            //El jugador entra en leaderboard si su puntuación es mayor que la del último jugador en la tabla de líderes
            if (players.length < 10 && battleSceneData.puntuacionTotal != "0" || battleSceneData.puntuacionTotal > players[players.length - 1].totalScore) {
              console.log('Nuevo record: ', battleSceneData.puntuacionTotal, ' | ', players[players.length - 1].totalScore);
              this.scene.launch('leaderboardScene', { playerData: battleSceneData });
            } else {
              console.log('No hay nuevo record: ', battleSceneData.puntuacionTotal, ' | ', players[players.length - 1].totalScore);
              this.scene.launch('Gameover', { playerData: battleSceneData });
            }
          }
        });
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
          this.currentWord = "";
          this.audioManager.play('WrongKey');
          this.scorePlayer -= 2; // Restar puntos
          this.errorText += 1; // Aumentar el contador de errores
          if (this.scorePlayer < 0) {
            this.scorePlayer = 0; // Evitar puntaje negativo
          }
          this.scoreText.setText("PUNTUACIÓN: " + this.scorePlayer); // Actualizar el texto del puntaje
        }
      }
    }

    // Actualizar el texto de currentWord
    this.currentWordText.setText(this.currentWord);
  }



  async cargarDatos() {
    const datos = await getWordsEnemies();
    if (datos) {
      this.wordsColors = datos;

      // Asignar las palabras y colores desde Firestore
      this.palabras = this.wordsColors.map(item => item.word);
      this.colors = this.wordsColors.map(item => item.color);
    } else {
      console.error("No se pudieron cargar los datos de Firestore.");
    }

    const dataEnemies = await getDataEnemies();
    this.lowEnemies = dataEnemies.filter(enemy => enemy.difficulty === "low");
    this.mediumEnemies = dataEnemies.filter(enemy => enemy.difficulty === "medium");
  }

  createEnemy() {
    if (this.enemies.getLength() < this.enemigosEnPantalla) {
      let randomEnemyData;
      if (this.scorePlayer < 100) {
        randomEnemyData = this.lowEnemies[Math.floor(Math.random() * this.lowEnemies.length)];
      } else {
        randomEnemyData = this.mediumEnemies[Math.floor(Math.random() * this.mediumEnemies.length)];
      }

      const randomY = Phaser.Math.Between(0, this.game.config.height);
      const enemy = new Enemy(this, this.game.config.width + 20, randomY, randomEnemyData.type).setScale(0.4);
      enemy.setAngle(180);
      this.randomizarPalabra(enemy, null, null, randomEnemyData.health, randomEnemyData.speed);
      enemy.points = parseInt(randomEnemyData.points);

      console.log('Datos enemigo: ', randomEnemyData.type, randomEnemyData.health, randomEnemyData.speed, randomEnemyData.points, randomEnemyData.difficulty, '| Palabra: ', enemy.wordText.text, '| Color: ', enemy.wordText.style.backgroundColor)

      this.enemies.add(enemy);
      this.enemySpawnTimer = 0;
    }
  }



  randomizarPalabra(enemy, palabra = null, color = null, health = null, speed = null) {
    let palabraAleatoria = palabra || this.palabras[Math.floor(Math.random() * this.palabras.length)];
    let colorAleatorio = color || this.colors[Math.floor(Math.random() * this.colors.length)];
    let palabraUnica = true;
    this.enemies.getChildren().forEach((existingEnemy) => {
      if (existingEnemy.wordText.text === palabraAleatoria) {
        palabraUnica = false;
        while (!palabraUnica) {
          palabraAleatoria = this.palabras[Math.floor(Math.random() * this.palabras.length)];
          palabraUnica = true;
          this.enemies.getChildren().forEach((existingEnemy) => {
            if (existingEnemy.wordText.text === palabraAleatoria) {
              palabraUnica = false;
            }
          });
        }
      }
    });
    enemy.wordText.setText(palabraAleatoria);
    enemy.wordText.setStyle({ backgroundColor: colorAleatorio });
    if (health) enemy.health = health;
    if (speed) enemy.speed = speed;
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
      this.enemySpawnThreshold -= 100; // Reduce el umbral en 100 ms cada 10 segundos
      if (this.enemySpawnThreshold < this.minSpawnThreshold) {
        this.enemySpawnThreshold = this.minSpawnThreshold;
      }
      //console.log('umbral spawn: ' + this.enemySpawnThreshold);
    } else {
      //console.log('Umbral de spawn mínimo alcanzado');
    }
  }



  resetData() {
    this.enemiesKilled = 0;
    this.scorePlayer = 0;
    this.errorText = 0;
    this.enemySpawnThreshold = 5500;
  }
}
