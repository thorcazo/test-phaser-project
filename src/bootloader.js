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
    this.load.image("Enemy", "./assets/img/sprites/enemy.png");
    this.load.image("logo", "../assets/img/planetMenu.png");

    // Precargar audios
    this.audioManager.load('intro', './assets/sounds/intro.mp3');

    // Escuchar el evento de finalización de carga
    this.load.on("complete", () => {
      // Añadir los sonidos al AudioManager
      this.audioManager.add('intro', { loop: true });

      // Iniciar la escena MainMenu
      this.scene.start('MainMenu', { audioManager: this.audioManager });
    });
  }
  create() {

  }


  update() { }
}

