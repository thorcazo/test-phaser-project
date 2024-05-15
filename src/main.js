import { getFirestore, collection, getDocs, doc, setDoc, deleteDoc, updateDoc, onSnapshot, query, orderBy, limit, where, addDoc } from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js'
import { db } from "./firestore-database.js"

function printLeaderBoard() {
  const leaderboardTable = document.querySelector('#leaderboard-table tbody');
  // En la base de datos, obtenémos la coleción 'leaderboard'
  const leaderboardRef = collection(db, 'leaderboard')
  // Obtenemos todos los documentos de leaderboard
  const leaderboardQuery = query(leaderboardRef, orderBy('Score', 'desc'), limit(10))
  const leaderboard = []
  onSnapshot(leaderboardQuery, (querySnapshot) => {
    querySnapshot.forEach((doc) => {
      leaderboard.push({ id: doc.id, ...doc.data() })
    })
    leaderboardTable.innerHTML = leaderboard.map((player) => `
    <tr class="hover:bg-gray-100">
      <td class="px-6 py-4 whitespace-nowrap">${player.Name}</td>
      <td class="px-6 py-4 whitespace-nowrap">${player.Score}</td>
    </tr>`).join('')
    // Mostramos la tabla

  })
}

// Call printLeaderBoard when the page loads
window.onload = printLeaderBoard;
