export default class Gameover extends Phaser.Scene {
  constructor() {
    super({ key: 'Gameover' });
  }

  create() {
    // Añade un texto de Game Over en el centro de la pantalla
    this.add.text(this.cameras.main.centerX, this.cameras.main.centerY, 'Game Over', { fontSize: '32px', color: '#ff0000' })
      .setOrigin(0.5);

    // Añade un botón de reinicio en el centro de la pantalla, un poco más abajo
    const restartButton = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY + 50, 'Restart', { fontSize: '20px', color: '#ffffff' })
      .setOrigin(0.5)
      .setInteractive();



    const returnMainMenuButton = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY + 100, 'Return to Main Menu', { fontSize: '20px', color: '#ffffff' })
      .setOrigin(0.5)
      .setInteractive();


    // Cuando se hace clic en el botón de reinicio, reinicia la escena del juego
    restartButton.on('pointerdown', () => {
      this.scene.stop('Gameover');
      this.scene.start('SceneA');
    });

    returnMainMenuButton.on('pointerdown', () => {
      this.scene.stop('Gameover');
      this.scene.start('MainMenu');
      this.shutdown();

    });
  }





  shutdown() {
    // Mostrar la tabla de jugadores cuando la escena ya no está activa
    document.querySelector('.tabla-jugadores').classList.remove('hidden');
  }

}