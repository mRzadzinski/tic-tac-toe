const v = (() => {
    const gridCells = document.querySelectorAll('.grid-cell');
    let gameBoardStatus = {};
    let playerOptions;
    let player1Sign;
    let player2Sign;
    let turn = 'player1';

    return {
        gridCells,
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
            // Class sets display: none
            v.player1Sign.classList.remove('sign-template');
            v.player2Sign.classList.remove('sign-template');
    }

    _radioInputs.forEach(input => input.addEventListener('change', () => {
        gameStatus.restartGame();
        getPlayerOptions();
        assignSigns()
    }));

    return {
        getPlayerOptions
    }
})();

const gameStatus = (() => {
    const restartButton = document.querySelector('#restart');
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
    v.gridCells.forEach(cell => cell.addEventListener('click', () => {
        if (!cell.innerHTML) {            
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
    }));

    function restartGame() {

    }

    return {
        getGameBoardStatus,
        restartGame
    }
})();

const gameplay = (() => {

    function makeMove(cell) {
        humanMove(cell);
        gameStatus.getGameBoardStatus();
        
        if (v.playerOptions[1] === 'computer') {
            computerMove();
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
        let emptyCells = [];
        for (let cell in v.gameBoardStatus) {
            if (v.gameBoardStatus[cell] === 'empty') emptyCells.push(cell);
        }
        let randomCell = emptyCells[[Math.floor(Math.random() * (emptyCells.length - 1))]]
        if (randomCell === undefined) return;
        // Populate this field
        v.gridCells[+randomCell - 1].appendChild(v.player2Sign.cloneNode(true));
        }

    function checkForWinner() {
        checkRows();
        checkColumns();
        checkDiagonals();
    }

    function checkRows() {
        for (let i = 1; i < 10; i += 3) {
            if (v.gameBoardStatus[i] === v.gameBoardStatus[i + 1] && v.gameBoardStatus[i] === v.gameBoardStatus[i + 2] 
                && v.gameBoardStatus[i] != 'empty' && v.gameBoardStatus[i] != undefined) {
                endGame();
            }
        }
    }

    function checkColumns() {
        for (let i = 1; i < 10; i++) {
            if (v.gameBoardStatus[i] === v.gameBoardStatus[i + 3] && v.gameBoardStatus[i] === v.gameBoardStatus[i + 6] 
                && v.gameBoardStatus[i] != 'empty' && v.gameBoardStatus[i] != undefined) {
                endGame();
            }
        }
    }

    function checkDiagonals() {
            if (v.gameBoardStatus[1] === v.gameBoardStatus[5] && v.gameBoardStatus[1] === v.gameBoardStatus[9] 
                && v.gameBoardStatus[1] != 'empty' && v.gameBoardStatus[1] != undefined) {
                endGame();
            } else if (v.gameBoardStatus[3] === v.gameBoardStatus[5] && v.gameBoardStatus[3] === v.gameBoardStatus[7] 
                && v.gameBoardStatus[3] != 'empty' && v.gameBoardStatus[3] != undefined) {
                    endGame();
                }
    }

    function endGame() {
        console.log('winner!')
    }

    return {
        makeMove,
        checkForWinner
    }
})();