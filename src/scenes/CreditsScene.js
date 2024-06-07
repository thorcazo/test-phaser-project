import AudioManager from "../Sounds/AudioManager";

export default class CreditsScene extends Phaser.Scene {
  constructor() {
    super({ key: 'CreditsScene', active: false });
    this.audioManager = new AudioManager(this);
  }

  preload() {
    // Precargar los recursos necesarios
    this.load.image('bg', 'path_to_background_image');
  }

  create() {
    // Configurar el fondo
    this.bg = this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'bg').setOrigin(0.5, 0.5);

    // Configurar el texto de créditos
    const creditsText = `
      TYPE SPACE

      Desarrolladores:
      - Nombre del Desarrollador 1
      - Nombre del Desarrollador 2
      - Nombre del Desarrollador 3

      Agradecimientos Especiales:
      - Nombre del Agradecido 1
      - Nombre del Agradecido 2

      Fuentes de los Assets:
      - Fuente de Asset 1
      - Fuente de Asset 2

      Música:
      - Título de la Música 1
      - Título de la Música 2
    `;

    this.credits = this.add.text(
      this.cameras.main.centerX,
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
      y: -this.credits.height,
      duration: 20000,
      ease: 'Linear',
      onComplete: () => {
        this.scene.start('MainMenu'); // Regresar al menú principal después de los créditos
      }
    });

    // Reproducir música de créditos si aplica
    // this.audioManager.play('creditsMusic');
  }

  update() {
    // Aquí podrías agregar cualquier lógica de actualización si fuera necesaria
  }
}