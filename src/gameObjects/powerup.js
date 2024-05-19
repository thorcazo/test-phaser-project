export default class PowerUp extends Phaser.GameObjects.Sprite {


  constructor(scene, x, y, texture, effect) {
    super(scene, x, y, texture);

    scene.add.existing(this); // add to scene
    scene.physics.add.existing(this); // add physics
    this.effect = effect; // // Effect of the powerup
    this.speed = 100; // Speed of the powerup movement
    this.setInteractive(); // Set the powerup to be interactive
    this.setScale(0.5); // Scale the powerup


  }

  update(time, delta) {
    this.x += this.speed * delta / 1000; // Actualiza la posición del powerup

    // Eliminar el powerup si sale de la pantalla
    if (this.x > this.scene.cameras.main.height) {
      this.destroy();
    }
  }


  applyEffect(){
    
  }



}