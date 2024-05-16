export default class UIScene extends Phaser.Scene {
  constructor() {
    super({ key: 'UIScene', active: false });
  }


  preload() {
    console.log('Cargando UIScene...');

  }

  create() {
    // Create a pause/resume button
    this.pauseButton = this.add.text(50, 50, 'Pause', { fill: '#000' })
      .setInteractive()
      .on('pointerdown', () => this.togglePause());
  }

  togglePause() {
    if (this.scene.isPaused('BattleScene')) {
      // If the game is paused, resume it
      this.scene.resume('BattleScene');
      // Change the button text to 'Pause'
      this.pauseButton.setText('Pause');
    } else {
      // If the game is running, pause it
      this.scene.pause('BattleScene');
      // Change the button text to 'Resume'
      this.pauseButton.setText('Resume');
    }
  }
}