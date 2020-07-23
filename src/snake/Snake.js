export default class Snake {
  constructor() {
    this.body = [[4, 5], [5, 5], [6, 5], [7, 5]]
    this.directions = {
      up: [-1, 0],
      left: [0, -1],
      down: [1, 0],
      right: [0, 1]
    }
    this.heading = 'up'
  }
  getHead() {
    return this.body[0]
  }
  getBody() {
    return this.body
  }
  moveSnake() {
    let directionalHeading = this.directions[this.heading]
    let newHead = [this.body[0][0] + directionalHeading[0],
    this.body[0][1] + directionalHeading[1]]
    this.body.pop()
    this.body.unshift(newHead)
    console.log("NEW BODY", this.body)
  }
}
