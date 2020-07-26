import Snake from './Snake'
import { inludesCoord, includesCoord } from './utils'

const BLANK_SPACE = 1
const PELLET = 100
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

  getValueForMove(coord, heading, depth = 1) {
    const cellValue = this.gameBoard.getCellValueForCoord(coord)
    let currentCoordValue = this.cellCoordinateValueMap[cellValue]

    if (depth === 2) {
      return currentCoordValue
    }
    let nextMoves = new Set(['up', 'down', 'left', 'right'])
    let nextMovesArr = Array.from(nextMoves)
    nextMoves.delete(this.oppositeDirectionsMap[heading])
    for (let i = 0; i < nextMovesArr.length; i++) {
      let nextHeading = nextMovesArr[i]
      let nextDirectionalHeading = this.directions[nextHeading]
      let nextCoordinate = this.nextPosition(nextDirectionalHeading)
      currentCoordValue += this.getValueForMove(nextCoordinate, nextHeading, depth + 1)
    }
    return currentCoordValue
  }

  moveSnake() {
    let nextMoves = new Set(['up', 'down', 'left', 'right'])
    nextMoves.delete(this.oppositeDirectionsMap[this.heading])

    this.bestHeading = this.heading;
    this.bestHeadingValue = -9999;
    let nextMovesArr = Array.from(nextMoves)
    // let values = []

    for (let i = 0; i < nextMovesArr.length; i++) {
      let nextHeading = nextMovesArr[i]
      let nextDirectionalHeading = this.directions[nextHeading]
      let nextCoordinate = this.nextPosition(nextDirectionalHeading)
      let checkHeadingValue = this.getValueForMove(nextCoordinate, nextHeading, 1)
      // values.push([nextHeading, checkHeadingValue])
      if (checkHeadingValue > this.bestHeadingValue) {
        this.bestHeadingValue = checkHeadingValue
        this.bestHeading = nextHeading
        // console.log(bestHeadingValue, checkHeadingValue)
      }
    }
    // debugger
    super.moveSnake(this.bestHeading)
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
