export default class Enemy extends Phaser.GameObjects.Sprite {


   palabras = ["CASA", "PERRO", "LUZ", "MESA", "PARQUE", "SOL", "AUTO", "FLOR", "PAN", "LAGO"];


  constructor(scene, x, y, type) {
    super(scene, x, y, type)
    scene.add.existing(this)
    scene.physics.world.enable(this)
    this.body.setImmovable(true)
    this.health = 100
    this.healthText = scene.add.text((this.x - 35), (this.y + 50), "Health: " + this.health, { font: "10px PressStart2P", fill: "#fff" });

    this.wordText = scene.add.text(this.x, this.y, this.palabras[Math.floor(Math.random() * this.palabras.length)], { font: "14px PressStart2P", fill: "#fff" })


    this.speed = 90
    this.target = null
    this.turn_rate = 1
    // Grados que el enemigo oscila
    this.wobble_limit = 15
    //  Velocidad de oscilación en milisegundos
    this.wobble_speed = 250

    // this.wobbleTween = this.scene.tweens.add({
    //   targets: this,
    //   props: {
    //     angle: {
    //       value: this.wobble_limit,
    //       duration: this.wobble_speed,
    //       ease: "Sine.easeInOut",
    //       yoyo: true,
    //       repeat: -1
    //     }
    //   }
    // })
  }

  setTarget(target) {
    this.target = target
  }

  update() {
    if (!this.target) {
      return
    }

    const tx = this.target.x
    const ty = this.target.y

    const x = this.x
    const y = this.y

    const rotation = Phaser.Math.Angle.Between(x, y, tx, ty)
    this.setRotation(rotation);
    this.scene.physics.moveToObject(this, this.target, 50) // 100 es la velocidad

  }
}



