let board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
];

let currentPlayer = "X"; // Player
let gameOver = false;

function makeMove(row, col) {
    if (board[row][col] !== "" || gameOver) return;

    board[row][col] = currentPlayer;
    updateUI();

    if (checkWinner(currentPlayer)) {
        document.getElementById("status").innerText = "You win!";
        gameOver = true;
        return;
    }

    if (isDraw()) {
        document.getElementById("status").innerText = "It's a draw!";
        gameOver = true;
        return;
    }

    // AI move
    aiMove();
}

function aiMove() {
    let emptyCells = [];

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i][j] === "") {
                emptyCells.push({ i, j });
            }
        }
    }

    if (emptyCells.length === 0) return;

    let move = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    board[move.i][move.j] = "O";

    updateUI();

    if (checkWinner("O")) {
        document.getElementById("status").innerText = "AI wins!";
        gameOver = true;
        return;
    }

    if (isDraw()) {
        document.getElementById("status").innerText = "It's a draw!";
        gameOver = true;
    }
}

function updateUI() {
    let buttons = document.querySelectorAll("#board button");
    let index = 0;

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            buttons[index].innerText = board[i][j];
            index++;
        }
    }
}

function checkWinner(player) {
    // Rows & Columns
    for (let i = 0; i < 3; i++) {
        if (board[i][0] === player && board[i][1] === player && board[i][2] === player)
            return true;
        if (board[0][i] === player && board[1][i] === player && board[2][i] === player)
            return true;
    }

    // Diagonals
    if (board[0][0] === player && board[1][1] === player && board[2][2] === player)
        return true;
    if (board[0][2] === player && board[1][1] === player && board[2][0] === player)
        return true;

    return false;
}

function isDraw() {
    return board.flat().every(cell => cell !== "");
}
