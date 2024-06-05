import AudioManager from "../Sounds/AudioManager";
import Phaser from "phaser";
// import { fetchLeaderboardData } from "../main";

export default class leaderboardScene extends Phaser.Scene {
  constructor() {
    super("leaderboardScene");
    this.audioManager = new AudioManager(this);
  }



  create() {

    console.log('leaderboardScene');
    this.audioManager.muteAll();

    this.border = this.add.rectangle(this.cameras.main.width / 2, this.cameras.main.height / 2, 620, 500, 0xFFFFFF)
      .setOrigin(0.5, 0.5);

    this.background = this.add.rectangle(this.cameras.main.width / 2, this.cameras.main.height / 2, 610, 490, 0x1C142A)
      .setOrigin(0.5, 0.5);
    this.closeButton = this.add.image(
      this.background.x + this.background.width / 2 - 23,
      this.background.y - this.background.height / 2 + 23,
      'buttonClose'
    ).setInteractive();

    this.closeButton.on('pointerdown', () => {
      this.scene.stop();
    });
    const table = this.add.text(100, 100, '', {
      fontSize: '32px',
      fontFamily: 'PressStart2P',
      color: '#ffffff',
      align: 'left',
      wordWrap: { width: 400 }
    });

  }

}