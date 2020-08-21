const OPEN = 'O'

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

  getRows() {
    return this.rows
  }

  getColumns() {
    return this.columns
  }
}
