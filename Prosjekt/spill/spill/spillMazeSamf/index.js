
// Definerer variabler
let ctx;
let canvas;
let maze;
let mazeHeight;
let mazeWidth;
let player;

var run = 0;

const player_up = new Image();
player_up.src = '../../karakterbilder/stopMotion-upStand.png';
const player_upRun = new Image();
player_upRun.src = '../../karakterbilder/stopMotion-upRun.png';
const player_left = new Image();
player_left.src = '../../karakterbilder/stopMotion-leftStand.png'
const player_leftRun = new Image();
player_leftRun.src = '../../karakterbilder/stopMotion-leftRun.png';
const player_right = new Image();
player_right.src = '../../karakterbilder/stopMotion-rightStand.png'
const player_rightRun = new Image();
player_rightRun.src = '../../karakterbilder/stopMotion-rightRun.png';
const player_down = new Image();
player_down.src = '../../karakterbilder/stopMotion-downStand.png'
const player_downRun = new Image();
player_downRun.src = '../../karakterbilder/stopMotion-downRun.png';
let player_img = player_down;


class Player {

//Bestemmer hvor spilleren skal starte
  constructor() {
    this.col = 0;
    this.row = 0;
  }
}

class MazeCell {

  constructor(col, row) {
    this.col = col;
    this.row = row;

    this.eastWall = true;
    this.northWall = true;
    this.southWall = true;
    this.westWall = true;

    this.visited = false;
  }

}

class Maze {

  constructor(cols, rows, cellSize) {

    // Definerer labyrinten
    this.backgroundColor = "#ffffff";
    this.cols = cols;
    this.endColor = "#88FF88";
    this.mazeColor = "#000000";
    this.playerColor = "#880088";
    this.rows = rows;
    this.cellSize = cellSize;

    this.cells = [];

    this.generate()

  }

  generate() {

    mazeHeight = this.rows * this.cellSize;
    mazeWidth = this.cols * this.cellSize;

    canvas.height = mazeHeight;
    canvas.width = mazeWidth;


    for (let col = 0; col < this.cols; col++) {
      this.cells[col] = [];
      for (let row = 0; row < this.rows; row++) {
        this.cells[col][row] = new MazeCell(col, row);
      }
    }

    let rndCol = Math.floor(Math.random() * this.cols);
    let rndRow = Math.floor(Math.random() * this.rows);

    let stack = [];
    stack.push(this.cells[rndCol][rndRow]);

    let currCell;
    let dir;
    let foundNeighbor;
    let nextCell;

    while (this.hasUnvisited(this.cells)) {
      currCell = stack[stack.length - 1];
      currCell.visited = true;
      if (this.hasUnvisitedNeighbor(currCell)) {
        nextCell = null;
        foundNeighbor = false;
        do {
          dir = Math.floor(Math.random() * 4);
          switch (dir) {
            case 0:
              if (currCell.col !== (this.cols - 1) && !this.cells[currCell.col + 1][currCell.row].visited) {
                currCell.eastWall = false;
                nextCell = this.cells[currCell.col + 1][currCell.row];
                nextCell.westWall = false;
                foundNeighbor = true;
              }
              break;
            case 1:
              if (currCell.row !== 0 && !this.cells[currCell.col][currCell.row - 1].visited) {
                currCell.northWall = false;
                nextCell = this.cells[currCell.col][currCell.row - 1];
                nextCell.southWall = false;
                foundNeighbor = true;
              }
              break;
            case 2:
              if (currCell.row !== (this.rows - 1) && !this.cells[currCell.col][currCell.row + 1].visited) {
                currCell.southWall = false;
                nextCell = this.cells[currCell.col][currCell.row + 1];
                nextCell.northWall = false;
                foundNeighbor = true;
              }
              break;
            case 3:
              if (currCell.col !== 0 && !this.cells[currCell.col - 1][currCell.row].visited) {
                currCell.westWall = false;
                nextCell = this.cells[currCell.col - 1][currCell.row];
                nextCell.eastWall = false;
                foundNeighbor = true;
              }
              break;
          }
          if (foundNeighbor) {
            stack.push(nextCell);
          }
        } while (!foundNeighbor)
      } else {
        currCell = stack.pop();
      }
    }

    this.redraw();

  }

  hasUnvisited() {
    for (let col = 0; col < this.cols; col++) {
      for (let row = 0; row < this.rows; row++) {
        if (!this.cells[col][row].visited) {
          return true;
        }
      }
    }
    return false;
  }

  hasUnvisitedNeighbor(mazeCell) {
    return ((mazeCell.col !== 0               && !this.cells[mazeCell.col - 1][mazeCell.row].visited) ||
            (mazeCell.col !== (this.cols - 1) && !this.cells[mazeCell.col + 1][mazeCell.row].visited) ||
            (mazeCell.row !== 0               && !this.cells[mazeCell.col][mazeCell.row - 1].visited) ||
            (mazeCell.row !== (this.rows - 1) && !this.cells[mazeCell.col][mazeCell.row + 1].visited));
  }

  redraw() {

    ctx.fillStyle = this.backgroundColor;
    ctx.fillRect(0, 0, mazeHeight, mazeWidth);

    // Bestemmer at målet er nede i hjørnet
    ctx.fillStyle = this.endColor;
    ctx.fillRect((this.cols - 1) * this.cellSize, (this.rows - 1) * this.cellSize, this.cellSize, this.cellSize);

    ctx.strokeStyle = this.mazeColor;
    ctx.strokeRect(0, 0, mazeHeight, mazeWidth);

    for (let col = 0; col < this.cols; col++) {
      for (let row = 0; row < this.rows; row++) {
        if (this.cells[col][row].eastWall) {
          ctx.beginPath();
          ctx.moveTo((col + 1) * this.cellSize, row * this.cellSize);
          ctx.lineTo((col + 1) * this.cellSize, (row + 1) * this.cellSize);
          ctx.stroke();
        }
        if (this.cells[col][row].northWall) {
          ctx.beginPath();
          ctx.moveTo(col * this.cellSize, row * this.cellSize);
          ctx.lineTo((col + 1) * this.cellSize, row * this.cellSize);
          ctx.stroke();
        }
        if (this.cells[col][row].southWall) {
          ctx.beginPath();
          ctx.moveTo(col * this.cellSize, (row + 1) * this.cellSize);
          ctx.lineTo((col + 1) * this.cellSize, (row + 1) * this.cellSize);
          ctx.stroke();
        }
        if (this.cells[col][row].westWall) {
          ctx.beginPath();
          ctx.moveTo(col * this.cellSize, row * this.cellSize);
          ctx.lineTo(col * this.cellSize, (row + 1) * this.cellSize);
          ctx.stroke();
        }
      }
    }


    ctx.drawImage(player_img, (player.col * this.cellSize) + 2, (player.row * this.cellSize) + 2, this.cellSize - 4, this.cellSize - 4);
  }
}

function onKeyDown(event) {
  if (player.row == 14 && player.col == 14) {
      // Send spilleren videre etter å ha vunnet her
    setTimeout(function(){ window.open("../spillMazeSamf/index.html", "_self"); }, 2500);
  } else {
  switch (event.keyCode) {
    case 37:
    case 65:
      if (!maze.cells[player.col][player.row].westWall) {
        player.col -= 1;

        if (run == 0) {
          player_img = player_left;
          run=1;
        }else {
          player_img = player_leftRun;
          run=0;
        }

      }
      break;
    case 39:
    case 68:
      if (!maze.cells[player.col][player.row].eastWall) {
        player.col += 1;

        if (run == 0) {
                  player_img = player_right;
          run=1;
        }else {
                  player_img = player_rightRun;
          run=0;
        }

      }
      break;
    case 40:
    case 83:
      if (!maze.cells[player.col][player.row].southWall) {
        player.row += 1;

        if (run == 0) {
                  player_img = player_down;
          run=1;
        }else {
                  player_img = player_downRun;
          run=0;
        }

      }
      break;
    case 38:
    case 87:
      if (!maze.cells[player.col][player.row].northWall) {
        player.row -= 1;

        if (run == 0) {
                  player_img = player_up;
          run=1;
        }else {
                  player_img = player_upRun;
          run=0;
        }

      }
      break;
    default:
      break;
  }
}
  maze.redraw();
}

function onLoad() {

  canvas = document.getElementById("mainForm");
  ctx = canvas.getContext("2d");

  player = new Player();
  maze = new Maze(15, 15, 36);

  document.addEventListener("keydown", onKeyDown);

}

// CountDown

// Set the date we're counting down to
var countDownDate = new Date().getTime() + 62000;

// Update the count down every 1 second setTimeout(function(){ alert("Hello"); }, 3000);
var x = setTimeout(function() { setInterval(function() {

  // Get today's date and time
  var now = new Date().getTime();

  // Find the distance between now and the count down date
  var distance = countDownDate - now;

  // Time calculations for seconds.
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);


    if (player.row == 14 && player.col == 14 && seconds > 0) {
    document.getElementById("counter").innerHTML = "Heia deg! Du rakk det innen 60 sekunder!";
    setTimeout(function(){document.getElementById("snakkeBoble").innerHTML = "Eyyy vennene mine! Ntz Ntz!";}, 100);
    document.getElementById("karakter").src = "../../karakterbilder/glad.png";
        setTimeout(function(){ window.open("../../story/story6/index.html", "_self"); }, 2500);
  } else if (player.row != 15 && player.col != 15 && seconds > 0){
    document.getElementById("counter").innerHTML = "Du har " + seconds + " sekunder igjen";
  }

  // If the count down is over, write some text
  if (distance < 0 && player.row != 14 && player.col != 14) {
    clearInterval(x);
    document.getElementById("counter").innerHTML = "Du var for treig ...";
  }

  // Oppdaterer snakkeboblen og karakterbildet
  if (seconds < 0 && player.row != 14 && player.col != 14) {
    document.getElementById("snakkeBoble").innerHTML = "Ånei .. Fikk melding om at de har dratt hjem!";
    document.getElementById("karakter").src = "../../karakterbilder/kjip.png";
        setTimeout(function(){ window.open("../../story/storyTaper/index.html", "_self"); }, 2500);

  }else {
  if (seconds < 52 && seconds > 10 && player.row != 14 && player.col != 14) {
    document.getElementById("snakkeBoble").innerHTML = "Jeg er ganskeee full ..";
    document.getElementById("karakter").src = "../../karakterbilder/trøtt.png";
  } else {
  if (seconds < 10 && player.row != 14 && player.col != 14) {
    document.getElementById("snakkeBoble").innerHTML = "Nå begynner det å bli sent!";
    document.getElementById("karakter").src = "../../karakterbilder/overrasket.png";
  }}}
}, 1000);}, 1000);
