import GameBoard from './GameBoard'
import Snake from './Snake'
export default class SnakeGame {
  constructor() {
    this.gameBoard = new GameBoard
    this.snake = new Snake
  }
}
