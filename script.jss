// Firebase configuration (Replace with your actual Firebase config)
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Function to update scores
function updateScore() {
    const batchName = document.getElementById('batchName').value.trim();
    const newScore = parseInt(document.getElementById('newScore').value, 10);

    if (!batchName || isNaN(newScore)) {
        alert("Please enter a valid batch name and score.");
        return;
    }

    // Update Firestore
    db.collection("scores").doc(batchName).set({
        score: newScore
    }).then(() => {
        alert("Score updated successfully!");
        loadScores(); // Reload scores after update
    }).catch((error) => {
        console.error("Error updating score:", error);
    });

    // Clear input fields
    document.getElementById('batchName').value = '';
    document.getElementById('newScore').value = '';
}

// Function to load scores from Firebase
function loadScores() {
    db.collection("scores").get().then((querySnapshot) => {
        const scoreTable = document.getElementById('scoreTable');
        scoreTable.innerHTML = ""; // Clear existing table

        querySnapshot.forEach((doc) => {
            const row = document.createElement('tr');
            row.innerHTML = `<td>${doc.id}</td><td>${doc.data().score}</td>`;
            scoreTable.appendChild(row);
        });
    });
}

// Load scores when the page loads
window.onload = loadScores;
