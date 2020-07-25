import GameBoard from './GameBoard'
import Snake from './Snake'

const PELLET_SCORE = 33

export default class SnakeGame {
  constructor(rows, columns, growSnakeEveryNTurns = 10, randomGrow = false) {
    this.rows = rows
    this.columns = columns
    this.growSnakeEveryNTurns = growSnakeEveryNTurns
    this.turn = 1
    this.gameBoard = new GameBoard(rows, columns)
    this.snake = new Snake(this.gameBoard.getOrigin())
    this.pellets = new Set()
    this.score = 0
    this.lastPelletEaten = null
    this.randomGrow = randomGrow
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

  detectPelletCollision() {
    const headCoord = this.snake.getHead()
    const headCoordStr = `${headCoord[0]},${headCoord[1]}`
    if (this.pellets.has(headCoordStr)) {
      // this.lastPelletEaten = headCoord
      this.score += PELLET_SCORE
      this.pellets.delete(headCoordStr)
      if (!this.randomGrow) {
        this.snake.grow()
      }
    }
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
      let isValidPelletCoord = true
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
    this.score += 10
    if (Math.random() <= .1) {
      this.generatePellet()
    }

    this.turn += 1
    this.updateGameBoard()
    this.snake.moveSnake(heading)
    this.detectPelletCollision()
    if (this.randomGrow && this.turn % this.growSnakeEveryNTurns === 0) {
      this.snake.grow()
    }
    return this.gameOver()
  }

  getScore() {
    return this.score
  }
}
