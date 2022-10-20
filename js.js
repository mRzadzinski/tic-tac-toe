const v = (() => {
    const gridContainer = document.querySelector('.grid-container');
    const gridCells = document.querySelectorAll('.grid-cell');
    const scoreDiv = document.querySelector('#score');
    let gameBoardStatus = {};
    let playerOptions = [];
    let player1Sign = null;
    let player2Sign = null;
    let turn = 'player1';

    return {
        gridContainer,
        gridCells,
        scoreDiv,
        gameBoardStatus,
        playerOptions,
        player1Sign,
        player2Sign,
        turn
    }
})();

const playerChoices = (() => {
    const _radioInputs = document.querySelectorAll('input');
    const _xSign = document.querySelector('#x');
    const _oSign = document.querySelector('#o');

    // Get data from inputs
    getPlayerOptions();
    function getPlayerOptions() {
        v.playerOptions = []
        _radioInputs.forEach(input => {
            if (input.checked) {
                v.playerOptions.push(input.id);
            }
        });
    }

    assignSigns();
    function assignSigns() {
            // Assign and prepare sign graphics for players
            if (v.playerOptions[0] === 'sign-x') {
                v.player1Sign = _xSign.cloneNode(true);
                v.player2Sign = _oSign.cloneNode(true);
            } else if (v.playerOptions[0] === 'sign-o') {
                v.player1Sign = _oSign.cloneNode(true);
                v.player2Sign = _xSign.cloneNode(true);
            }
            v.player1Sign.classList.remove('invisible');
            v.player2Sign.classList.remove('invisible');
    }

    _radioInputs.forEach(input => input.addEventListener('change', () => {
        gameStatus.restartGame();
        getPlayerOptions();
        assignSigns();
    }));

    return {
        assignSigns
    }
})();

const gameStatus = (() => {
    const _restartButton = document.querySelector('#restart');
    _restartButton.addEventListener('click', restartGame);

    // Scan grid cells and populate gameBoardStatus object
    function getGameBoardStatus() {
        v.gridCells.forEach(cell => {
            if (!cell.innerHTML) {
                v.gameBoardStatus[cell.id] = 'empty';
            }
            if (cell.innerHTML) {
                if (cell.firstChild.id === 'x') {
                    v.gameBoardStatus[cell.id] = 'x';
                } 
                if (cell.firstChild.id === 'o') {
                    v.gameBoardStatus[cell.id] = 'o';
                }
            }
        });
    }

    function gridListener(event) {
        let cell = event.target;
        if (!cell.innerHTML && cell.tagName != 'IMG') {            
            gameplay.makeMove(cell);

            // Track whose turn is next
            if (v.playerOptions[1] === 'computer') {
                return;
            } else if (v.turn === 'player1') {
                v.turn = 'player2';
            } else if (v.turn === 'player2') {
                v.turn = 'player1';
            }
        }
    }

    addGridListeners();
    function addGridListeners() {
        v.gridCells.forEach(cell => cell.addEventListener('click', gridListener));
    }

    function removeGridListeners() {
        v.gridCells.forEach(cell => cell.removeEventListener('click', gridListener));
    }
    
    function restartGame() {
        v.scoreDiv.classList.add('invisible');
        v.gridContainer.classList.remove('fade');
        v.gridCells.forEach(cell => cell.innerHTML = '');
        v.gameBoardStatus = {};
        v.turn = 'player1';
        addGridListeners();
    }

    return {
        getGameBoardStatus,
        removeGridListeners,
        restartGame
    }
})();

const gameplay = (() => {

    function makeMove(cell) {
        humanMove(cell);
        gameStatus.getGameBoardStatus();
        checkEmptyCells();

        let check = checkForWinner();
        if (check === true) return;

        if (v.playerOptions[1] === 'computer') {
            computerMove();
            gameStatus.getGameBoardStatus();
            checkEmptyCells();
            checkForWinner();
        }
    }
    
    function humanMove(cell) {
            // Insert player sign
            let sign;
            if (v.turn === 'player1') {
                sign = v.player1Sign;
            } else if (v.turn === 'player2') {
                sign = v.player2Sign;
            }
            cell.appendChild(sign.cloneNode(true));
    }

    function computerMove() {
        // Randomly choose an empty field
        emptyCells = checkEmptyCells();
        if (emptyCells === undefined) return;
        let randomCell = emptyCells[[Math.floor(Math.random() * (emptyCells.length - 1))]]
        // Populate this field
        v.gridCells[+randomCell - 1].appendChild(v.player2Sign.cloneNode(true));
        }

    function checkEmptyCells() {
        let emptyCells = [];
        for (let cell in v.gameBoardStatus) {
            if (v.gameBoardStatus[cell] === 'empty') emptyCells.push(cell);
        }
        // End game if there are no empty fields
        if (emptyCells.length === 0) {
            announceTie();
            return;
        }
        return emptyCells;
    }

    function checkForWinner() {
        let check1 = checkRows();
        if (check1) {
            endGame(check1);
            return true;
        }
        let check2 = checkColumns();
        if (check2) {
            endGame(check2);
            return true;
        }
        let check3 = checkDiagonals();
        if (check3) {
            endGame(check3);
            return true;
        }
    }

    function checkRows() {
        for (let i = 1; i < 10; i += 3) {
            if (v.gameBoardStatus[i] === v.gameBoardStatus[i + 1] && v.gameBoardStatus[i] === v.gameBoardStatus[i + 2] 
                && v.gameBoardStatus[i] != 'empty' && v.gameBoardStatus[i] != undefined) {
                    return i;
            }
        }
    }

    function checkColumns() {
        for (let i = 1; i < 10; i++) {
            if (v.gameBoardStatus[i] === v.gameBoardStatus[i + 3] && v.gameBoardStatus[i] === v.gameBoardStatus[i + 6] 
                && v.gameBoardStatus[i] != 'empty' && v.gameBoardStatus[i] != undefined) {
                return i;
            }
        }
    }

    function checkDiagonals() {
            if (v.gameBoardStatus[1] === v.gameBoardStatus[5] && v.gameBoardStatus[1] === v.gameBoardStatus[9] 
                && v.gameBoardStatus[1] != 'empty' && v.gameBoardStatus[1] != undefined) {
                return 1;
            } else if (v.gameBoardStatus[3] === v.gameBoardStatus[5] && v.gameBoardStatus[3] === v.gameBoardStatus[7] 
                    && v.gameBoardStatus[3] != 'empty' && v.gameBoardStatus[3] != undefined) {
                return 3;
                }
    }

    function endGame(cellNumber) {
        // Determine winner
        let winner;
        let winnerSign = v.gridCells[cellNumber - 1].firstChild.id;
        if (winnerSign === 'x' && v.playerOptions[0] === 'sign-x') {
            winner = 'Player 1';
        } else if (winnerSign === 'o' && v.playerOptions[0] === 'sign-o') {
            winner = 'Player 1';
        } else {
            winner = 'Player 2';
        }
        endgameEffects();
        v.scoreDiv.innerHTML = `${winner} won!`;
    }

    function announceTie() {
        endgameEffects();
        v.scoreDiv.innerHTML = `Tie!`;
    }

    function endgameEffects() {
        gameStatus.removeGridListeners();
        v.gridContainer.classList.add('fade');
        v.scoreDiv.classList.remove('invisible');
    }

    return {
        makeMove,
    }
})();