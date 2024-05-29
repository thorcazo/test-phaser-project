import Phaser from "phaser";
import { fetchLeaderboardData } from "../main";

export default class leaderboardScene extends Phaser.Scene { 
    constructor() {
        super("leaderboardScene");
    }

    create() {
        const background = this.add.rectangle(0, 0, this.cameras.main.width, this.cameras.main.height, 0x000000);
        background.alpha = 0.8;
        background.setOrigin(0, 0);
        const closeButton = this.add.text(this.cameras.main.width - 100, 20, 'X', {
            fontSize: '24px',
            fontFamily: 'PressStart2P',
            color: '#ffffff',
        }).setInteractive();
        closeButton.on('pointerdown', () => {
            this.scene.stop();
        });
        const table = this.add.text(100, 100, '', {
            fontSize: '32px',
            fontFamily: 'PressStart2P',
            color: '#ffffff',
            align: 'left',
            wordWrap: { width: 400 }
        });

        // TODO: Hacer una función que traiga los datos de firestore
        fetchLeaderboardData(table);
    }

}