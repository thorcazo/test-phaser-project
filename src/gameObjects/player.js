export default class Player extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y, type) {
        super(scene, x, y, type)
        scene.add.existing(this)
        scene.physics.world.enable(this)
        this.body.setImmovable(true)
        // this.health = 100
        // this.healthText = scene.add.text((this.x - 35), (this.y + 50), "Health: " + this.health, { font: "16px Arial", fill: "#000" });
    }

    // update() {
    //     this.healthText.setText("Health: " + this.health)
    //     this.healthText.setPosition((this.x - 35), (this.y + 50))
    // }


}