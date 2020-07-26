import Snake from './Snake'
import { inludesCoord, includesCoord } from './utils'
import GameBoard from './GameBoard'

const BLANK_SPACE = 107
const PELLET = 800
const WALL = -1000
const BODY = -1000

export default class RobotSnake extends Snake {
  constructor(origin, length = 5, gameBoard) {
    super(origin, length)
    this.oppositeDirectionsMap = {
      up: 'down',
      down: 'up',
      left: 'right',
      right: 'left'
    }
    this.cellCoordinateValueMap = {
      O: BLANK_SPACE,
      H: BODY,
      T: BODY,
      X: BODY,
      P: PELLET,
      W: WALL
    }
    this.gameBoard = gameBoard
  }

  pickHeadingFromChoices(nextMoves) {
    nextMoves = Array.from(nextMoves)
    const randomIndex = Math.floor(Math.random() * nextMoves.length)
    return nextMoves[randomIndex]
  }

  getValueForMove(snake, board, depth = 1) {
    let coord = snake.getHead();
    let newBoard = new GameBoard(board.rows, board.columns, true);

    const cellValue = this.gameBoard.getCellValueForCoord(coord)
    let currentCoordValue = this.cellCoordinateValueMap[cellValue]

    if (depth === 5) {
      return currentCoordValue
    }

    let nextMoves = new Set(['up', 'down', 'left', 'right'])
    nextMoves.delete(this.oppositeDirectionsMap[snake.getHeading()])
    let nextMovesArr = Array.from(nextMoves)
    for (let i = 0; i < nextMovesArr.length; i++) {
      let nextHeading = nextMovesArr[i]
      let nextSnake = this.createNextSnake(nextHeading)
      let newBoard = new GameBoard(board.rows, board.columns, true);
      newBoard.setBoard(board.getBoard())
      if (board.checkOutOfBounds(nextSnake.getHead())) {
        currentCoordValue = WALL
        continue
      }
      newBoard.board[nextSnake.getHead()[0]][nextSnake.getHead()[1]] = 'H';
      newBoard.board[nextSnake.getLastTail()[0]][nextSnake.getLastTail()[1]] = 'O';
      currentCoordValue += this.getValueForMove(nextSnake, newBoard, 1)
    }
    return currentCoordValue
  }

  moveSnake() {
    let nextMoves = new Set(['up', 'down', 'left', 'right'])
    nextMoves.delete(this.oppositeDirectionsMap[this.heading])

    this.bestHeading = this.heading;
    this.bestHeadingValue = -9999;
    let nextMovesArr = Array.from(nextMoves)
    let values = []

    for (let i = 0; i < nextMovesArr.length; i++) {
      let nextHeading = nextMovesArr[i]
      let nextSnake = this.createNextSnake(nextHeading)
      debugger
      // let nextDirectionalHeading = this.directions[nextHeading]
      // let nextCoordinate = this.nextPosition(nextDirectionalHeading)
      let newBoard = new GameBoard(this.gameBoard.rows, this.gameBoard.columns, true);
      newBoard.setBoard(this.gameBoard.getBoard())
      let checkHeadingValue;
      if (newBoard.checkOutOfBounds(nextSnake.getHead())) {
        checkHeadingValue = WALL
      } else {
        newBoard.board[nextSnake.getHead()[0]][nextSnake.getHead()[1]] = 'H';
        newBoard.board[nextSnake.getLastTail()[0]][nextSnake.getLastTail()[1]] = 'O';
        checkHeadingValue = this.getValueForMove(nextSnake, newBoard, 1)
      }
      values.push([checkHeadingValue, nextHeading])

      // if (checkHeadingValue > this.bestHeadingValue) {
      //   this.bestHeadingValue = checkHeadingValue
      //   this.bestHeading = nextHeading
      //   // console.log(bestHeadingValue, checkHeadingValue)
      // }
    }
    values.sort();
    let bestHeading = values[0][1];
    console.table(values);
    super.moveSnake(bestHeading)
  }

  moveSnake2() {
    let nextMoves = new Set(['up', 'down', 'left', 'right'])
    nextMoves.delete(this.oppositeDirectionsMap[this.heading])

    while (true) {
      let newHeading = this.pickHeadingFromChoices(nextMoves)
      let newDirectionalHeading = this.directions[newHeading]
      const nextCoordinate = this.nextPosition(newDirectionalHeading)
      const didHitBody = includesCoord(this.body, nextCoordinate)
      const didHitWall = this.gameBoard.checkOutOfBounds(nextCoordinate)
      if (!didHitBody && !didHitWall) {
        super.moveSnake(newHeading)
        break
      } else {
        nextMoves.delete(newHeading)
      }
      if (nextMoves.size === 0) {
        break
      }
    }
  }
}
