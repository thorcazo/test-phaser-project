export default class Gameover extends Phaser.Scene {
  constructor() {
    super({ key: 'Gameover' });
  }

  create() {
    this.scene.launch('UIScene');
    this.scene.stop('BattleScene');

    /* Establecer un color background */
    this.cameras.main.setBackgroundColor('#1C142A');

    /* Posicion de la pantalla */

    this.screenX = this.cameras.main.centerX - this.cameras.main.centerX;
    this.screenY = this.cameras.main.centerY - this.cameras.main.centerY;



    // Añade un texto de Game Over en el centro de la pantalla
    this.textGame = this.add.text(this.screenX + 80, this.screenY + 80, 'GAME', { fontSize: '4rem', fontFamily: 'PressStart2P', color: '#fff' })
    this.textOver = this.add.text(this.textGame.x, this.textGame.y + 64, 'OVER', { fontSize: '4rem', fontFamily: 'PressStart2P', color: '#fff' })


    this.planetGameOver = this.add.image(this.textGame.x + 300, this.textGame.y, 'planetGameOver')
      .setOrigin(0, 0)
      .setScale(0.8);

    /* Cargamos assets necesarios para la escena */
    this.newGameButton = this.add.image(this.textOver.x, this.textOver.y + 100, 'newgameButton').setOrigin(0, 0)
      .setInteractive();
    this.mainMenuButton = this.add.image(this.newGameButton.x + 240, this.newGameButton.y, 'mainMenuButton').setOrigin(0, 0)
      .setInteractive();

    // Añade un botón de reinicio en el centro de la pantalla, un poco más abajo
    this.newGameText = this.add.text(this.newGameButton.x + 18, this.newGameButton.y + 20, 'NUEVA PARTIDA', {
      fontSize: '12px',
      color: '#ffffff',
      fontFamily: 'PressStart2P',
    })
      .setInteractive()

    this.mainMenuText = this.add.text(this.mainMenuButton.x + 18, this.mainMenuButton.y + 20, 'MENU PRINCIPAL', {
      fontSize: '12px',
      color: '#ffffff',
      fontFamily: 'PressStart2P',
    })
      .setInteractive()


    // Cuando se hace clic en el botón de reinicio, reinicia la escena del juego
    this.newGameButton.on('pointerdown', () => {
      this.scene.stop('Gameover');
      this.scene.start('BattleScene');
    });

    this.newGameText.on('pointerdown', () => {
      this.scene.stop('Gameover');
      this.scene.start('BattleScene');
    });

    this.mainMenuButton.on('pointerdown', () => {
      this.scene.stop('Gameover');
      this.scene.start('MainMenu');
    });

    this.mainMenuText.on('pointerdown', () => {
      this.scene.stop('Gameover');
      this.scene.start('MainMenu');
    });



      /* Marco Fondo */









  }
}