const gameStatus = (() => {
    const gridCells = document.querySelectorAll('.grid-cell');
    const gameBoardStatus = {};

    // Check all grid cells if there are any signs and populate gameBoardStatus accordingly
    function checkGameBoard() {
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

    return {
        gameBoardStatus,
        checkGameBoard
    }
})();

const playerSection = (() => {
    const radioInputs = document.querySelectorAll('input');
    const playerOptions = [];

    checkPlayerOptions();
    function checkPlayerOptions() {
        radioInputs.forEach(input => {
            if (input.checked) {
                playerOptions.push(input.id);
            }
        });
    }

    return {
        radioInputs,
        playerOptions
    }
})();