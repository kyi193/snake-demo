import _ from 'lodash'
import './style.css';

import SnakeGame from './snake/SnakeGame'
const game = new SnakeGame(20, 20)
game.updateGameBoard()

const TIME_INTERVAL = 200
const DEBUG_MODE = false

document.onkeydown = checkKey;

let lastHeading = 'up'
function checkKey(e) {

  e = e || window.event;

  if (e.keyCode == '38') {
    lastHeading = 'up'
  }
  else if (e.keyCode == '40') {
    lastHeading = 'down'
  }
  else if (e.keyCode == '37') {
    lastHeading = 'left'
  }
  else if (e.keyCode == '39') {
    lastHeading = 'right'
  }

}

function displayBoard() {
  var table = document.createElement('table');
  var tableBody = document.createElement('tbody');

  const boardClassNameMap = {
    'O': 'empty',
    'X': 'body',
    'H': 'head',
    'T': 'tail'
  }
  game.gameBoard.getBoard().forEach(function (rowData) {
    var row = document.createElement('tr');
    rowData.forEach(function (cellData) {
      var cell = document.createElement('td');
      cell.className = boardClassNameMap[cellData]
      row.appendChild(cell);
    });
    tableBody.appendChild(row);
  });
  table.appendChild(tableBody);
  document.body.appendChild(table);
}

const updateBoard = (oldSnakeTail, newSnakeHead, oldSnakeHead, newSnakeTail, heading) => {
  try {
    let newSnakeHeadTD = document.querySelector(`tr:nth-of-type(${newSnakeHead[0] + 1}) td:nth-of-type(${newSnakeHead[1] + 1})`)
    newSnakeHeadTD.classList.replace("empty", "head")
    newSnakeHeadTD.classList.remove(["up", "down", "left", "right"])
    newSnakeHeadTD.classList.add(heading)
    let oldSnakeHeadTD = document.querySelector(`tr:nth-of-type(${oldSnakeHead[0] + 1}) td:nth-of-type(${oldSnakeHead[1] + 1})`)
    oldSnakeHeadTD.classList.remove(["up", "down", "left", "right"])
    oldSnakeHeadTD.classList.replace("head", "body")
    let newSnakeTailTD = document.querySelector(`tr:nth-of-type(${newSnakeTail[0] + 1}) td:nth-of-type(${newSnakeTail[1] + 1})`)
    newSnakeTailTD.classList.remove(["up", "down", "left", "right"])
    newSnakeTailTD.classList.replace("body", "tail")
    let oldSnakeTailTD = document.querySelector(`tr:nth-of-type(${oldSnakeTail[0] + 1}) td:nth-of-type(${oldSnakeTail[1] + 1})`)
    oldSnakeTailTD.classList.remove(["up", "down", "left", "right"])
    oldSnakeTailTD.classList.replace("tail", "empty")
  } catch (error) {

  }
}
const destroyBoard = () => {
  document.querySelector('body').innerHTML = '';
}

displayBoard()

if (!DEBUG_MODE) {
  window.confirm("Start Game?")
  var last = 0;
  let gameOver = false
  function render(now) {
    if (!last || now - last >= TIME_INTERVAL) {
      if (gameOver) {
        alert("GAME OVER!")
        location.reload()
      }
      last = now;
      gameOver = game.tick(lastHeading)
      const [newSnakeHead, oldSnakeTail, oldSnakeHead, newSnakeTail] = game.getSnakeDisplayUpdatePositions()
      updateBoard(oldSnakeTail, newSnakeHead, oldSnakeHead, newSnakeTail, game.snake.getHeading())


    }
    requestAnimationFrame(render);
  }

  render()
}
