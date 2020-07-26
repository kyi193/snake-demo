import Snake from './Snake'
import { inludesCoord, includesCoord } from './utils'
export default class RobotSnake extends Snake {
  constructor(origin, length = 5, gameBoard) {
    super(origin, length)
    this.oppositeDirectionsMap = {
      up: 'down',
      down: 'up',
      left: 'right',
      right: 'left'
    }
    this.gameBoard = gameBoard
  }

  pickHeadingFromChoices(nextMoves) {
    nextMoves = Array.from(nextMoves)
    const randomIndex = Math.floor(Math.random() * nextMoves.length)
    return nextMoves[randomIndex]
  }

  moveSnake() {
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
