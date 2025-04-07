
const reset = "\x1b[0m"
const red = "\x1b[91m"
const blue = "\x1b[94m"
const green = "\x1b[92m"
const cyan = "\x1b[96m"
const player1 = `${red}X${reset}`
const player2 = `${blue}O${reset}`
let gameRunning = true
let turnCount = Math.ceil(Math.random() * 4)
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
         ${cyan}${gameBoard[0]} | ${gameBoard[1]} | ${gameBoard[2]}
        -----------
         ${cyan}${gameBoard[3]} | ${gameBoard[4]} | ${gameBoard[5]}
        -----------
         ${cyan}${gameBoard[6]} | ${gameBoard[7]} | ${gameBoard[8]}${reset}
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
        console.log(`${cyan}
        Its a tie.
        Play Again?
        ${reset}`)
    }
    else {
        return
    }
    
}


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
                gameRunning = false
                console.log(`${green}
        ${red}Player 1${reset} Wins!
        Play Again?
        ${reset}`)
            } else if(winChecker2) {
                gameRunning = false
                console.log(`${green}
        ${blue}Player 2${reset} Wins
        Play Again?
        ${reset}`)
                
            }
        }
    }
}
    
