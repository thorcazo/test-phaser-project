import Phaser from 'phaser';

import Bootloader from './bootloader.js';
import MainMenu from './scenes/MainMenu.js';
import BattleScene from './scenes/BattleScene.js';
import UIScene from './scenes/ui.js';
import Gameover from './scenes/Gameover.js';
import leaderboardScene from './scenes/Leaderboard.js';
import CreditsScene from './scenes/CreditsScene.js';

const config = {
  type: Phaser.AUTO,
  width: 1280,
  height: 720,
  parent: "container",
  backgroundColor: '#1C142A',
  scene: [Bootloader, MainMenu, BattleScene, UIScene, Gameover, leaderboardScene, CreditsScene],
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: false
    }
  },
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  /*debug */


};

new Phaser.Game(config);
