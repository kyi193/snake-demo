import GameBoard from './GameBoard'
import Snake from './Snake'
export default class SnakeGame {
  constructor(rows, columns, growSnakeEveryNTurns = 10) {
    this.rows = rows
    this.columns = columns
    this.growSnakeEveryNTurns = growSnakeEveryNTurns
    this.turn = 1
    this.gameBoard = new GameBoard(rows, columns)
    this.snake = new Snake(this.gameBoard.getOrigin())
    this.pellets = new Set()
  }

  getSnakeDisplayUpdatePositions() {
    return [
      this.snake.getHead(),
      this.snake.getLastTail(),
      this.snake.getPreviousHead(),
      this.snake.getTail()
    ]
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
    const headCoords = this.snake.getHead()
    const tailCoords = this.snake.getTail()
    this.gameBoard.board[headCoords[0]][headCoords[1]] = 'H'
    this.gameBoard.board[tailCoords[0]][tailCoords[1]] = 'T'
  }

  generatePellet() {
    while (true) {
      const randomRow = Math.floor(Math.random() * this.rows)
      const randomColumn = Math.floor(Math.random() * this.columns)
      const isValidPelletCoord = true
      const body = this.snake.getBody()
      for (let i = 0; i < body.length; i++) {
        let coord = body[i]
        if (coord[0] === randomRow && coord[1] === randomColumn) {
          isValidPelletCoord = false
          break
        }
      }
      if (isValidPelletCoord) {
        this.pellets.add(`${randomRow},${randomColumn}`)
        break
      }
    }
  }
  tick(heading) {
    if (Math.random() <= .1) {
      this.generatePellet()
      console.log(this.pellets)
    }

    this.turn += 1
    this.updateGameBoard()
    this.snake.moveSnake(heading)
    if (this.turn % this.growSnakeEveryNTurns === 0) {
      this.snake.grow()
    }
    return this.gameOver()
  }

  getScore() {
    return 10 * this.turn
  }
}
