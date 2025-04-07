# Tic-Tac-Toe

Challenges Faced:

- The use of ANSI escape codes made it considerably harder to extract "X" and "O" values from the game board. In the while loop, I was trying to find the index of X and push that index to a new array. However, console logging the new array showed that it was empty every single time. Troubleshooting by console logging the game board showed that the ANSI codes were preventing the indexOf method from finding values with "X", as the method was finding *ANSI CODE* X *ANSI CODE* instead of "X". Removing the ansi codes from the code resolved the issue.