import AudioManager from "./Sounds/AudioManager";

export default class Bootloader extends Phaser.Scene {
  constructor() {
    super({ key: "Bootloader" });
    this.audioManager = new AudioManager(this);
  }

  preload() {
    this.load.image("Player", "../assets/img/sprites/player.png");
    this.load.image("Bullet", "../assets/img/sprites/bullet.png");
    this.load.image('button', './assets/img/button.png');
    this.load.image("bg", "../assets/img/bg.png");
    this.load.image("stars1", "../assets/img/stars1.png");
    this.load.image("stars2", "../assets/img/stars2.png");
    this.load.image("Enemy1", "./assets/img/sprites/enemy.png");
    this.load.image("Enemy2", "./assets/img/sprites/enemy2.png");
    this.load.image("Enemy3", "./assets/img/sprites/enemy3.png");
    this.load.image("Enemy4", "./assets/img/sprites/enemy4.png");
    this.load.image("Enemy5", "./assets/img/sprites/enemy5.png");
    this.load.image("Enemy6", "./assets/img/sprites/enemy6.png");
    this.load.image("Enemy7", "./assets/img/sprites/enemy7.png");
    this.load.image("Enemy8", "./assets/img/sprites/enemy8.png");
    this.load.image("Enemy9", "./assets/img/sprites/enemy9.png");
    this.load.image("Enemy10", "./assets/img/sprites/enemy10.png");
    this.load.image("Enemy11", "./assets/img/sprites/enemy11.png");
    this.load.image("Enemy12", "./assets/img/sprites/enemy12.png");
    this.load.image("logo", "../assets/img/planetMenu.png");
    this.load.image("dmg2", "./assets/img/sprites/powerUpDmg.png");
    this.load.image("planetGameOver", "./assets/img/PlanetGameOver.png");
    this.load.image("marcoFondoGameOver", "./assets/img/marcoFondo.png");
    this.load.image('bgCurrentWord', './assets/img/bgCurrentWord.png');
    this.load.image('buttonClose', './assets/img/buttonClose.png');

    /* Animaciones para las bullets y las colisiones */
    this.load.spritesheet('spark', "./assets/img/sprites/spark.png", {
      frameWidth: 32,
      frameHeight: 32,
      startFrame: 0,
      endFrame: 6,
    });
    this.load.spritesheet('explosion', "./assets/img/sprites/explosion.png", {
      frameWidth: 48,
      frameHeight: 48,
      startFrame: 0,
      endFrame: 6,
    });

    // buttons
    this.load.image("newgameButton", "./assets/img/newGameButton.png");
    this.load.image("mainMenuButton", "./assets/img/mainMenuButton.png");


    // Icons Speaker -> Estos iconos son para silenciar de forma facil en cualquier momento todos los sonidos
    this.load.image("speakerOn", "./assets/img/ui/speakerOn.png");
    this.load.image("speakerOff", "./assets/img/ui/speakerOff.png");



    // Precargar audios
    this.audioManager.load('intro', './assets/sounds/intro.ogg');
    this.audioManager.load('BattleMusic', './assets/sounds/BattleMusic.ogg');
    this.NumKey = this.audioManager.load('NumKey', './assets/sounds/NumKey.mp3');
    this.audioManager.load('WrongKey', './assets/sounds/WrongKey.ogg');
    this.audioManager.load('BackgroundAmbient', './assets/sounds/BackgroundSFXAmbient.mp3');
    this.audioManager.load('naveDestruida', './assets/sounds/naveDestruida.ogg');
    this.audioManager.load('damagedShip', './assets/sounds/damagedShip.ogg');
    this.audioManager.load('gameOver', './assets/sounds/gameOver.ogg');
    this.audioManager.load('bulletShot', './assets/sounds/bulletShot.ogg');

    // Cargar imagen del cursor
    this.load.image("cursor", "./assets/img/Cursor/cursor.png");

    // Escuchar el evento de finalización de carga
    this.load.on("complete", () => {
      // Añadir los sonidos al AudioManager
      this.addAllSound();

      // Iniciar la escena MainMenu
      this.scene.start('MainMenu', { audioManager: this.audioManager });
    });
  }
  create() {
    this.input.setDefaultCursor('url(./assets/img/cursor.png), pointer');
  }
  update() { }

  addAllSound() {
    this.audioManager.add('intro', { loop: true, volume: 0.5 });
    this.audioManager.add('BattleMusic', { loop: true, volume: 0.5 });
    this.audioManager.add('NumKey', { loop: false, volume: 1.5 });
    this.audioManager.add('WrongKey', { loop: false, volume: 1.5 })
    this.audioManager.add('BackgroundAmbient', { loop: true, volume: 1 });
    this.audioManager.add('naveDestruida', { loop: false });
    this.audioManager.add('damagedShip', { loop: false, volume: 1.5 });
    this.audioManager.add('gameOver', { loop: true, volume: 1.5 });
    this.audioManager.add('bulletShot', { loop: false, volume: 1.5 });
  }

}

