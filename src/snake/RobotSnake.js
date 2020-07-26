import Snake from './Snake'
export default class RobotSnake extends Snake {
  constructor(origin, length = 5) {
    super(origin, length)
    this.oppositeDirectionsMap = {
      up: 'down',
      down: 'up',
      left: 'right',
      right: 'left'
    }
  }

  moveSnake() {
    let nextMoves = new Set(['up', 'down', 'left', 'right'])
    nextMoves.delete(this.oppositeDirectionsMap[this.heading])
    nextMoves = Array.from(nextMoves)
    const randomIndex = Math.floor(Math.random() * nextMoves.length)
    let newHeading = nextMoves[randomIndex]
    super.moveSnake(newHeading)
  }
}
