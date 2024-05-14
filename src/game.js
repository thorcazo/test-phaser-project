import { Game } from './main.js';

// export class Game extends Phaser.Scene{
//     constructor() {
//         super({ key: 'game'});
//     }
//     preload() {
//         this.load.image('player', 'assets/img/sprites/player.png')
//         this.load.image('enemy', 'assets/img/sprites/enemy.png')
//     }

//     create() {
//         this.cameras.main.setBackgroundColor('d3d3d3');
//         this.player = this.physics.add.image(200, 400, 'player')
//             .setScale(0.1)
//         this.player.angle = 90;
//         this.enemies = this.physics.add.group();
        
//         this.startButton = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY, 'Start Game',{fontSize: '32px', fill: '#000' } );
//         this.startButton.setInteractive();
//         this.startButton.on('pointerdown', () => {
//             this.gameStarted = true;
//             this.startButton.setVisible(false);
//         });
//     }

// }

