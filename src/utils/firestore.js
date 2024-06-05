// src/utils/firestore.js

import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig.js";

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

// Función para leer documentos de la colección "dataPlayer"
const getScores = async () => {
  let players = [];
  const querySnapshot = await getDocs(collection(db, "dataPlayer"));
  querySnapshot.forEach((doc) => {
    players.push({ id: doc.id, ...doc.data() });
  });
  return players;
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


const getTopPlayers = async () => {
  const players = await getScores();
  const topPlayers = players.sort((a, b) => b.totalScore - a.totalScore);
  return topPlayers;
};

getTopPlayers();
export { addScore, getScores, getWordsEnemies, addDataEnemies, getTopPlayers };
