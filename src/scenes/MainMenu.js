class MainMenu extends Phaser.Scene {


  constructor() {
    super({ key: 'MainMenu' });
  }

  preload() {
    // Aquí puedes precargar los recursos (imágenes, sonidos, etc.) que necesitarás en tu escena
    this.centerX = this.cameras.main.centerX;
    this.centerY = this.cameras.main.centerY;

  }

  create() {

    this.scene.launch('UIScene');
    // Fondo de pantalla
    this.bg = this.add.image(this.centerX, this.centerY, 'bg');
    this.bg.setOrigin(0.5, 0.5);

    // Crea un TileSprite, que se repite automáticamente
    this.stars = this.add.tileSprite(0, 0, this.cameras.main.width, this.cameras.main.height, 'stars1');
    this.stars
      .setOrigin(0, 0)
      .setScale(1)
      .alpha = 0;

    this.stars2 = this.add.tileSprite(0, 0, this.cameras.main.width, this.cameras.main.height, 'stars2')
      .setOrigin(0, 0)
      .setScale(1)

    // Texto princpipal TITLE
    this.title = this.add.text(this.centerX, (this.centerY - 100), 'TYPE SPACE', {
      fill: '#fff',
      fontFamily: 'PressStart2P',
      fontSize: '70px'
    }).setOrigin(0.5);

    // Cargar logo
    this.logo = this.add.image((this.title.x - 410), (this.title.y), 'logo');
    this.logo.setScale(0.7);

    // Botón de inicio de partida
    let startButton = this.add.text(this.title.x - 128, this.title.y + 50, 'START', {
      fill: '#fff',
      fontFamily: 'PressStart2P',
      fontSize: '35px',
      shadow: {
        offsetX: 4,
        offsetY: 4,
        color: '#082EF7',
        blur: 0,
        stroke: false,
        fill: true
      },
      padding: {
        x: 20,
        y: 25
      },

    });




    startButton.setInteractive();
    startButton.on('pointerdown', () => this.startGame());
  }

  update() {
    // Desplazar el TileSprite
    this.stars.tilePositionY += 0.03;
    this.stars.tilePositionX -= 0.01;

    this.stars2.tilePositionY += 0.05;


    /* Animar logo */
    this.logo.angle += 0.1;


  }


  startGame() {
    // Aquí puedes definir lo que sucede cuando se inicia la partida
    this.scene.start('BattleScene');
  }


}

export default MainMenu;