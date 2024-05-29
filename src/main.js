import { getFirestore, collection, getDocs, doc, setDoc, deleteDoc, updateDoc, onSnapshot, query, orderBy, limit, where, addDoc } from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js'
import { db } from "./firestore-database.js"
// import { Game } from "./game.js"
// We get the button on index that prints the leaderboard with its id 'leaderboardBttn'
const leaderboardBttn = document.getElementById('leaderboardBttn')


export function fetchLeaderboardData(table) {
  const leaderboardRef = collection(db, 'leaderboard');
    const leaderboardQuery = query(leaderboardRef, orderBy('Score', 'desc'), limit(10));
    onSnapshot(leaderboardQuery, (querySnapshot) => {
      let leaderboardText = '';
      querySnapshot.forEach((doc) => {
        const player = doc.data();
        leaderboardText += `${player.Name}: ${player.Score}\n`;
      });
      table.setText(leaderboardText);
    });
}


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

printLeaderBoard()

export { printLeaderBoard }
leaderboardBttn.addEventListener( 'click', () => {
  document.getElementById('leaderboard-modal').style.display = 'block'
})

document.getElementById('leaderboard-modal').addEventListener('click', (event) => {
  if (event.target === document.getElementById('leaderboard-modal')) {
    document.getElementById('leaderboard-modal').style.display = 'none'
  }
})

// export { Game }
