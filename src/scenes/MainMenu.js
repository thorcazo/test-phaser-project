class MainMenu extends Phaser.Scene {
  constructor() {
      super({ key: 'MainMenu' });
  }

  preload() {
      // Aquí puedes precargar los recursos (imágenes, sonidos, etc.) que necesitarás en tu escena
  }

  create() {
      // Aquí puedes crear los objetos de tu escena, como botones, texto, etc.
      this.add.text(100, 100, 'Main Menu', { fill: '#000' });

      // Por ejemplo, puedes crear un botón de inicio de partida así:
      let startButton = this.add.text(100, 200, 'Start Game', { fill: '#000' });
      startButton.setInteractive();
      startButton.on('pointerdown', () => this.startGame());
  }

  startGame() {
      // Aquí puedes definir lo que sucede cuando se inicia la partida
      this.scene.start('BattleScene');
  }
}

export default MainMenu;