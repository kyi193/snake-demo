import GameBoard from './GameBoard'
import Snake from './Snake'
export default class SnakeGame {
  constructor(rows, columns) {
    this.rows = rows
    this.columns = columns
    this.gameBoard = new GameBoard(rows, columns)
    this.snake = new Snake(this.gameBoard.getOrigin())
  }

  getBoard() {
    return this.gameBoard.getBoard()
  }

  gameOver() {
    if (this.detectedWallCollision() || this.detectedBodyCollision()) {
      return true
    } else {
      return false
    }
  }

  detectedWallCollision() {
    const headCoords = this.snake.getHead()
    // console.log(headCoords)
    return headCoords[0] < 0 || headCoords[0] === this.rows
      || headCoords[1] < 0 || headCoords[1] === this.columns
  }

  detectedBodyCollision() {
    const headCoords = this.snake.getHead()
    const bodyCoords = this.snake.getBody()
    for (let i = 1; i < bodyCoords.length; i++) {
      if (JSON.stringify(bodyCoords[i]) === JSON.stringify(headCoords)) {
        return true
      }
    }
    return false
  }

  updateGameBoard() {
    let bodyCoords = this.snake.getBody()
    this.gameBoard.resetBoard()
    for (let i = 0; i < bodyCoords.length; i++) {
      let row = bodyCoords[i][0]
      let column = bodyCoords[i][1]
      this.gameBoard.board[row][column] = 'X'
    }
  }

  tick(heading) {
    this.updateGameBoard()
    this.snake.moveSnake(heading)
    return this.gameOver()
  }
}
