const readline = require('readline')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

const reset = "\x1b[0m"
const resetBoldDim = "\x1b[22m"
const resetItalic = "\x1b[23m"
const resetUnderline = "\x1b[24m"
const resetBlinking = "\x1b[25m"
const red = "\x1b[91m"
const blue = "\x1b[94m"
const green = "\x1b[92m"
const cyan = "\x1b[96m"
const bold = "\x1b[1m"
const dim = "\x1b[2m"
const italic = "\x1b[3m"
const underline = "\x1b[4m"
const blinking = "\x1b[5m"

const player1 = {
    symbol: `${red}X${reset}`,
    name: 'Player 1',
}
const player2 = {
    symbol: `${blue}O${reset}`,
    name: 'Player 2',
}

let p1WinCount = 0
let p2WinCount = 0
let turnStatus
let gameRunning = true
let turnCount = Math.random() < 0.5 ? 1 : 2

let gameBoard = [" ", " ", " ", " ", " ", " ", " ", " ", " "]

const winStates = [
                [0, 1, 2],
                [3, 4, 5],
                [6, 7, 8],
                [0, 3, 6],
                [1, 4, 7],
                [2, 5, 8],
                [0, 4, 8],
                [2, 4, 6]
]

const printBoard = () => {
    console.log(
        `
         ${gameBoard[0]} | ${gameBoard[1]} | ${gameBoard[2]}
        -----------
         ${gameBoard[3]} | ${gameBoard[4]} | ${gameBoard[5]}
        -----------
         ${gameBoard[6]} | ${gameBoard[7]} | ${gameBoard[8]}${reset}
        `
    )
}

const resetBoard = () => {
    gameBoard = [" ", " ", " ", " ", " ", " ", " ", " ", " "]
}


const playAgainPrompt = () => {
    rl.question('Play Again? (y/n):  ', input => {
        input.trim().toLowerCase();
        if(input === 'y' || input === 'yes') {
            resetBoard()
            gameRunning = true
            gameLoop();
        } else {
            console.log(`${dim}Thanks for playing!${reset}`)
            rl.close()
        }
    })
}

const playerSymbolForTurn = () => {
    if (turnCount % 2 === 0) {
        return player1.symbol
    } else if (turnCount % 2 === 1 || turnCount % 2 === 0.5) {
        return player2.symbol
    }
}

const checkWinner = (player1Array, player2Array) => {
    for(let array of winStates) {
        if (array.every(el => player1Array.includes(el))) return player1.name
        if (array.every(el => player2Array.includes(el))) return player2.name
    }
}

const showScore = () => {
    console.log(`\n\n
          ${green}${blinking}Current Score${reset}\n
               WINS	
      ${underline}${red}PLAYER 1${reset}  |  ${underline}${blue}PLAYER 2${reset}
                |
          ${p1WinCount}     |     ${p2WinCount}\n\n
          `)
}

const getPlayerPositions = (player) => {
    const boardCopy = [...gameBoard]
    const positions = []
    while(boardCopy.indexOf(player.symbol) !== -1) {
        let index = boardCopy.indexOf(player.symbol)
        positions.push(index)
        delete boardCopy[index]
    }
    return positions
}
const playMove = () => {
    const randomIndex = Math.round(Math.random() * 8)
    const symbol = playerSymbolForTurn()
    if(gameBoard[randomIndex] === " ") {
        gameBoard[randomIndex] = symbol
        turnCount++
        printBoard()
    }else {
        return "no delay"
    }
}


const playGame = () => {
    turnStatus = playMove()
    const player1Array = getPlayerPositions(player1)
    const player2Array = getPlayerPositions(player2)
    if(player1Array.length >= 3 || player2Array.length >= 3){
        const winner = checkWinner(player1Array, player2Array)
        if (winner) {
            gameRunning = false
            winner === player1.name ? p1WinCount++ : p2WinCount++
            console.log(`${bold}${winner} won!${bold}`)
            showScore()
            playAgainPrompt()
            return
        }
        if(gameBoard.indexOf(" ") === -1) {
            gameRunning = false
            console.log(`${dim}Its a tie...${reset}`)
            showScore()
            playAgainPrompt()
            return
        }
    }
}


const gameLoop = () => {
    if (gameRunning) {
        console.clear()
        playGame()
        turnStatus === "no delay" ? gameLoop() : setTimeout(gameLoop, 100)
    }
}

gameLoop(); // Start the game loop