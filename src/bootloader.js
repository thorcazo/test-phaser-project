export default class Bootloader extends Phaser.Scene {
  constructor() {
    super({ key: "Bootloader" });
  }


  preload() {
    this.load.on("complete", () => { this.scene.start('MainMenu') })
    this.load.image("Player", "../assets/img/sprites/player.png")
    this.enemy = this.load.image("Enemy", "../assets/img/sprites/enemy2.png")
   

    this.load.image("Bullet", "../assets/img/sprites/bullet.png")


  }



  update() { }
}

