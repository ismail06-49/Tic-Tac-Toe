const cells = document.querySelectorAll('.cell')
const status = document.querySelector('.status')
const restart = document.querySelector('.restart-btn')
const winCondition = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
let options = ['', '', '', '', '', '', '', '', '']
let currentPlayer = 'X'
let gameActive = false

initializeGame()

function initializeGame() {
    cells.forEach(cell => cell.addEventListener('click', cellClicked))
    restart.addEventListener('click', restartGame)
    status.textContent = `${currentPlayer}'s turn`
    gameActive = true
}

function cellClicked() {
    const cellIndex = this.getAttribute('cellIndex')
    if (options[cellIndex] !== '' || !gameActive) {
        return
    }

    updateCell(this, cellIndex)
    checkWin()
}

function updateCell(cell, index) {
    options[index] = currentPlayer
    cell.textContent = currentPlayer
}

function changePlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X'
    status.textContent = `${currentPlayer}'s turn`
}

function checkWin() {
    let roundWin = false

    for (let i = 0; i < winCondition.length; i++) {
        const [a, b, c] = winCondition[i]

        if (options[a] == "" || options[b] == "" || options[c] == "") {
            continue
        }

        if (options[a] == options[b] && options[b] == options[c]) {
            roundWin = true
            break
        }
    }

    if (roundWin) {
        status.textContent = `Player ${currentPlayer} wins!`
        gameActive = false
    } else if (!options.includes("")) {
        status.textContent = "It's a draw!"
        gameActive = false
    } else {
        changePlayer()
    }
}

function restartGame() {
    currentPlayer = 'X'
    status.textContent = `${currentPlayer}'s turn`
    options = ['', '', '', '', '', '', '', '', '']
    cells.forEach(cell => cell.textContent = '')
    gameActive = true
}