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


    // buttons
    this.load.image("newgameButton", "./assets/img/newGameButton.png");
    this.load.image("mainMenuButton", "./assets/img/mainMenuButton.png");

    // Precargar audios
    this.audioManager.load('intro', './assets/sounds/intro.mp3');
    this.audioManager.load('BattleMusic', './assets/sounds/BattleMusic.mp3');
    this.audioManager.load('BulletShot', './assets/sounds/bulletShot.wav');
    this.audioManager.load('HitDamage', './assets/sounds/HitDamage.wav');
    this.audioManager.load('NumKey', './assets/sounds/NumKey.wav');
    this.audioManager.load('WrongKey', './assets/sounds/WrongKey.wav');


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
    this.audioManager.add('intro', { loop: true });
    this.audioManager.add('BattleMusic', { loop: true, volume: 0.1 });
    this.audioManager.add('BulletShot', { loop: false });
    this.audioManager.add('HitDamage', { loop: false });
    this.audioManager.add('NumKey', { loop: false });
    this.audioManager.add('WrongKey', { loop: false, volume: 1.5 })
  }

}

