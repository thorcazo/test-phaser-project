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

      // Añadir y centrar el texto del título 'Main Menu'
      const titleText = 'Type Space';
      this.add.text(width / 2, height / 2 - 100, titleText, { 
          fill: '#000', 
          fontSize: '32px',
          fontFamily: 'PressStart2P',
          fontStyle: 'bold'
      }).setOrigin(0.5);  // Centrar el texto horizontalmente

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
  }

  startGame() {
      // Definir lo que sucede cuando se inicia la partida
      this.scene.start('SceneA');
  }
}

export default MainMenu;
