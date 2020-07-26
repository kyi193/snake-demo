export default class Snake {
  constructor(origin, length = 5, skipBody = false) {
    this.body = []
    if (!skipBody) {
      for (let rowOffSet = 0; rowOffSet < length; rowOffSet++) {
        this.body.push([origin[0] + rowOffSet, origin[1]])
      }
    }
    this.directions = {
      up: [-1, 0],
      left: [0, -1],
      down: [1, 0],
      right: [0, 1]
    }
    this.heading = 'up'
    this.lastTail = null
  }

  getHead() {
    return this.body[0]
  }

  getTail() {
    return this.body[this.body.length - 1]
  }

  getLastTail() {
    return this.lastTail
  }

  getBody() {
    return this.body
  }

  grow() {
    this.body.push(this.lastTail)
    this.lastTail = null
  }

  getPreviousHead() {
    return this.body[1]
  }

  getHeading() {
    return this.heading
  }

  updateHeading(heading) {
    if (heading) {
      if (this.heading === 'right' && heading === 'left') { return }
      if (this.heading === 'left' && heading === 'right') return
      if (this.heading === 'up' && heading === 'down') return
      if (this.heading === 'down' && heading === 'up') return
      this.heading = heading
    }
  }

  nextPosition(directionalHeading) {
    const currentHead = this.getHead()
    return [
      currentHead[0] + directionalHeading[0],
      currentHead[1] + directionalHeading[1]
    ]
  }

  moveSnake(heading) {
    this.updateHeading(heading)
    let directionalHeading = this.directions[this.heading]
    let newHead = this.nextPosition(directionalHeading)
    this.lastTail = this.body.pop()
    this.body.unshift(newHead)
  }

  createNextSnake(heading) {
    let newSnake = new Snake(this.origin, this.length, true);
    newSnake.heading = this.heading
    newSnake.lastTail = this.lastTail
    newSnake.body = this.body
    newSnake.moveSnake(heading)
    return newSnake
  }
}
