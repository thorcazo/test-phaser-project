export default class Player extends Phaser.GameObjects.Sprite {

  constructor(scene, x, y, type) {
    super(scene, x, y, type)
    scene.add.existing(this)
    scene.physics.world.enable(this)
    this.body.setImmovable(true)
    this.health = 1
}





}