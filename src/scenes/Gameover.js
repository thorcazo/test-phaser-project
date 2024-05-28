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
    this.mainMenuButton = this.add.image(this.newGameButton.x + 200, this.newGameButton.y, 'mainMenuButton').setOrigin(0, 0)
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
    this.marcoFondoGameOver = this.add.image(this.newGameButton.x, this.newGameButton.y + 100, 'marcoFondoGameOver')
      .setOrigin(0, 0)

    /* Colocar nave player para el marcoFondoGameOver */
    this.playerGameOver = this.add.image(this.marcoFondoGameOver.x + 200, this.marcoFondoGameOver.y + 51, 'Player')
      .setOrigin(0.5, 0.5)
      .setScale(0.5)

    /* Sgregar textos "Nombre jugador", "Nº Naves destruidas", "Errores cometidos", "Puntiacion Total" */
    this.namePlayerText = this.add.text(this.marcoFondoGameOver.x + 30, this.marcoFondoGameOver.y + 120, 'JUGADOR', {
      fontSize: '12px',
      fontFamily: 'PressStart2P',
      color: '#fff'
    })
    this.linea1 = this.add.text(this.namePlayerText.x + 90, this.namePlayerText.y, '.................', {
      fontSize: '12px',
      fontFamily: 'PressStart2P',
      color: '#fff'
    })

    this.navesDestruidasText = this.add.text(this.marcoFondoGameOver.x + 30, this.namePlayerText.y + 30, 'NAVES DESTRUIDAS', {
      fontSize: '12px',
      fontFamily: 'PressStart2P',
      color: '#fff'
    })

    this.linea2 = this.add.text(this.navesDestruidasText.x + 200, this.navesDestruidasText.y, '........', {
      fontSize: '12px',
      fontFamily: 'PressStart2P',
      color: '#fff'
    })


    this.erroresCometidos = this.add.text(this.marcoFondoGameOver.x + 30, this.navesDestruidasText.y + 30, 'ERRORES COMETIDOS', {
      fontSize: '12px',
      fontFamily: 'PressStart2P',
      color: '#fff'
    })


    this.linea3 = this.add.text(this.erroresCometidos.x + 210, this.erroresCometidos.y, '.......', {
      fontSize: '12px',
      fontFamily: 'PressStart2P',
      color: '#fff'
    })

    this.totalScoreText = this.add.text(this.marcoFondoGameOver.x + 30, this.erroresCometidos.y + 60, 'PUNTUACION TOTAL', {
      fontSize: '12px',
      fontFamily: 'PressStart2P',
      color: '#fff'
    })

    this.linea4 = this.add.text(this.totalScoreText.x + 200, this.totalScoreText.y, '........', {
      fontSize: '12px',
      fontFamily: 'PressStart2P',
      color: '#fff'
    })






    /* TABLA DERECHA GRANDE */

    /* Tabla de jugadores en el lado dereche de la escena */
    this.puntuacionTitle = this.add.text(this.mainMenuButton.x + 350, this.mainMenuButton.y, 'PUNTUACION JUGADORES', { fontSize: '1.5rem', fontFamily: 'PressStart2P', color: '#fff' })

    /* Crear "NAME"  y "SCORE" debajo de puntiacionTitle  Ejemplo NAME     SCORE   */
    this.name = this.add.text(this.puntuacionTitle.x, this.puntuacionTitle.y + 80, 'NAME', { fontSize: '1.5rem', fontFamily: 'PressStart2P', color: '#fff' })
    this.score = this.add.text(this.name.x + 270, this.name.y, 'SCORE', { fontSize: '1.5rem', fontFamily: 'PressStart2P', color: '#fff' })


    /* Inventar nombre y puntuacion que aparecerá debajo */
    this.name1 = this.add.text(this.name.x, this.name.y + 50, 'J1', {
      fontSize: '1.5rem',
      fontFamily: 'PressStart2P',
      color: '#fff'
    })
    this.score1 = this.add.text(this.score.x, this.name1.y, '100', {
      fontSize: '1.5rem',
      fontFamily: 'PressStart2P',
      color: '#fff'
    })

    this.name2 = this.add.text(this.name.x, this.name1.y + 50, 'J2', {
      fontSize: '1.5rem',
      fontFamily: 'PressStart2P',
      color: '#fff'
    })

    this.score2 = this.add.text(this.score.x, this.name2.y, '200', {
      fontSize: '1.5rem',
      fontFamily: 'PressStart2P',
      color: '#fff'
    })







  }
}