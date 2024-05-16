import Phaser from 'phaser';

import Bootloader from './bootloader.js';
import MainMenu from './scenes/MainMenu.js';
import BattleScene from './scenes/BattleScene.js';
import UIScene from './scenes/ui.js';
import Gameover from './scenes/Gameover.js';

const config = {
  type: Phaser.AUTO,
  width: 1400,
  height: 800,
  parent: "container",
  backgroundColor: '#d3d3d3',
  scene: [Bootloader, MainMenu, BattleScene, UIScene, Gameover],
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: true
    }
  }
}
new Phaser.Game(config);
