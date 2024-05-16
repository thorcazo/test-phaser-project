export default class Bootloader extends Phaser.Scene {
  constructor() {
    super({ key: "Bootloader" });
  }


  preload() {
    this.load.on("complete", () => { this.scene.start('MainMenu') })
    this.load.image("Player", "../assets/img/sprites/player.png")
    this.enemy = this.load.image("Enemy", "./assets/img/sprites/enemy.png") 
    this.bg = this.load.image("bg", "../assets/img/bg.png")
    this.stars = this.load.image("stars", "../assets/img/stars.png")
   

    this.load.image("Bullet", "../assets/img/sprites/bullet.png")


  }



  update() { }
}

