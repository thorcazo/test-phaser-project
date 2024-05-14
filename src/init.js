import Bootloader from './bootloader.js';
import MainMenu from './scenes/MainMenu.js';
import SceneA from './scenes/sceneA.js';
import UIScene from './scenes/ui.js';

const config = {
  type: Phaser.AUTO,
  width: 1400,
  height: 800,
  parent: "container",
  backgroundColor: '#d3d3d3',
  scene: [Bootloader, MainMenu , SceneA,UIScene],
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: true
    }
  }
}
new Phaser.Game(config);
