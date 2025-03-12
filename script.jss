function updateScore() {
    const batchName = document.getElementById('batchName').value.trim();
    const newScore = document.getElementById('newScore').value.trim();
    const scoreTable = document.getElementById('scoreTable');
    const rows = scoreTable.getElementsByTagName('tr');

    if (!batchName || newScore === "") {
        alert("Please enter both Batch Name and Score.");
        return;
    }

    const parsedScore = parseInt(newScore, 10);
    if (isNaN(parsedScore) || parsedScore < 0) {
        alert("Please enter a valid positive number for the score.");
        return;
    }

    let found = false;

    for (let i = 0; i < rows.length; i++) {
        const cells = rows[i].getElementsByTagName('td');
        if (cells.length > 1 && cells[0].innerText.trim().toLowerCase() === batchName.toLowerCase()) {
            cells[1].innerText = parsedScore;
            found = true;
            break;
        }
    }

    if (!found) {
        alert('Batch not found! Please check the batch name.');
    }

    // Clear input fields
    document.getElementById('batchName').value = '';
    document.getElementById('newScore').value = '';
}
