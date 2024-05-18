export default class StarfieldHorizontal extends Phaser.Scene {

  constructor() {
    super({ key: 'StarfieldHorizontal', active: true });

    this.stars;
    this.speed = 250; // Ajusta la velocidad según sea necesario
    this.max = 500;
    this.xx = [];
    this.yy = [];
  }

  /* PRELOAD ========================== */
  preload() {
    this.load.image('star', 'https://labs.phaser.io/assets/demoscene/star4.png');
  }

  /* CREATE ============================ */
  create() {
    this.input.keyboard.enabled = false;

    // Crea el blitter para las estrellas
    this.stars = this.add.blitter(0, 0, 'star');

    for (let i = 0; i < this.max; i++) {
      // Genera posiciones iniciales para las estrellas
      this.xx[i] = Math.floor(Math.random() * window.innerWidth);
      this.yy[i] = Math.floor(Math.random() * window.innerHeight);

      // Crea la estrella en la posición calculada
      this.stars.create(this.xx[i], this.yy[i]);
    }
  }

  update(time, delta) {
    for (let i = 0; i < this.max; i++) {
      // Mueve las estrellas de derecha a izquierda
      this.xx[i] -= this.speed * (delta / 1000);

      // Si una estrella se mueve fuera de la pantalla, reubícala a la derecha
      if (this.xx[i] < 0) {
        this.xx[i] = window.innerWidth;
      }

      let bob = this.stars.children.list[i];
      bob.x = this.xx[i];
      bob.y = this.yy[i];
    }
  }
}

