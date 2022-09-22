export default (row, col, bombs) => {
  if (bombs > row * col) {
    bombs = (row * col) / 3
  }

  let board = []
  let mineLocation = []

  for (let x = 0; x < row; x++) {
    let subCol = []
    for (let y = 0; y < col; y++) {
      subCol.push({
        value: 0,
        revealed: false,
        neighbors: [],
        x,
        y,
        flagged: false,
      })
    }
    board.push(subCol)
  }

  let bombsCount = 0
  while (bombsCount < bombs) {
    //Choose random index from 0 to (r - 1)
    let x = randomNum(0, row - 1)

    //Choose random index from 0 to (c - 1)
    let y = randomNum(0, col - 1)

    //Set that cell to 'X'
    if (board[x][y] === 0) {
      board[x][y] = "X"
      mineLocation.push([x, y])
      bombsCount++
    }
  }
  return { board, mineLocation }
}
