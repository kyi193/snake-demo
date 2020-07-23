import GameBoard from './GameBoard'
import Snake from './Snake'
export default class SnakeGame {
  constructor() {
    this.gameBoard = new GameBoard
    this.snake = new Snake
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
    console.log(headCoords)
    return headCoords[0] === 0 || headCoords[0] === 9
      || headCoords[1] === 0 || headCoords[1] === 9
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
}
