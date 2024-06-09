import { addDataEnemies } from "./firestore.js";



const dataEnemy = [
  // Enemigos de dificultad baja (low)
  { type: "Enemy1", health: "50", difficulty: "low", speed: "85", points: "3" },
  { type: "Enemy2", health: "50", difficulty: "low", speed: "85", points: "3" },
  { type: "Enemy3", health: "50", difficulty: "low", speed: "85", points: "3" },
  { type: "Enemy4", health: "100", difficulty: "low", speed: "95", points: "5" },
  { type: "Enemy5", health: "100", difficulty: "low", speed: "95", points: "5" },
  { type: "Enemy6", health: "100", difficulty: "low", speed: "95", points: "5" },

  // Enemigos de dificultad media (medium)
  { type: "Enemy7", health: "100", difficulty: "medium", speed: "95", points: "7" },
  { type: "Enemy8", health: "100", difficulty: "medium", speed: "95", points: "7" },
  { type: "Enemy9", health: "100", difficulty: "medium", speed: "95", points: "7" },
  { type: "Enemy10", health: "150", difficulty: "medium", speed: "100", points: "10" },
  { type: "Enemy11", health: "150", difficulty: "medium", speed: "100", points: "10" },
  { type: "Enemy12", health: "150", difficulty: "medium", speed: "100", points: "10" },

  // Enemigos de dificultad alta (hard)
  { type: "Enemy13", health: "200", difficulty: "hard", speed: "140", points: "30" },
  { type: "Enemy14", health: "200", difficulty: "hard", speed: "145", points: "30" },
  { type: "Enemy15", health: "200", difficulty: "hard", speed: "150", points: "30" },
  { type: "Enemy16", health: "200", difficulty: "hard", speed: "155", points: "50" },
  { type: "Enemy17", health: "200", difficulty: "hard", speed: "160", points: "50" },
  { type: "Enemy18", health: "200", difficulty: "hard", speed: "165", points: "50" }
];




dataEnemy.forEach((enemy) => {

  addDataEnemies(enemy.type, enemy.health, enemy.difficulty, enemy.speed, enemy.points);
});

