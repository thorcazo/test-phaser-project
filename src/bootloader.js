export default class Bootloader extends Phaser.Scene {
  constructor() {
    super({ key: "Bootloader" });
  }


  preload() {
    this.load.image("Player", "../assets/img/sprites/player.png");
    this.enemy = this.load.image("Enemy", "../assets/img/sprites/enemy2.png");
    this.load.image("Bullet", "../assets/img/sprites/bullet.png");
    this.load.image("bg", "../assets/bg.png");
      this.load.image("stars", "../assets/stars.png");
    this.load.image("planetMenu", "../assets/planetMenu.png");


    this.load.on("complete", () => {
      this.scene.start('MainMenu');
    });
  }



  update() { }
}

