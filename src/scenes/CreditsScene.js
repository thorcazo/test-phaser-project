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
      --- TYPE SPACE ---

      DESARROLLADO POR
      Alberto González
      David Pastor

      AGREDECIMIENTOS
      Luis Miguel - Profesor
      Amigos y familiares que han probado el juego

      ASSETS VISUALES:
      Medimon Games (Itch.io)
      'PIXEL SPACESHIPS shoot'em ups' bajo licencia CC-BY 4.0

      MÚSICA
      Tallbeard Studios (itch.io) 
      Three Red Hearts Pixel War 1 y Pixel War 2 bajo licencia CC0

      EFECTOS DE SONIDO DE COLISIONES:
      Brackeys' Platformer Bundle (itch.io)  bajo licencia CC0

      EFECTOS DE SONIDOS TECLADO y BOTONES: 
      Autor: noahkuehne (itch.io) bajo licencia CC0

      GRACIAS POR JUGAR!

    `;

    this.credits = this.add.text(
      this.cameras.main.centerX - 50,
      this.cameras.main.height + 50,
      creditsText,
      {
        fontFamily: 'PressStart2P',
        fontSize: '16px',
        fill: '#fff',
        align: 'center',
        lineSpacing: 5,
      }
    ).setOrigin(0.5, 0.5);

    // Configurar la animación de desplazamiento
    this.tweens.add({
      targets: this.credits,
      y: this.cameras.main.centerY - 50,
      duration: 5000,
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
    const buttonText = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY + 250, 'Volver a MENÚ PRINCIPAL', {
      fontFamily: 'PressStart2P',
      fontSize: '24px',
      fill: '#fff',
      backgroundColor: '#236FE0',
      padding: {
        left: 10,
        right: 10,
        top: 10,
        bottom: 10
      }
    }).setOrigin(0.5, 0.5).setInteractive();

    /* Hover buttonText */
    buttonText.on('pointerover', () => {
      buttonText.setStyle({ fill: '#236FE0' });
      buttonText.setBackgroundColor('#fff');
    });

    /* Hover out buttonText */
    buttonText.on('pointerout', () => {
      buttonText.setStyle({ fill: '#fff' });
      buttonText.setBackgroundColor('#236FE0');
    });



    buttonText.on('pointerdown', () => {
      this.scene.start('MainMenu');
    });
  }

  update() {
    // Aquí podrías agregar cualquier lógica de actualización si fuera necesaria
  }
}
