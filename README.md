# TYPE SPACE
![Type Start](https://github.com/thorcazo/test-phaser-project/assets/45442766/6c2eb854-62cf-44c9-b961-0fbf371d97c9)

### Descripción
**TYPE SPACE** es un videojuego web desarrollado como proyecto final del Curso de FP de Desarrollo de Aplicaciones Web en el IES José Planes. En este juego, los jugadores deben derrotar naves enemigas escribiendo correctamente las palabras asignadas a cada nave. Es un juego educativo y divertido que mejora las habilidades de mecanografía del jugador.

### Características del Juego
- **Tecnología de Desarrollo:** VITE.
- **Frontend:** JavaScript.
- **Librería de Animación:** Phaser 3.
- **Base de Datos:** Firebase Database (Firestore).
- **Motor de Audio:** Custom Audio Manager.

### Cómo Jugar
1. **Iniciar Partida:** Pulsa "Start" en la pantalla del menú principal.
2. **Derrota Enemigos:** Escribe correctamente la palabra que aparece junto a cada nave enemiga para destruirla.
3. **Pérdida de Vida:** Cuando un enemigo llegue a tu posición se acaba la partida. 

### Escenas del Juego
- **MainMenu:** El menú principal del juego.
- **BattleScene:** La escena de combate contra las naves enemigas.
- **Gameover:** La escena de final de juego.
- **UIScene:** Configuración de la interfaz de usuario y lógica del juego.
- **CreditsScene:** Escena de créditos.
- **Leaderboard:** Tabla de clasificación de jugadores.

### Estructura del Proyecto
- **src/bootloader.js:** Carga todos los assets y archivos necesarios.
- **src/init.js:** Configuración inicial de la escena.
- **src/scenes/:** Contiene todas las escenas del juego.
  - **BattleScene.js:** Escena de combate contra las naves enemigas.
  - **Gameover.js:** Escena de fin de juego.
  - **MainMenu.js:** Menú principal del juego.
  - **ui.js:** Configuración de la interfaz de usuario.
  - **CreditsScene.js:** Escena de créditos.
  - **Leaderboard.js:** Tabla de clasificación.
- **src/gameObjects/**
  - **Bullet.js:** Objeto de bala.
  - **enemy.js:** Objeto de enemigo.
  - **player.js:** Objeto del jugador.
- **src/utils/**
  - **firestore.js:** Funciones para interactuar con Firestore.

### Desarrollo del Proyecto
Este proyecto fue desarrollado como parte del curso de FP en Desarrollo de Aplicaciones Web en el IES José Planes. El objetivo del proyecto era crear un videojuego que fuera tanto educativo como entretenido, utilizando tecnologías modernas de desarrollo web. El equipo de desarrollo estuvo compuesto por estudiantes del curso, quienes trabajaron en distintas partes del proyecto, desde la programación del frontend hasta la integración con la base de datos.

### Clases y Objetos
#### Player
Clase que define el jugador, su salud y texto de salud.
```javascript
class Player extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, type) {
    super(scene, x, y, type);
    scene.add.existing(this);
    scene.physics.world.enable(this);
    this.body.setImmovable(true);
    this.health = 1;
    this.healthText = scene.add.text((this.x - 35), (this.y + 50), "HP: " + this.health, { font: "12px PressStart2P", fill: "#fff" });
  }
}
```

#### Enemy
Clase que define el enemigo, su salud, dificultad, velocidad y comportamiento.
```javascript
class Enemy extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, type, speed, difficulty) {
    super(scene, x, y, type);
    scene.add.existing(this);
    scene.physics.world.enable(this);
    this.body.setImmovable(true);
    this.health = 100;
    this.difficulty = difficulty;
    this.wordText = scene.add.text(1400, 0, "", { font: "13px PressStart2P", fill: "#fff", padding: { x: 20, y: 10 } }).setOrigin(0.5);
    this.speed = speed;
    this.target = null;
    this.turn_rate = 1;
    this.wobble_limit = 15;
    this.wobble_speed = 250;
  }

  setTarget(target) {
    this.target = target;
  }

  update() {
    if (!this.target) return;
    const tx = this.target.x;
    const ty = this.target.y;
    const x = this.x;
    const y = this.y;
    const rotation = Phaser.Math.Angle.Between(x, y, tx, ty);
    this.setRotation(rotation);
    this.scene.physics.moveToObject(this, this.target, 50);
  }
}
```

#### AudioManager
Clase para gestionar los sonidos del juego.
```javascript
class AudioManager {
  constructor(scene) {
    this.scene = scene;
    this.sounds = {};
  }

  load(key, path) {
    this.scene.load.audio(key, path);
  }

  add(key, config) {
    if (!this.sounds[key]) {
      this.sounds[key] = this.scene.sound.add(key, config);
    }
  }

  play(key, config) {
    if (this.sounds[key]) {
      this.sounds[key].play(config);
    }
  }

  pause(key) {
    if (this.sounds[key] && this.sounds[key].isPlaying) {
      this.sounds[key].pause();
    }
  }

  resume(key) {
    if (this.sounds[key] && this.sounds[key].isPaused) {
      this.sounds[key].resume();
    }
  }

  stop(key) {
    if (this.sounds[key] && this.sounds[key].isPlaying) {
      this.sounds[key].stop();
    }
  }

  pauseAll() {
    this.scene.sound.sounds.forEach(sound => sound.pause());
  }

  resumeAll() {
    this.scene.sound.sounds.forEach(sound => sound.resume());
  }

  muteAll() {
    this.scene.sound.mute = true;
  }

  unmuteAll() {
    this.scene.sound.mute = false;
  }

  isPlaying(key) {
    return this.sounds[key] && this.sounds[key].isPlaying;
  }

  increaseVolume(key, value) {
    if (this.sounds[key]) {
      this.sounds[key].setVolume(this.sounds[key].volume + value);
    }
  }
}
```

### Base de Datos
#### Funciones de Firestore
- **addScore:** Agrega o actualiza la puntuación de un jugador.
- **getScores:** Obtiene las puntuaciones de todos los jugadores.
- **addDataEnemies:** Agrega datos de enemigos a la base de datos.
- **addWordsEnemies:** Agrega palabras de enemigos a la base de datos.
- **getWordsEnemies:** Obtiene las palabras de los enemigos.
- **getTopPlayers:** Obtiene los 10 mejores jugadores.

```javascript
import { collection, addDoc, getDocs, query, where, updateDoc, doc } from "firebase/firestore";
import { db } from "../firebaseConfig.js";

const addScore = async (playerName, numShipsDestr, errorKeyText, totalScoreText) => {
  try {
    const playersRef = collection(db, "dataPlayer");
    const q = query(playersRef, where("playerName", "==", playerName));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      await addDoc(playersRef, {
        playerName: playerName,
        shipsDestroyed: numShipsDestr,
        errorKey: errorKeyText,
        totalScore: parseInt(totalScoreText),
        date: new Date(),
      });
      console.log("Nuevo jugador añadido con éxito");
    } else {
      querySnapshot.forEach(async (document) => {
        const playerDocRef = doc(db, "dataPlayer", document.id);
        const existingData = document.data();

        if (parseInt(totalScoreText) > existingData.totalScore) {
          await updateDoc(playerDocRef, {
            shipsDestroyed: numShipsDestr,
            errorKey: errorKeyText,
            totalScore: parseInt(totalScoreText),
            date: new Date(),
          });
          console.log("Puntuación del jugador actualizada con éxito");
        } else {
          console.log("La nueva puntuación no es mayor que la existente. No se ha actualizado el registro.");
        }
      });
    }
  } catch (e) {
    console.error("Error añadiendo o actualizando el documento: ", e);
  }
};

const getScores = async () => {
  let players = [];
  const querySnapshot = await getDocs(collection(db, "dataPlayer"));
  querySnapshot.forEach((doc) => {
    players.push({ id: doc.id, ...doc.data() });
  });
  return players;
};

const addDataEnemies = async (type, health, difficulty, speed, points) => {
  try {
    const docRef = await addDoc(collection(db, "dataEnemy"), {
      type: type,
      health: health,
      difficulty: difficulty,
      speed: speed,
      points: points
    });
    console.log("Documento escrito con ID: ", docRef.id);
  } catch (e) {
    console.error("Error añadiendo el documento: ", e);
  }
};

const addWordsEnemies = async (color, difficulty, word) => {
  try {
    const docRef = await addDoc(collection(db, "wordsEnemies"), {
      color: color,
      difficulty: difficulty,
      word: word
    });
    console.log("Documento escrito con ID: ", doc

Ref.id);
  } catch (e) {
    console.error("Error añadiendo el documento: ", e);
  }
};

const getWordsEnemies = async () => {
  const querySnapshot = await getDocs(collection(db, "wordsEnemies"));
  const wordsEnemies = [];
  querySnapshot.forEach((doc) => {
    wordsEnemies.push({ id: doc.id, ...doc.data() });
  });
  return wordsEnemies;
};

const getTopPlayers = async () => {
  const players = await getScores();
  const topPlayers = players.sort((a, b) => b.totalScore - a.totalScore);
  return topPlayers.splice(0, 10);
};

getTopPlayers();
export { addScore, getScores, getWordsEnemies, addDataEnemies, getTopPlayers, getDataEnemies, addWordsEnemies };
```

### Licencia
Este proyecto está bajo la licencia **Creative Commons Attribution 4.0 International (CC BY 4.0)**. Para más información, visita [Creative Commons](https://creativecommons.org/licenses/by/4.0/).

---

Esperamos que disfrutes jugando a **TYPE SPACE** tanto como nosotros disfrutamos desarrollándolo. ¡Buena suerte y diviértete mejorando tus habilidades de mecanografía!
