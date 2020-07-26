const OPEN = 'O'
const WALL = 'W'

export default class GameBoard {
  constructor(rows, columns) {
    this.board = []
    this.rows = rows
    this.columns = columns
    for (let i = 0; i < rows; i++) {
      let row = []
      for (let j = 0; j < columns; j++) {
        row.push(OPEN)
      }
      this.board.push(row)
    }
  }
  getBoard() {
    return this.board
  }

  getCellValueForCoord(coord) {
    if (this.checkOutOfBounds(coord)) {
      return WALL
    }
    return this.board[coord[0]][coord[1]]
  }

  setCellValueForCoord(coord, cellValue) {
    this.board[coord[0]][coord[1]] = cellValue
  }

  resetBoard() {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        this.board[i][j] = OPEN
      }
    }
  }

  getOrigin() {
    return [Math.floor(this.rows / 2), Math.floor(this.columns / 2)]
  }

  checkOutOfBounds(coord) {
    return coord[0] < 0 || coord[0] === this.rows
      || coord[1] < 0 || coord[1] === this.columns
  }
}
