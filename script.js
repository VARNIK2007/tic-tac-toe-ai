let board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
];

let gameOver = false;

function makeMove(row, col) {
    if (board[row][col] !== "" || gameOver) return;

    board[row][col] = "X";
    updateUI();

    if (checkWinner("X")) {
        document.getElementById("status").innerText = "You win!";
        gameOver = true;
        return;
    }

    if (isDraw()) {
        document.getElementById("status").innerText = "It's a draw!";
        gameOver = true;
        return;
    }

    setTimeout(aiMove, 300); // small delay for realism
}

function aiMove() {
    let bestScore = -Infinity;
    let move;

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i][j] === "") {
                board[i][j] = "O";
                let score = minimax(board, 0, false);
                board[i][j] = "";

                if (score > bestScore) {
                    bestScore = score;
                    move = { i, j };
                }
            }
        }
    }

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

function minimax(board, depth, isMaximizing) {
    if (checkWinner("O")) return 10 - depth;
    if (checkWinner("X")) return depth - 10;
    if (isDraw()) return 0;

    if (isMaximizing) {
        let bestScore = -Infinity;

        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[i][j] === "") {
                    board[i][j] = "O";
                    let score = minimax(board, depth + 1, false);
                    board[i][j] = "";
                    bestScore = Math.max(score, bestScore);
                }
            }
        }
        return bestScore;

    } else {
        let bestScore = Infinity;

        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[i][j] === "") {
                    board[i][j] = "X";
                    let score = minimax(board, depth + 1, true);
                    board[i][j] = "";
                    bestScore = Math.min(score, bestScore);
                }
            }
        }
        return bestScore;
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
    for (let i = 0; i < 3; i++) {
        if (board[i][0] === player && board[i][1] === player && board[i][2] === player)
            return true;
        if (board[0][i] === player && board[1][i] === player && board[2][i] === player)
            return true;
    }

    if (board[0][0] === player && board[1][1] === player && board[2][2] === player)
        return true;
    if (board[0][2] === player && board[1][1] === player && board[2][0] === player)
        return true;

    return false;
}

function isDraw() {
    return board.flat().every(cell => cell !== "");
}

function restartGame() {
    board = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
    ];
    gameOver = false;
    document.getElementById("status").innerText = "";
    updateUI();
}
