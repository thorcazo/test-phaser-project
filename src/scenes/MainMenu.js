

class MainMenu extends Phaser.Scene {
  constructor() {
    super({ key: 'MainMenu' });
  }

  preload() {
    // Aquí puedes precargar los recursos (imágenes, sonidos, etc.) que necesitarás en tu escena
  }

  create() {
    // Dimensiones de la pantalla
    const { width, height } = this.sys.game.config;

    this.bg = this.add.image(width / 2, height / 2, "bg");
    this.stars = this.add.tileSprite(width / 2, height / 2, window.innerWidth, window.innerHeight, "stars");
    this.stars.alpha = 0.5;
    this.stars.tileScaleX = 0.4;
    this.stars.tileScaleY = 0.4;
    
    // Añadir y centrar el texto del título 'Main Menu'
    const titleText = 'Type Space';
    this.title = this.add.text((width - 250) / 2, height / 2 - 100, titleText, {
      fill: '#fff',
      fontSize: '4rem',
      fontFamily: 'PressStart2P',
      fontStyle: 'bold'
    }).setOrigin(0.5);  // Centrar el texto horizontalmente
    
    this.planetMenu = this.add.image(this.title.x + 500, this.title.y, "planetMenu");
    // Añadir y centrar el botón 'Start Game'
    const startButtonText = 'Start Game';
    let startButton = this.add.text(width / 2, height / 2, startButtonText, {
      fill: '#0f0',
      fontSize: '24px',
      fontFamily: 'PressStart2P',
      backgroundColor: '#000',
      padding: { left: 10, right: 10, top: 5, bottom: 5 },
      borderRadius: 5
    }).setOrigin(0.5);  // Centrar el botón horizontalmente

    startButton.setInteractive();
    startButton.on('pointerdown', () => this.startGame());

    // Añadir un efecto visual al pasar el mouse sobre el botón
    startButton.on('pointerover', () => {
      startButton.setStyle({ fill: '#fff' });
    });
    startButton.on('pointerout', () => {
      startButton.setStyle({ fill: '#0f0' });
    });
  } // FINAL CREATE


  update() {
    // Desplazar las estrellas lentamente en diagonal
    this.stars.tilePositionX += 0.3;
    this.stars.tilePositionY += 0.02;


    /* hacer rotar planetMenu  */
    this.planetMenu.angle += 0.1;
    /* hacer que planetMenu oscile */
    this.planetMenu.y = this.title.y + Math.sin(this.planetMenu.angle) * 2;


  }

  startGame() {
    // Definir lo que sucede cuando se inicia la partida
    this.scene.start('SceneA');
  }
}

export default MainMenu;
