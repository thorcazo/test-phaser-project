import AudioManager from "../Sounds/AudioManager";
import Phaser from "phaser";
import { addScore } from "../utils/firestore";

export default class leaderboardScene extends Phaser.Scene {
  constructor() {
    super("leaderboardScene");
    this.audioManager = new AudioManager(this);
    this.currentInput = ''; // Para almacenar las letras ingresadas
  }

  init(data) {
    try {
      this.playerData = {
        nombreJugador: data && data.playerData && data.playerData.nombreJugador ? data.playerData.nombreJugador : '---',
        navesDestruidas: data && data.playerData ? data.playerData.navesDestruidas : 0,
        erroresCometidos: data && data.playerData ? data.playerData.erroresCometidos : 0,
        puntuacionTotal: data && data.playerData ? data.playerData.puntuacionTotal : 0
      };
    } catch (e) {
      console.log('Error', e);
    }
    console.log('leaderboardScene', this.playerData);
  }

  create() {
    /* Variables para los texto, font-size, space, colors */
    let title_size = '22px';
    let text_size = '16px';
    let width_board = 594;
    let height_board = 583;

    let color_white = 'ffffff';
    let color_yellow = 'FFE040';
    let color_bg = '1C142A';
    let color_red = 'E02350'

    let width_input = 382;
    let height_input = 39;

    this.audioManager.pauseAll();

    this.border = this.add.rectangle(this.cameras.main.width / 2, this.cameras.main.height / 2, width_board, height_board, '0x' + color_white);
    this.background = this.add.rectangle(this.cameras.main.width / 2, this.cameras.main.height / 2, this.border.width - 10, this.border.height - 10, '0x' + color_bg);

    // Agregar el texto "Has quedado entre los 10 primeros"
    this.titleModal = this.add.text(this.background.x - 230, this.background.y - 240, 'HAS QUEDADO ENTRE LOS', {
      fontSize: title_size,
      fontFamily: 'PressStart2P',
      color: '#' + color_white,
      align: 'center'
    });
    // Agregar el texto "los 10 primeros"
    this.primeros10 = this.add.text(this.titleModal.x + 100, this.titleModal.y + 30, '10 PRIMEROS', {
      fontSize: title_size,
      fontFamily: 'PressStart2P',
      color: '#' + color_yellow,
      align: 'center'
    });

    //NOTE: Agregar texto -> Enemigos destruidos
    this.textEnemiesDestroyed = this.add.text(this.primeros10.x - 60, this.primeros10.y + 70, `ENEMIGOS DESTRUIDOS: ${this.playerData.navesDestruidas}`, {
      fontSize: '16px',
      fontFamily: 'PressStart2P',
      color: '#ffffff',
      align: 'center'
    });

    //NOTE: Agregar TEXTO -> Errores cometidos
    this.textWrongKeys = this.add.text(this.textEnemiesDestroyed.x, this.textEnemiesDestroyed.y + 20, `ERRORES COMETIDOS: ${this.playerData.erroresCometidos}`, {
      fontSize: '16px',
      fontFamily: 'PressStart2P',
      color: '#ffffff',
      align: 'center'
    });

    //NOTE: Agregar TEXTO -> Puntuacion
    this.textPuntuacion = this.add.text(this.textWrongKeys.x, this.textWrongKeys.y + 20, `PUNTUACION TOTAL: ${this.playerData.puntuacionTotal}`, {
      fontSize: '16px',
      fontFamily: 'PressStart2P',
      color: '#ffffff',
      align: 'center'
    });

    // Agregar el texto "Escribe tu nombre"
    this.textNombre = this.add.text(this.textPuntuacion.x, this.textPuntuacion.y + 90, 'ESCRIBE TU NOMBRE', {
      fontSize: title_size,
      fontFamily: 'PressStart2P',
      color: '#' + color_white,
      align: 'center'
    });

    /* Crear un rectángulo blanco en la misma posición que this.inputText */
    this.inputbackground = this.add.rectangle(this.background.x, this.background.y + 60, width_input, height_input, '0x' + color_white).setOrigin(0.5, 0.5);

    // Crear texto para mostrar el input del usuario
    this.inputText = this.add.text(this.inputbackground.x, this.inputbackground.y, '', {
      fontSize: title_size,
      fontFamily: 'PressStart2P',
      color: '#000000',
      backgroundColor: '#ffffff',
      padding: { x: 10, y: 5 }
    }).setOrigin(0.5, 0.5);

    // Crear el botón de guardar
    this.saveButton = this.add.text(this.inputText.x - 95, this.inputText.y + 80, 'GUARDAR', {
      fontSize: title_size,
      fontFamily: 'PressStart2P',
      color: '#' + color_bg,
      backgroundColor: '#' + color_white,
      padding: { x: 20, y: 10 }
    }).setOrigin(0.5).setInteractive();

    // Crear el botón de cerrar
    this.closeButton = this.add.text(this.saveButton.x + 200, this.saveButton.y, 'CERRAR', {
      fontSize: title_size,
      fontFamily: 'PressStart2P',
      color: '#' + color_white,
      backgroundColor: '#' + color_red,
      padding: { x: 20, y: 10 }
    }).setOrigin(0.5).setInteractive();

    this.saveButton.on('pointerdown', async () => {
      if (this.currentInput.length > 0) {
        console.log('Nombre guardado:', this.currentInput);
        this.playerData.nombreJugador = this.currentInput;

        this.currentInput = '';

        // Guardar o actualizar los datos en la base de datos
        await addScore(this.playerData.nombreJugador, this.playerData.navesDestruidas, this.playerData.erroresCometidos, this.playerData.puntuacionTotal);

        this.scene.stop();
        this.scene.start('Gameover', { playerData: this.playerData, audioManager: this.audioManager });

      } else {
        console.log('El campo de nombre está vacío.');
      }
    });


    this.closeButton.on('pointerdown', () => {
      this.scene.stop();
      this.scene.start('Gameover', { playerData: this.playerData });
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
