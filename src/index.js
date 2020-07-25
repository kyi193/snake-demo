import _ from 'lodash'
import './style.css';

import SnakeGame from './snake/SnakeGame'
const game = new SnakeGame(20, 20)
game.updateGameBoard()

window.confirm("Start Game?")

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

  game.gameBoard.getBoard().forEach(function (rowData) {
    var row = document.createElement('tr');
    rowData.forEach(function (cellData) {
      if (cellData === 'O') {
        var cell = document.createElement('td');
        cell.className = "empty"
        row.appendChild(cell);
      } else {
        var cell = document.createElement('td');
        cell.className = "dot"
        row.appendChild(cell);
      }
    });
    tableBody.appendChild(row);
  });
  table.appendChild(tableBody);
  document.body.appendChild(table);
}

const updateBoard = (oldSnakeTail, newSnakeHead) => {
  let oldSnakeTailTD = document.querySelector(`tr:nth-of-type(${oldSnakeTail[0] + 1}) td:nth-of-type(${oldSnakeTail[1] + 1})`)
  oldSnakeTailTD.classList.replace("dot", "empty")
  let newSnakeHeadTD = document.querySelector(`tr:nth-of-type(${newSnakeHead[0] + 1}) td:nth-of-type(${newSnakeHead[1] + 1})`)
  newSnakeHeadTD.classList.replace("empty", "dot")

}
const destroyBoard = () => {
  document.querySelector('body').innerHTML = '';
}

displayBoard()


//////////////////////////////////////////////

var last = 0; // timestamp of the last render() call
let gameOver = false
function render(now) {
  // each 1 second call render
  if (!last || now - last >= 200) {
    if (gameOver) {
      alert("GAME OVER!")
      location.reload()
    }
    last = now;
    console.log(lastHeading)
    gameOver = game.tick(lastHeading)
    const [newSnakeHead, oldSnakeTail] = game.getSnakeDisplayUpdatePositions()
    console.log("Old Snake TaiL", oldSnakeTail)
    console.log("New Snake Head", newSnakeHead)
    updateBoard(oldSnakeTail, newSnakeHead)
    // destroyBoard()
    // displayBoard()


    // createNewObject();
  }
  requestAnimationFrame(render);
  // renderer.render(scene, camera);
}

render()
