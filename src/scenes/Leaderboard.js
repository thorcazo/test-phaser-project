import AudioManager from "../Sounds/AudioManager";
import Phaser from "phaser";

export default class leaderboardScene extends Phaser.Scene {
  constructor() {
    super("leaderboardScene");
    this.audioManager = new AudioManager(this);
    this.currentInput = ''; // Para almacenar las letras ingresadas
  }

  create() {
    this.audioManager.muteAll();
    this.scene.pause('Gameover');

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
      this.scene.resume('Gameover');
    });

    const table = this.add.text(100, 100, '', {
      fontSize: '32px',
      fontFamily: 'PressStart2P',
      color: '#ffffff',
      align: 'left',
      wordWrap: { width: 400 }
    });

    // Crear texto para mostrar el input del usuario
    this.inputText = this.add.text(this.cameras.main.width / 2, this.cameras.main.height / 2 - 50, '', {
      fontSize: '32px',
      fontFamily: 'PressStart2P',
      color: '#ffffff',
      backgroundColor: '#000000',
      padding: { x: 20, y: 10 }
    }).setOrigin(0.5);

    // Crear el botón de guardar
    this.saveButton = this.add.text(this.cameras.main.width / 2, this.cameras.main.height / 2 + 50, 'GUARDAR', {
      fontSize: '32px',
      fontFamily: 'PressStart2P',
      color: '#ffffff',
      backgroundColor: '#000000',
      padding: { x: 20, y: 10 }
    }).setOrigin(0.5).setInteractive();

    this.saveButton.on('pointerdown', () => {
      if (this.currentInput.length > 0) {
        console.log('Nombre guardado:', this.currentInput);
        // Aquí puedes agregar la lógica para guardar el nombre
      } else {
        console.log('El campo de nombre está vacío.');
      }
    });

    // Escuchar eventos de teclado
    this.input.keyboard.on('keydown', this.handleKeyInput, this);
  }

  handleKeyInput(event) {
    if (event.keyCode >= Phaser.Input.Keyboard.KeyCodes.A && event.keyCode <= Phaser.Input.Keyboard.KeyCodes.Z) {
      // Solo aceptar letras
      if (this.currentInput.length < 5) {
        this.currentInput += event.key.toUpperCase();
        this.inputText.setText(this.currentInput);
      }
    } else if (event.keyCode === Phaser.Input.Keyboard.KeyCodes.BACKSPACE && this.currentInput.length > 0) {
      // Manejar la tecla de borrado
      this.currentInput = this.currentInput.slice(0, -1);
      this.inputText.setText(this.currentInput);
    }
  }
}
