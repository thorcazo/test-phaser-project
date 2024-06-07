import AudioManager from "../Sounds/AudioManager";

export default class CreditsScene extends Phaser.Scene {
  constructor() {
    super({ key: 'CreditsScene', active: false });
    this.audioManager = new AudioManager(this);
  }

  preload() {
    // Precargar los recursos necesarios

  }

  create() {
    // Configurar el fondo
    this.bg = this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'bg').setOrigin(0.5, 0.5);

    // Configurar el texto de créditos
    const creditsText = `
      TYPE SPACE

      Desarrolladores:
      - Alberto González
      - David Pastor

      Agradecimientos Especiales:
      - Luis Miguel - Profesor

      Fuentes de los Assets:
      - Itch.io:
       - Autor: Autor del Asset

      Música:
      - Suno.ia - Generador de Música
    `;

    this.credits = this.add.text(
      this.cameras.main.centerX - 80,
      this.cameras.main.height + 50,
      creditsText,
      {
        fontFamily: 'PressStart2P',
        fontSize: '24px',
        fill: '#fff',
        align: 'center'
      }
    ).setOrigin(0.5, 0.5);

    // Configurar la animación de desplazamiento
    this.tweens.add({
      targets: this.credits,
      y: this.cameras.main.centerY - 80,
      duration: 8000,
      ease: 'Linear',
      onComplete: () => {
        this.showMainMenuButton();
      }
    });

    // Reproducir música de créditos si aplica
    // this.audioManager.play('creditsMusic');
  }

  showMainMenuButton() {
    // Crear el botón de "Menu principal"
    const buttonText = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY + 250, 'Menu principal', {
      fontFamily: 'PressStart2P',
      fontSize: '24px',
      fill: '#fff',
      backgroundColor: 'red',
      padding: {
        x: 20,
        y: 10
      }
    }).setOrigin(0.5, 0.5).setInteractive();

    buttonText.on('pointerdown', () => {
      this.scene.start('MainMenu');
    });
  }

  update() {
    // Aquí podrías agregar cualquier lógica de actualización si fuera necesaria
  }
}
