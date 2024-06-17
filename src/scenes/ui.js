import AudioManager from "../Sounds/AudioManager";

export default class UIScene extends Phaser.Scene {

  constructor() {
    super({ key: 'UIScene', active: false });
    //this.tablaJugadores = document.querySelector('.tabla-jugadores');
    this.audioManager = new AudioManager(this);
  }

  preload() {

    this.load.audio('enter', './assets/sounds/enter.mp3');
    this.load.audio('BattleMusic', './assets/sounds/BattleMusic.mp3');


  }

  create() {

    this.cursor = this.input.setDefaultCursor('url(assets/img/Cursor/arrow.png), pointer');

    this.audioManager.add('enter', { volume: 1, loop: false });
    this.audioManager.add('BattleMusic', { volume: 0.4, loop: true });



    this.versionGame();
    this.createPauseButton(400, 50);
    this.createSpeakerButton(50, 50);

    // Crear el rectángulo para la pausa y ocultarlo inicialmente
    this.borderBackgroundPause = this.add.rectangle(this.cameras.main.width / 2, this.cameras.main.height / 2, 630, 170, 0xffffff, 1);
    this.backgroundPause = this.add.rectangle(this.cameras.main.width / 2, this.cameras.main.height / 2, 620, 160, 0x1C142A, 1);
    this.backgroundPause.setVisible(false);
    this.borderBackgroundPause.setVisible(false);

    /* agregar textop al backgroundPause */
    this.textPause = this.add.text(this.backgroundPause.x, this.cameras.main.height / 2 - 20, 'JUEGO PAUSADO', {
      fontFamily: 'PressStart2P',
      fontSize: '20px',
      fill: '#fff',
      padding: 10,
    });
    /* agregar textop al backgroundPause */
    this.textMessagePause = this.add.text(this.backgroundPause.x - 55, this.cameras.main.height / 2 + 5, `    
      Para continuar pulse "espacio"`, {
      fontFamily: 'PressStart2P',
      fontSize: '16px',
      fill: '#FFE040',
      padding: 10,
      /* centrar texto */
      align: 'center',

    });

    this.textPause.setOrigin(0.5);
    this.textMessagePause.setOrigin(0.5);

    this.textPause.setVisible(false);
    this.textMessagePause.setVisible(false);



  }

  createPauseButton(x, y) {
    if (this.scene.isActive('BattleScene')) {

      // Agregar listener para la tecla ESPACIO
      this.input.keyboard.on('keydown-SPACE', () => {

        this.togglePause();



      });
    }
  }

  togglePause() {
    const battleScene = this.scene.get('BattleScene');
    if (!battleScene.scene.isPaused()) {
      this.backgroundPause.setVisible(true);
      this.borderBackgroundPause.setVisible(true);
      this.textPause.setVisible(true);
      this.textMessagePause.setVisible(true);
      battleScene.scene.pause();

      this.audioManager.play('enter');

      this.time.delayedCall(250, () => {
        this.audioManager.pauseAll();
      });



    } else {

      battleScene.scene.resume();

      this.audioManager.resumeAll();
      this.backgroundPause.setVisible(false);
      this.borderBackgroundPause.setVisible(false);
      this.textPause.setVisible(false);
      this.textMessagePause.setVisible(false);
    }
  }


  /* VERSION:   texto informativo de la version del juego que aparece en el lado abajo a la derecha */
  versionGame() {
    this.add.text(this.cameras.main.width - 100, this.cameras.main.height - 50, 'v0.9', {
      fill: '#fff',
      padding: 10,
      backgroundColor: '#000'
    });
  }

  /* agregar funcion para sileciar y desinleciar todos los sonidos del juego. Se agregarán dos imagens diferentes que haran un toggle "speakerOn" y "speakerOff" */
  createSpeakerButton(x, y) {
    this.speakerButton = this.add.image(x, y, 'speakerOn').setOrigin(0.5, 0.5).setInteractive();
    this.speakerButton.on('pointerdown', () => {
      this.toggleSound();
    });
  }

  toggleSound() {
    if (this.audioManager.isMuted()) {
      this.audioManager.unmuteAll();
      this.speakerButton.setTexture('speakerOn');
    } else {

      this.audioManager.muteAll();
      this.speakerButton.setTexture('speakerOff');
    }
  }






}
