const readline = require('readline')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})
// Color codes to add color to the game
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
const player1 = `${red}X${reset}`
const player2 = `${blue}O${reset}`
let p1WinCount = 0
let p2WinCount = 0

// When set to true, the game will run. Else it will stop running
let gameRunning = true

// Gives a 50/50 chance of being either 1 or 2, providing
// an equal chance for each player to make the first move
let turnCount = Math.ceil(Math.random() * 2)

// An array of empty strings for the gameboard, as players
// make moves, the empty strings get replaced with either 'X' or 'O'
let gameBoard = [" ", " ", " ", " ", " ", " ", " ", " ", " "]

// An array of arrays. Each inner array represents three positions on the board that
// equals a win state if the all contain the same player symbol
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

const playGame = () => {

    let randomIndex = Math.round(Math.random() * 8)
    if(gameBoard[randomIndex] === " " && turnCount % 2 === 0) {
        gameBoard[randomIndex] = player1
        printBoard()
        turnCount++
    } else if(gameBoard[randomIndex] === " " && (turnCount % 2 === 1 || turnCount % 2 === 0.5)) {
        gameBoard[randomIndex] = player2
        printBoard()
        turnCount++
    } else if(gameBoard.indexOf(" ") === -1) {
        gameRunning = false
        console.log(
`${cyan}Its a tie...${reset}

          WINS	
  ${underline}${red}PLAYER 1${reset}  |  ${underline}${blue}PLAYER 2${reset}
            |
      ${p1WinCount}     |     ${p2WinCount}
      
      `)
        rl.question('Play Again? (y/n):  ', input => {
            input.trim().toLowerCase()
            if(input === 'y' || input === "yes") {
                gameBoard = [" ", " ", " ", " ", " ", " ", " ", " ", " "]
                gameRunning = true
                isGame();
            } else {
                rl.close()
            }
        })
    }
    else {
        return
    }
    
}
function isGame() {
    while(gameRunning) {
        playGame()
        let play1Board = [...gameBoard]
        let play2Board = [...gameBoard]
        let play1Array = []
        let play2Array = []
        while(play1Board.indexOf(player1) !== -1) {
            let firstXIndex = play1Board.indexOf(player1)
            play1Array.push(firstXIndex)
            // Allows extraction of index of X, remove it but not update the length so
            // to get the true index of the next X in the array
            delete play1Board[firstXIndex]
        }
        while(play2Board.indexOf(player2) !== -1) {
            let firstOIndex = play2Board.indexOf(player2)
            play2Array.push(firstOIndex)
            delete play2Board[firstOIndex]
        }
        if(play1Array.length >= 3 || play2Array.length >= 3){
            for(let array of winStates) {
                const winChecker = array.every(el => play1Array.includes(el))
                const winChecker2 = array.every(el => play2Array.includes(el))
                if(winChecker) {
                    p1WinCount++
                    gameRunning = false
                    console.log(`${green}
${blinking}Player 1 Wins${reset}

          WINS	
  ${underline}${red}PLAYER 1${reset}  |  ${underline}${blue}PLAYER 2${reset}
            |
      ${p1WinCount}     |     ${p2WinCount}
      
      `)
                    rl.question('Play Again? (y/n):  ', input => {
                        input.trim().toLowerCase();
                        if(input === 'y' || input === 'yes') {
                            gameBoard = [" ", " ", " ", " ", " ", " ", " ", " ", " "]
                            gameRunning = true
                            isGame();
                        } else {
                            rl.close()
                        }
                    })
                } else if(winChecker2) {
                    p2WinCount++
                    gameRunning = false
                    console.log(`${green}
${blinking}Player 2 Wins${reset}

          WINS	
  ${underline}${red}PLAYER 1${reset}  |  ${underline}${blue}PLAYER 2${reset}
            |
      ${p1WinCount}     |     ${p2WinCount}
      
      `)
                    rl.question('Play Again? (y/n):  ', input => {
                        input = input.trim().toLowerCase()
                        if(input === 'y' || input === 'yes') {
                            gameBoard = [" ", " ", " ", " ", " ", " ", " ", " ", " "]
                            gameRunning = true
                            isGame();
                        } else {
                            rl.close()
                        }
                    })  
                }
            }
        }
    }
}

isGame();

