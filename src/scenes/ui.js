import AudioManager from "../Sounds/AudioManager";

export default class UIScene extends Phaser.Scene {

  constructor() {
    super({ key: 'UIScene', active: false });
    //this.tablaJugadores = document.querySelector('.tabla-jugadores');
    this.audioManager = new AudioManager(this);
  }

  preload() { }




  create() {
    this.createPauseButton(400, 50);
    this.createGameOverButton(500, 50);
    this.createMainMenuButton(600, 50);
    this.createLeaderboardButton(700, 50);

  }

  createPauseButton(x, y) {
    if (this.scene.isActive('BattleScene')) {
      this.pauseButton = this.add.text(x, y, 'PAUSE', {
        fill: '#000',
        padding: 10,
        backgroundColor: '#fff',
      }).setInteractive()
        .on('pointerdown', () => {
          this.togglePause();
        });

      // Agregar listener para la tecla ESPACIO
      this.input.keyboard.on('keydown-SPACE', () => {
        this.togglePause();
        
      });
    }
  }

  togglePause() {
    const battleScene = this.scene.get('BattleScene');
    if (battleScene.scene.isPaused()) {
      battleScene.scene.resume();
      this.pauseButton.setText('PAUSE');
      this.audioManager.resumeAll();
    } else {
      battleScene.scene.pause();
      this.audioManager.pauseAll();
      this.pauseButton.setText('RESUME');
    }
  }

  createGameOverButton(x, y) {
    this.add.text(x, y, 'GAMEOVER', {
      fill: '#fff',
      padding: 10,
      backgroundColor: '#000'
    }).setInteractive()
      .on('pointerdown', () => {
        this.transitionTo('Gameover');
      });
  }

  createLeaderboardButton(x, y) {
    this.add.text(x, y, 'LEADERBOARD', {
      fill: '#fff',
      padding: 10,
      backgroundColor: '#000'
    }).setInteractive()
      .on('pointerdown', () => {
        this.audioManager.stop('intro');
        this.scene.start('leaderboardScene', { audioManager: this.audioManager });
      });
  }

  createMainMenuButton(x, y) {
    this.add.text(x, y, 'MAIN MENU', {
      fill: '#fff',
      padding: 10,
      backgroundColor: '#000'
    }).setInteractive()
      .on('pointerdown', () => {
        this.transitionTo('MainMenu');
      });
  }

  transitionTo(sceneKey) {
    this.scene.stop('BattleScene');
    this.scene.stop('Gameover');
    this.scene.start(sceneKey);
  }



  createButtonMuseSound(x, y) {
    this.add.text(x, y, 'MUSIC', {
      fill: '#fff',
      padding: 10,
      backgroundColor: '#000'
    }).setInteractive()
      .on('pointerdown', () => {
        this.toggleMusic();
      });
  }

  toggleMusic() {
    const mainMenuScene = this.scene.get('MainMenu');

    if (mainMenuScene && mainMenuScene.intro) {
      if (mainMenuScene.intro.isPlaying) {
        mainMenuScene.intro.pause();
      } else {
        mainMenuScene.intro.resume();
      }
    } else {
      console.error('No se pudo encontrar la escena MainMenu o el audio intro.');
    }
  }
}
