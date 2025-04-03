const reset = "\x1b[0m"
const red = "\x1b[91m"
const blue = "\x1b[94m"
const green = "\x1b[92m"
const cyan = "\x1b[96m"
let gameBoard = [" ", " ", " ", " ", " ", " ", " ", " ", " "]
const player1 = `${red} X${reset}`
const player2 = `${blue} O${reset}`
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

