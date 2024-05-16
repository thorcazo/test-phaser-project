export default class UIScene extends Phaser.Scene {
  constructor() {
    super({ key: 'UIScene', active: false });
  }

  preload() {

  }

  create() {
    // Create a pause/resume button
    this.pauseButton = this.add.text(50, 50, 'Pause', { fill: '#fff' })
      .setInteractive()
      .on('pointerdown', () => this.togglePause());

    // Create buttons for each scene
    this.createSceneButton(370, 50, 'BattleScene', 'BattleScene');
    this.createSceneButton(500, 50, 'Gameover', 'Gameover');
    this.createSceneButton(600, 50, 'MainMenu', 'MainMenu');
  }

  createSceneButton(x, y, text, sceneKey) {
    // Create a button and associate it with a scene
    this.add.text(x, y, text, { fill: '#fff',  })
      .setInteractive()
      .on('pointerdown', () => this.scene.start(sceneKey));
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