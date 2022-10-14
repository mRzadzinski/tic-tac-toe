const playerChoices = (() => {
    // Get data from inputs
    const radioInputs = document.querySelectorAll('input');
    let playerOptions = [];
    
    radioInputs.forEach(input => input.addEventListener('change', () => checkPlayerOptions()));
    
    checkPlayerOptions();
    function checkPlayerOptions() {
        playerOptions = [];
        radioInputs.forEach(input => {
            if (input.checked) {
                playerOptions.push(input.id);
            }
        });
    }
    return {
        playerOptions
    }
})();

const gameStatus = (() => {
    const gridCells = document.querySelectorAll('.grid-cell');
    const gameBoardStatus = {};

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

    return {
        gameBoardStatus,
        getGameBoardStatus
    }
})();

const gameplay = (() => {
    const xSign = document.querySelector('#x');
    const oSign = document.querySelector('#o');

    function makeMove(cell) {
        const cellCheck = checkCell(cell);
        playerMove();
        computerMove();
    }

    function checkCell(cell) {
        gameStatus.getGameBoardStatus();
        for (let element in gameStatus.gameBoardStatus) {
            if (element === cell.id) {
                
            }
        };
    }

    function playerMove() {

    }

    function computerMove() {

    }

    return {
        makeMove
    }
})();