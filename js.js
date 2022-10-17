const playerChoices = (() => {
    // Get data from inputs
    const radioInputs = document.querySelectorAll('input');
    let playerOptions = function() {
        let checked = [];
        radioInputs.forEach(input => {
            if (input.checked) {
                checked.push(input.id);
            }
        });
        return checked;
    };
    playerOptions();
    
    radioInputs.forEach(input => input.addEventListener('change', () => {
        playerOptions();
    }));

    return {
        playerOptions,
        radioInputs
    }
})();

const gameStatus = (() => {
    const gridCells = document.querySelectorAll('.grid-cell');
    let gameBoardStatus = {};

    // Scan grid cells and populate gameBoardStatus object
    function getGameBoardStatus() {
        gridCells.forEach(cell => {
            if (!cell.innerHTML) {
                gameBoardStatus[cell.id] = 'empty';
            }
            if (cell.innerHTML) {
                if (cell.firstChild.id === 'x') {
                    gameBoardStatus[cell.id] = 'x';
                } 
                if (cell.firstChild.id === 'o') {
                    gameBoardStatus[cell.id] = 'o';
                }
            }
        });
    }
    gridCells.forEach(cell => cell.addEventListener('click', () => gameplay.makeMove(cell)));

    function restartGame() {

    }

    return {
        gameBoardStatus,
        getGameBoardStatus,
        restartGame
    }
})();

const gameplay = (() => {

    function makeMove(cell) {
        const cellStatus = checkCell(cell);
        if (cellStatus === false) return;
        playerMove(cell, cellStatus);
        computerMove();
    }

    function checkCell(cell) {
        gameStatus.getGameBoardStatus();
        // Check if clicked cell is empty
        return gameStatus.gameBoardStatus[cell.id] === 'empty' ? true : false;
    }

    const xSign = document.querySelector('#x');
    const oSign = document.querySelector('#o');
    function playerMove(cell, cellStatus) {
        if (cellStatus === true) {
            // Prepare player sign
            let playerSign;
            if (playerChoices.playerOptions[0] === 'sign-x') {
                playerSign = xSign.cloneNode(true);
            } else if (playerChoices.playerOptions[0] === 'sign-o') {
                playerSign = oSign.cloneNode(true);
            }
            // Class sets display: none
            playerSign.classList.remove('sign-template');
            // Insert player sign
            cell.appendChild(playerSign);
        }
    }

    function computerMove() {
        if (playerChoices.playerOptions[1] === 'computer-smart') {
            computerMoveSmart();
        } else if (playerChoices.playerOptions[1] === 'computer-random') {
            computerMoveRandom();
        }
    }

    return {
        makeMove,
        checkCell
    }
})();