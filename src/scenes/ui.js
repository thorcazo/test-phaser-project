export default class UIScene extends Phaser.Scene {


  constructor() {
    super({ key: 'UIScene', active: false });

    this.tablaJugadores = document.querySelector('.tabla-jugadores')
  }

  preload() {
    console.log('Cargando UIScene');
  }

  create() {
    this.createPauseButton(400, 50);
    this.createGameOverButton(500, 50);
    this.createMainMenuButton(600, 50);

    this.ocultarTablaJugadores()

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
    } else {
      battleScene.scene.pause();
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

  ocultarTablaJugadores() {
    /* Si la escena es "BattleScene" entonces añadir la clase hidden a tablaJugadores */
    if (this.scene.isActive('BattleScene')) {
      this.tablaJugadores.classList.add('hidden')
    } else {
      this.tablaJugadores.classList.remove('hidden')
    }
  }


}
