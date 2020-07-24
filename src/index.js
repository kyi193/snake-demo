import _ from 'lodash'
import './style.css';

import SnakeGame from './snake/SnakeGame'
const game = new SnakeGame
game.updateGameBoard()

var table = document.createElement('table');
var tableBody = document.createElement('tbody');

function displayBoard() {
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

displayBoard()
