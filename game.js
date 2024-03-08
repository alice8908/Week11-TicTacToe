// Declaring variables for an game board, current player,
// and the status of game active.
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = true;

const cells = Array.from(document.querySelectorAll('.cell'));
const playerDisplay = document.querySelector('.display-player');
const resetButton = document.querySelector('#reset');
const announcer = document.querySelector('.announcer');

const PLAYERX_WIN = 'PLAYERX_WIN';
const PLAYERO_WIN = 'PLAYERO_WIN';
const TIE = 'TIE';


// Setting the situations of winning based on tic-tac-toe rules.
// One of the player must take three straight sections in a row.
const winCondition = [
    //Horizontally
    [0,1,2],
    [3,4,5],
    [6,7,8],
    //Vertically
    [0,3,6],
    [1,4,7],
    [2,5,8],
    //Diagonally
    [0,4,8],
    [2,4,6]
];

function gameResult() {
    let roundWin = false;
    for (let i = 0; i < 8; i++) {
        const winGame = winCondition[i];
        const a = gameBoard[winGame[0]];
        const b = gameBoard[winGame[1]];
        const c = gameBoard[winGame[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWin = true;
            break;
        }
    }
    if (roundWin) {
        announce(currentPlayer === 'X' ? PLAYERX_WIN : PLAYERO_WIN);
        gameActive = false;
        return;
    }

    // Checking for a tie game
    else if (!gameBoard.includes('')) {
        announce(TIE);
    }
}

// The game takes only 'X' and 'O' to make a mark for players. 
const isValidAction = (cell) => {
    if (cell.innerText === 'X' || cell.innerText === 'O') {
        return false;
    }
    return true;
}

// After one players move, updating for the next player.
const updateBoard = (index) => {
    gameBoard[index] = currentPlayer;
}

const changePlayer = () => {
    playerDisplay.classList.remove(`player${currentPlayer}`);
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    playerDisplay.innerText = currentPlayer;
    playerDisplay.classList.add(`player${currentPlayer}`);
}

const userAction = (cell, index) => {
    if (isValidAction(cell) && gameActive) {
        cell.innerText = currentPlayer;
        cell.classList.add(`player${currentPlayer}`);
        updateBoard(index);
        gameResult();
        changePlayer();
    }
}

// Adding click event so when user clicks one of the cell,
// It gets player's mark. Either X or O
cells.forEach( (cell, index) => {
    cell.addEventListener('click', () => userAction(cell, index));
})

// Announcing the winner of current match.
const announce = (type) => {
    switch(type) {
        case PLAYERO_WIN:
            announcer.innerHTML = 'Player <span class="playerO">O</span> Won!';
            break;
        case PLAYERX_WIN:
            announcer.innerHTML = 'Player <span class="playerX">X</span> Won!';
            break;
        case TIE:
            announcer.innerText = 'Tie!'       
    }
    announcer.classList.remove('hide');
}

// Resetting the board. When user wishes to stop current game,
// or we got a winner of this match, user can restart the game.
const restartGame = () => {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    announcer.classList.add('hide');

    if (currentPlayer === 'O') {
        changePlayer();
    }

    cells.forEach(cell => {
        cell.innerText = '';
        cell.classList.remove('playerX');
        cell.classList.remove('playerO');
    });
}

resetButton.addEventListener('click', restartGame);