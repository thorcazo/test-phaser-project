// src/utils/firestore.js

import { collection, addDoc, getDocs, query, where, updateDoc, doc } from "firebase/firestore";
import { db } from "../firebaseConfig.js";
// Función para agregar o actualizar un documento en la colección "dataPlayer"
const addScore = async (playerName, numShipsDestr, errorKeyText, totalScoreText) => {
  try {
    const playersRef = collection(db, "dataPlayer");
    const q = query(playersRef, where("playerName", "==", playerName));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      // Si no existe un jugador con el mismo nombre, crea un nuevo documento
      await addDoc(playersRef, {
        playerName: playerName,
        shipsDestroyed: numShipsDestr,
        errorKey: errorKeyText,
        totalScore: parseInt(totalScoreText),
        date: new Date(),
      });
      console.log("Nuevo jugador añadido con éxito");
    } else {
      // Si existe un jugador con el mismo nombre, verifica la puntuación
      querySnapshot.forEach(async (document) => {
        const playerDocRef = doc(db, "dataPlayer", document.id);
        const existingData = document.data();

        if (parseInt(totalScoreText) > existingData.totalScore) {
          // Solo actualizar si la nueva puntuación es mayor que la existente
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

// Función para leer documentos de la colección "dataPlayer"
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
    console.log("Documento escrito con ID: ", docRef.id);
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


const getDataEnemies = async () => {
  const querySnapshot = await getDocs(collection(db, "dataEnemy"));
  const dataEnemies = [];
  querySnapshot.forEach((doc) => {
    dataEnemies.push({ id: doc.id, ...doc.data() });
  });
  return dataEnemies;
};




getTopPlayers();
export { addScore, getScores, getWordsEnemies, addDataEnemies, getTopPlayers, getDataEnemies, addWordsEnemies };
