const variables = (() => {
    const radioInputs = document.querySelectorAll('input');
    const gridCells = document.querySelectorAll('.grid-cell');
    const xSign = document.querySelector('#x');
    const oSign = document.querySelector('#o');
    let playerOptions;
    let playerSign;
    let computerSign;
    let gameBoardStatus = {};

    return {
        radioInputs,
        gridCells,
        xSign,
        oSign,
        playerOptions,
        playerSign,
        computerSign,
        gameBoardStatus
    }
})();

const playerChoices = (() => {
    // Get data from inputs
    getPlayerOptions();
    function getPlayerOptions() {
        variables.playerOptions = [];
        variables.radioInputs.forEach(input => {
            if (input.checked) {
                variables.playerOptions.push(input.id);
            }
        });
    }

    assignSigns();
    function assignSigns() {
            // Assign and prepare sign graphics for players
            if (variables.playerOptions[0] === 'sign-x') {
                variables.playerSign = variables.xSign.cloneNode(true);
                variables.computerSign = variables.oSign.cloneNode(true);
            } else if (variables.playerOptions[0] === 'sign-o') {
                variables.playerSign = variables.oSign.cloneNode(true);
                variables.computerSign = variables.xSign.cloneNode(true);
            }
            // Class sets display: none
            variables.playerSign.classList.remove('sign-template');
            variables.computerSign.classList.remove('sign-template');
    }

    variables.radioInputs.forEach(input => input.addEventListener('change', () => {
        gameStatus.restartGame();
        getPlayerOptions();
        assignSigns()
    }));

    return {
        getPlayerOptions
    }
})();

const gameStatus = (() => {

    // Scan grid cells and populate gameBoardStatus object
    function getGameBoardStatus() {
        variables.gridCells.forEach(cell => {
            if (!cell.innerHTML) {
                variables.gameBoardStatus[cell.id] = 'empty';
            }
            if (cell.innerHTML) {
                if (cell.firstChild.id === 'x') {
                    variables.gameBoardStatus[cell.id] = 'x';
                } 
                if (cell.firstChild.id === 'o') {
                    variables.gameBoardStatus[cell.id] = 'o';
                }
            }
        });
    }
    variables.gridCells.forEach(cell => cell.addEventListener('click', () => gameplay.makeMove(cell)));

    function restartGame() {

    }

    return {
        getGameBoardStatus,
        restartGame
    }
})();

const gameplay = (() => {

    function makeMove(cell) {
        const cellStatus = checkCell(cell);
        if (cellStatus === false) return;
        playerMove(cell);
        gameStatus.getGameBoardStatus();
        computerMove();
    }

    function checkCell(cell) {
        gameStatus.getGameBoardStatus();
        // Check if clicked cell is empty
        return variables.gameBoardStatus[cell.id] === 'empty' ? true : false;
    }
    
    

    function playerMove(cell) {
        if (cellStatus === true) {
            // Insert player sign
            cell.appendChild(variables.playerSign);
        }
        
    }

    function computerMove() {
        if (variables.playerOptions[1] === 'computer-smart') {
            computerMoveSmart();
        } else if (variables.playerOptions[1] === 'computer-random') {
            computerMoveRandom();
        }
    }

    function computerMoveSmart() {

    }

    function computerMoveRandom() {

    }

    return {
        makeMove
    }
})();