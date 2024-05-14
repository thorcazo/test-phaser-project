import { getFirestore, collection, getDocs, doc, setDoc, deleteDoc, updateDoc, onSnapshot, query, orderBy, limit, where, addDoc } from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js'
import { db } from "./firestore-database.js"
// import { Game } from "./game.js"
// We get the button on index that prints the leaderboard with its id 'leaderboardBttn'
const leaderboardBttn = document.getElementById('leaderboardBttn')



function printLeaderBoard() {
  // En la base de datos, obtenémos la coleción 'leaderboard'
  const leaderboardRef = collection(db, 'leaderboard')
  // Obtenemos todos los documentos de leaderboard
  const leaderboardQuery = query(leaderboardRef, orderBy('Score', 'desc'), limit(10))
  const leaderboard = []
  onSnapshot(leaderboardQuery, (querySnapshot) => {
    querySnapshot.forEach((doc) => {
      leaderboard.push({ id: doc.id, ...doc.data() })
    })
    document.getElementById('leaderboard-table').innerHTML = leaderboard.map((player) => `<tr><td>${player.Name}</td><td>${player.Score}</td></tr>`).join('')
  })
}
leaderboardBttn.addEventListener('click', printLeaderBoard)