// setup canvas
var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');

canvas.width = window.innerWidth - 50;
canvas.height = window.innerHeight;
let scale = canvas.height / 20;

addEventListener('resize', () => {
  canvas.width = window.innerWidth - 50;
  canvas.height = window.innerHeight;
  scale = canvas.height / 20;
  setup();
});

// declare variables
let cols;
let rows;
let grid;

var toEvaluate;
var evaluated;
var path;

var startNode;
var endNode;
var obstacles;

// setup scene
function setup() {

  c.clearRect(0, 0, canvas.width, canvas.height);

  grid = [];
  obstacles = [];

  toEvaluate = [];
  evaluated = [];
  path = [];

  cols = Math.floor(canvas.width / scale);
  rows = Math.floor(canvas.height / scale);

  for (let i = 0; i < cols; i++) {
    grid.push( new Array );
    for (let j = 0; j < rows; j++) {
      grid[i].push( new Array );
      grid[i][j] = new Node(i, j);
      grid[i][j].show();
    }
  }

  startNode = grid[Math.floor(cols / 4)][Math.floor(rows/2)];
  endNode = grid[Math.floor(cols / 1.4)][Math.floor(rows/2)];

  updateIcons();
  mazeMaking = false;

}

setup();

// draw loop
function draw() {

  c.clearRect(0, 0, canvas.width, canvas.height);

  if (mazeMaking) {

    maze_generate();

  } else {

    switch (algorithm) {
      case "dfs":
        dfs();
        break;
      case "bfs":
        bfs();
        break;
      case "dijkstra":
        dijkstra();
        break;
      case "aStar":
        aStar();
        break;
    }

  }
  
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j].show();
    }
  }

  if (paused == false) requestAnimationFrame(draw);
}

// draw();
for (let i = 0; i < cols; i++) {
  for (let j = 0; j < rows; j++) {
    grid[i][j].show();
  }
}

// run on load
diagonalChange(true);