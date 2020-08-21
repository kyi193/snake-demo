import _ from 'lodash'
import './style.css';

import SnakeGame from './snake/SnakeGame'
const game = new SnakeGame(50, 50)
game.updateGameBoard()

const TIME_INTERVAL = 50
const DEBUG_MODE = false
const TOP_WALL = 'top-wall'
const BOTTOM_WALL = 'bottom-wall'
const LEFT_WALL = 'left-wall'
const RIGHT_WALL = 'right-wall'
const WALLS = [TOP_WALL, BOTTOM_WALL, LEFT_WALL, RIGHT_WALL]

document.onkeydown = checkKey;

let lastHeading = 'up'
function checkKey(e) {
  e = e || window.event;

  if (e.keyCode == '38') {
    lastHeading = 'up'
  } else if (e.keyCode == '40') {
    lastHeading = 'down'
  } else if (e.keyCode == '37') {
    lastHeading = 'left'
  } else if (e.keyCode == '39') {
    lastHeading = 'right'
  } else if (e.keyCode == '87') {
    lastHeading = 'up'
  } else if (e.keyCode == '68') {
    lastHeading = 'right'
  } else if (e.keyCode == '83') {
    lastHeading = 'down'
  } else if (e.keyCode == '65') {
    lastHeading = 'left'
  }
}

const displayScoreBoard = () => {
  var scoreBoard = document.createElement('div')
  scoreBoard.classList.add("scoreboard")
  var scoreH1 = document.createElement('h1')
  scoreH1.innerHTML = 'Score: '
  scoreBoard.appendChild(scoreH1)
  var scoreP = document.createElement('p')
  scoreP.innerText = "0"
  scoreBoard.appendChild(scoreP)
  document.body.appendChild(scoreBoard);
}

const displayController = () => {
  window.onload = () => {
    document.getElementById("up").addEventListener('click', () => {
      lastHeading = 'up'
    })
    document.getElementById("down").addEventListener('click', () => {
      lastHeading = 'down'
    })
    document.getElementById("left").addEventListener('click', () => {
      lastHeading = 'left'
    })
    document.getElementById("right").addEventListener('click', () => {
      lastHeading = 'right'
    })
  }
}

function displayBoard() {
  var table = document.createElement('table');
  var tableBody = document.createElement('tbody');
  let columnIndex = 0
  const maxRows = game.gameBoard.getRows()
  const maxColumns = game.gameBoard.getColumns()

  displayScoreBoard()

  const boardClassNameMap = {
    'O': 'empty',
    'X': 'body',
    'H': 'head',
    'T': 'tail',
    'P': 'pellet'
  }

  game.gameBoard.getBoard().forEach(function (rowData, rowIndex) {
    var row = document.createElement('tr');

    rowData.forEach(function (cellData, columnIndex) {
      var cell = document.createElement('td');
      cell.className = boardClassNameMap[cellData]
      cell.className += determineCellBorderClassName(rowIndex, columnIndex, maxRows, maxColumns)
      row.appendChild(cell);
    });
    tableBody.appendChild(row);
  });
  table.appendChild(tableBody);
  document.querySelector('.game').appendChild(table)
  displayController();
}

const determineCellBorderClassName = (rowIndex, columnIndex, maxRows, maxColumns) => {
  let className = ''
  if (rowIndex === 0) {
    className += ` ${TOP_WALL}`
  }
  if (rowIndex === maxRows - 1) {
    className += ` ${BOTTOM_WALL}`
  }
  if (columnIndex === 0) {
    className += ` ${LEFT_WALL}`
  }
  if (columnIndex === maxColumns - 1) {
    className += ` ${RIGHT_WALL}`
  }
  return className
}

const updateScoreboard = (newScore) => {
  document.querySelector(".scoreboard p").innerText = `${newScore}`
}

const extractWallClassName = (snakeDomClassEl) => {
  const snakeClassList = [...snakeDomClassEl]
  let filteredSnakeClassList = snakeClassList.filter((wall) => WALLS.includes(wall))
  return filteredSnakeClassList.join(' ')
}

const addSnakeClassNames = (snakeTD, snakeBodyClassName) => {
  const wallClassName = extractWallClassName(snakeTD.classList)
  snakeTD.classList = snakeBodyClassName + ' ' + wallClassName
}

const updateBoard = (oldSnakeTail, newSnakeHead, oldSnakeHead, newSnakeTail, heading) => {
  try {
    game.pellets.forEach(pellet => {
      let coord = pellet.split(',')
      let row = parseInt(coord[0])
      let column = parseInt(coord[1])
      let pelletTD = document.querySelector(`tr:nth-of-type(${row + 1}) td:nth-of-type(${column + 1})`)
      pelletTD.classList.add("pellet")
    })

    let newSnakeHeadTD = document.querySelector(`tr:nth-of-type(${newSnakeHead[0] + 1}) td:nth-of-type(${newSnakeHead[1] + 1})`)
    addSnakeClassNames(newSnakeHeadTD, 'head')
    newSnakeHeadTD.classList.add(heading)
    let oldSnakeHeadTD = document.querySelector(`tr:nth-of-type(${oldSnakeHead[0] + 1}) td:nth-of-type(${oldSnakeHead[1] + 1})`)
    addSnakeClassNames(oldSnakeHeadTD, 'body')
    let newSnakeTailTD = document.querySelector(`tr:nth-of-type(${newSnakeTail[0] + 1}) td:nth-of-type(${newSnakeTail[1] + 1})`)
    addSnakeClassNames(newSnakeTailTD, 'tail')
    let oldSnakeTailTD = document.querySelector(`tr:nth-of-type(${oldSnakeTail[0] + 1}) td:nth-of-type(${oldSnakeTail[1] + 1})`)
    addSnakeClassNames(oldSnakeTailTD, 'empty')
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
        alert(`GAME OVER! Your score is: ${game.getScore()}`)
        location.reload()
      }
      last = now;
      gameOver = game.tick(lastHeading)
      const [newSnakeHead, oldSnakeTail, oldSnakeHead, newSnakeTail] = game.getSnakeDisplayUpdatePositions()
      updateBoard(oldSnakeTail, newSnakeHead, oldSnakeHead, newSnakeTail, game.snake.getHeading())
      updateScoreboard(game.getScore())
    }
    requestAnimationFrame(render);
  }

  render()
}
