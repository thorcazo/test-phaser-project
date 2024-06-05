import { getTopPlayers } from '../utils/firestore.js';

export default class Gameover extends Phaser.Scene {
  constructor() {
    super({ key: 'Gameover' });
  }

  init(data) {
    this.leaderData = data.leaderData;

    this.audioManager = data.audioManager;
  }

  async create() {
    this.scene.launch('UIScene');
    this.scene.stop('BattleScene');

    // Obtener los datos de los mejores jugadores
    const players = await getTopPlayers();
    const mappedPlayers = players.map(p => ({
      name: p.playerName,
      score: p.totalScore
    }));
//NOTE: En esta parte sale un error ya que no existe la variable playerData
    mappedPlayers.forEach((score, index) => {
      if (this.playerData.puntuacionTotal > score.score) {
        this.scene.launch('leaderboardScene', { playerData: this.playerData });
      }
    });

    // Establecer un color de fondo
    this.cameras.main.setBackgroundColor('#1C142A');

    // Posición de la pantalla
    this.screenX = this.cameras.main.centerX - this.cameras.main.centerX;
    this.screenY = this.cameras.main.centerY - this.cameras.main.centerY;

    // Añade un texto de Game Over en el centro de la pantalla
    this.add.text(this.screenX + 80, this.screenY + 80, 'GAME', { fontSize: '4rem', fontFamily: 'PressStart2P', color: '#fff' });
    this.add.text(this.screenX + 80, this.screenY + 144, 'OVER', { fontSize: '4rem', fontFamily: 'PressStart2P', color: '#fff' });

    // Añade una imagen del planeta de Game Over
    this.add.image(this.screenX + 380, this.screenY + 80, 'planetGameOver').setOrigin(0, 0).setScale(0.8);

    // Botones interactivos
    this.createButton(this.screenX + 80, this.screenY + 244, 'newgameButton', 'NUEVA PARTIDA', 'BattleScene');
    this.createButton(this.screenX + 280, this.screenY + 244, 'mainMenuButton', 'MENU PRINCIPAL', 'MainMenu');

    // Fondo del marco
    this.marcoFondoGameOver = this.add.image(this.screenX + 80, this.screenY + 344, 'marcoFondoGameOver').setOrigin(0, 0);

    // Nave del jugador
    this.add.image(this.marcoFondoGameOver.x + 200, this.marcoFondoGameOver.y + 51, 'Player').setOrigin(0.5, 0.5).setScale(0.5);

    // Variables dinámicas para los valores


    // Textos de estadísticas
    this.namePlayerText = this.add.text(this.marcoFondoGameOver.x + 30, this.marcoFondoGameOver.y + 120, `JUGADOR ................ ${this.playerData.nombreJugador}`, {
      fontSize: '12px',
      fontFamily: 'PressStart2P',
      color: '#fff'
    });

    this.navesDestruidasText = this.add.text(this.marcoFondoGameOver.x + 30, this.marcoFondoGameOver.y + 150, `NAVES DESTRUIDAS ....... ${this.playerData.navesDestruidas}`, {
      fontSize: '12px',
      fontFamily: 'PressStart2P',
      color: '#fff'
    });

    this.erroresCometidosText = this.add.text(this.marcoFondoGameOver.x + 30, this.marcoFondoGameOver.y + 180, `ERRORES COMETIDOS ...... ${this.playerData.erroresCometidos}`, {
      fontSize: '12px',
      fontFamily: 'PressStart2P',
      color: '#fff'
    });

    this.totalScoreText = this.add.text(this.marcoFondoGameOver.x + 30, this.marcoFondoGameOver.y + 240, `PUNTUACION TOTAL ....... ${this.playerData.puntuacionTotal}`, {
      fontSize: '12px',
      fontFamily: 'PressStart2P',
      color: '#fff'
    });

    // Tabla de puntuaciones
    this.tabla = this.add.text(this.screenX + 630, this.screenY + 100, 'PUNTUACIÓN JUGADORES', { fontSize: '1.5rem', fontFamily: 'PressStart2P', color: '#fff' });
    this.tabla__nombre = this.add.text(this.tabla.x, this.tabla.y + 70, 'NOMBRE', { fontSize: '1.5rem', fontFamily: 'PressStart2P', color: '#fff' });
    this.tabla__puntos = this.add.text(this.tabla__nombre.x + 270, this.tabla__nombre.y, 'PUNTOS', { fontSize: '1.5rem', fontFamily: 'PressStart2P', color: '#fff' });

    // Mostrar las puntuaciones obtenidas
    mappedPlayers.forEach((score, index) => {
      this.namePlayer = this.add.text(this.tabla__nombre.x, this.tabla__nombre.y + 70 + (index * 50), score.name, { fontSize: '1.5rem', fontFamily: 'PressStart2P', color: '#fff' });
      this.scorePlayer = this.add.text(this.namePlayer.x + 300, this.tabla__nombre.y + 70 + (index * 50), score.score, { fontSize: '1.5rem', fontFamily: 'PressStart2P', color: '#fff' });
    });
  }

  createButton(x, y, key, text, sceneKey) {
    const button = this.add.image(x, y, key).setOrigin(0, 0).setInteractive();
    const buttonText = this.add.text(x + 18, y + 20, text, { fontSize: '12px', fontFamily: 'PressStart2P', color: '#ffffff' }).setInteractive();

    button.on('pointerdown', () => {
      this.scene.stop('Gameover');
      this.scene.start(sceneKey);

      /* resetear datos */
      this.resetData();
      this.resetBattleSceneData();
    });
    buttonText.on('pointerdown', () => {
      this.scene.stop('Gameover');
      this.scene.start(sceneKey);

      /* resetear datos */
      this.resetData();
      this.resetBattleSceneData();
    });
  }



  resetData() {
    this.nombreJugador = '';
    this.navesDestruidas = 0;
    this.erroresCometidos = 0;
    this.puntuacionTotal = 0;
  }

  resetBattleSceneData() {
    const battleScene = this.scene.get('BattleScene');
    battleScene.resetData();
  }




}