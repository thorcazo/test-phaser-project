export default class Gameover extends Phaser.Scene {
  constructor() {
    super({ key: 'Gameover' });
  }

  create() {
    this.scene.launch('UIScene');


    // Añade un texto de Game Over en el centro de la pantalla
    this.add.text(this.cameras.main.centerX, this.cameras.main.centerY, 'Game Over', { fontSize: '5rem', fontFamily: 'PressStart2P', color: '#ff0000' })
      .setOrigin(0.5);

    // Añade un botón de reinicio en el centro de la pantalla, un poco más abajo
    const restartButton = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY + 80, 'Restart', { fontSize: '20px', color: '#ffffff' })
      .setOrigin(0.5)
      .setInteractive();


    /* background color */
    this.cameras.main.setBackgroundColor('#000000');


    // Cuando se hace clic en el botón de reinicio, reinicia la escena del juego
    restartButton.on('pointerdown', () => {
      this.scene.stop('Gameover');
      this.scene.start('BattleScene');
    });
  }
}