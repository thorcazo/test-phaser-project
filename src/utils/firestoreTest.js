// src/utils/firestoreTest.js

import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";

// Función para agregar un documento a la colección "score_player"
const addScore = async (playerName, numShipsDestr, totalScoreText) => {
  try {
    const docRef = await addDoc(collection(db, "score_player"), {
      player_name: playerName,
      numShips_destr: numShipsDestr,
      total_score: totalScoreText
    });
    console.log("Documento escrito con ID: ", docRef.id);
  } catch (e) {
    console.error("Error añadiendo el documento: ", e);
  }
};

// Función para leer documentos de la colección "score_player"
const getScores = async () => {
  const querySnapshot = await getDocs(collection(db, "score_player"));
  querySnapshot.forEach((doc) => {
    console.log(`${doc.id} => `, doc.data());
  });
};

export { addScore, getScores };
