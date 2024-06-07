import { addDataEnemies } from "./firestore.js";



const dataEnemy = [
  // Enemigos de dificultad baja (low)
  { type: "Enemy1", health: "50", difficulty: "low", speed: "50" },
  { type: "Enemy2", health: "50", difficulty: "low", speed: "50" },
  { type: "Enemy3", health: "50", difficulty: "low", speed: "50" },
  { type: "Enemy4", health: "100", difficulty: "low", speed: "70" },
  { type: "Enemy5", health: "100", difficulty: "low", speed: "70" },
  { type: "Enemy6", health: "100", difficulty: "low", speed: "100" },

  // Enemigos de dificultad media (medium)
  { type: "Enemy7", health: "100", difficulty: "medium", speed: "100" },
  { type: "Enemy8", health: "100", difficulty: "medium", speed: "100" },
  { type: "Enemy9", health: "100", difficulty: "medium", speed: "100" },
  { type: "Enemy10", health: "150", difficulty: "medium", speed: "120" },
  { type: "Enemy11", health: "150", difficulty: "medium", speed: "120" },
  { type: "Enemy12", health: "150", difficulty: "medium", speed: "140" },

  // Enemigos de dificultad alta (hard)
  { type: "Enemy13", health: "200", difficulty: "hard", speed: "140" },
  { type: "Enemy14", health: "200", difficulty: "hard", speed: "145" },
  { type: "Enemy15", health: "200", difficulty: "hard", speed: "150" },
  { type: "Enemy16", health: "200", difficulty: "hard", speed: "155" },
  { type: "Enemy17", health: "200", difficulty: "hard", speed: "160" },
  { type: "Enemy18", health: "200", difficulty: "hard", speed: "165" }
];




dataEnemy.forEach((enemy) => {

  addDataEnemies(enemy.type, enemy.health, enemy.difficulty, enemy.speed);
});

