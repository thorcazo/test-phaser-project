export default class Enemy extends Phaser.GameObjects.Sprite {


  //  Movidas las palabras a la escena para controlar si se repiten en pantalla o no


  constructor(scene, x, y, type) {
    super(scene, x, y, type)
    scene.add.existing(this)
    scene.physics.world.enable(this)
    this.body.setImmovable(true)
    this.health = 100
    this.healthText = scene.add.text((this.x - 35), (this.y + 50), "Health: " + this.health, { font: "16px Arial", fill: "#000" });

    // Comentamos la asignación de la palabra aquí y la asignamos al crear el enemigo en la escena
    // Esto es porque así podémos comprovar que la palabra no existe ya en pantalla
    this.wordText = scene.add.text(this.x - 50, this.y - 100, "", { font: "16px Arial", fill: "#000" })


    this.speed = 50
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
s
    const rotation = Phaser.Math.Angle.Between(x, y, tx, ty)
    this.setRotation(rotation);
    this.scene.physics.moveToObject(this, this.target, 50) // 100 es la velocidad

  }
}



