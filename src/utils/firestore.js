// src/utils/firestore.js

import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";

// Función para agregar un documento a la colección "score_player"
const addScore = async (playerName, numShipsDestr, errorKeyText, totalScoreText) => {
  try {
    const docRef = await addDoc(collection(db, "dataPlayer"), {
      playerName: playerName,
      shipsDestroyed: numShipsDestr,
      errorKey: errorKeyText,
      totalScore: parseInt(totalScoreText),
      date: new Date(),
    });
    console.log("Documento escrito con ID: ", docRef.id);
  } catch (e) {
    console.error("Error añadiendo el documento: ", e);
  }
};

// Función para leer documentos de la colección "score_player"
const getScores = async () => {
  const querySnapshot = await getDocs(collection(db, "dataPlayer"));
  querySnapshot.forEach((doc) => {
  });
};

const addDataEnemies = async (word, color, enemyName) => {
  try {
    const docRef = await addDoc(collection(db, "wordsEnemies"), {
      word: word,
      color: color,
      enemyName: enemyName,
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

const addNamesEnemies = async (name, dificulty) => {
  try {

    const docRef = await addDoc(collection(db, 'namesEnemies'));

  } catch (e) {
    console.error("Error añadiendo el documento: ", e);
  }
}



/*  Método para optener el top de jugadores con más puntuacion (totalScore)  */
const getTopPlayers = async () => {
  const querySnapshot = await getDocs(collection(db, "dataPlayer"));
  const topPlayers = [];
  querySnapshot.forEach((doc) => {
    /* si el totalScore del jugador es mayor que el anterior almacenar */
    if (topPlayers.length < 3) {
      topPlayers.push({ id: doc.id, ...doc.data() });
    } else {
      /* si el totalScore del jugador es mayor que el menor del top, reemplazarlo */
      const minScore = Math.min(...topPlayers.map(player => player.totalScore));
      if (doc.data().totalScore > minScore) {
        const index = topPlayers.findIndex(player => player.totalScore === minScore);
        topPlayers[index] = { id: doc.id, ...doc.data() };
      }
    }
  });
  return topPlayers;
};







export { addScore, getScores, getWordsEnemies, addDataEnemies, getTopPlayers };
