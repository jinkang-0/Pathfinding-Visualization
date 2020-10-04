// global variables
var paused = true;
var algorithm = "dfs";
var nodePlacer = 'none';
var placing = false;
var diagonal = true;
var mazeMaking = false;

//
// DOM event handlers
//

// sidebar collapse or expand
function colOrExp() {

  document.querySelector('.sidebar').classList.toggle('expanded');
  document.getElementById('sidebar-icon').classList.toggle('spin');
  
  // remove all selected node items
  nodePlacer = 'none';
  let nodeItems = document.getElementsByClassName('node-item');
  for (let i = 0; i < nodeItems.length; i++) {
    nodeItems[i].classList.remove('selected');
  }

}

addEventListener('mousedown', (event) => {
  // do nothing if mouse is on sidebar
  if (document.querySelector('.sidebar').classList.contains('expanded') && event.clientX > innerWidth - 300) return;

  // do nothing if maze is generating
  if (mazeMaking) return;

  // check which node mouse is hovering
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      if ( grid[i][j].locatedAt(event.clientX, event.clientY) ) {
        grid[i][j].clickAction();
        return;
      }
    }
  }

})

addEventListener('mousemove', (event) => {
  // do nothing if mouse is on sidebar
  if (document.querySelector('.sidebar').classList.contains('expanded') && event.clientX > innerWidth - 300) return;

  // do nothing if maze is generating
  if (mazeMaking) return;

  // check all nodes if mouse is on top
  if (event.buttons == 1) {
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        if ( grid[i][j].locatedAt(event.clientX, event.clientY) ) {
          grid[i][j].moveObject();
          return;
        }
      }
    }
  }

});

function nodeSelect(id, toggle) {

  var item = document.getElementById(id);
  var nodeItems = document.getElementsByClassName('node-item');

  // if the item is already selected
  if (item.classList.contains('selected') && toggle == null) {
    item.classList.remove('selected');
    nodePlacer = 'none';
    return;
  }

  // else, remove all other selected and add selected class
  for (let i = 0; i < nodeItems.length; i++) {
    nodeItems[i].classList.remove('selected');
  }

  item.classList.add('selected');
  nodePlacer = id;
}

function algoSelect(id) {

  paused = true;

  var algoOptions = document.getElementsByClassName('algoItem');

  // remove all selected algorithm items
  for (let i = 0; i < algoOptions.length; i++) {
    algoOptions[i].classList.remove('selected');
  }

  // add selected tag to target elem
  document.getElementById(id).classList.add('selected');

  // set this algorithm as current algorithm
  algorithm = id;

}

function startPathfinding() {

  // do not run if maze is generating
  if (mazeMaking) return;
  if (algorithm == 'bfs' || algorithm == 'dfs') {
    diagonalChange(false);
  }

  // prep empty lists
  toEvaluate = [];
  evaluated = [];
  path = [];

  // add new neighboring nodes
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j].previous = null;
      grid[i][j].neighbors = [];
      grid[i][j].addNeighbors();
    }
  }

  // remove obstacle icons
  var nodeItems = document.getElementsByClassName('nodeIcons');
  for (let i = nodeItems.length - 1; i >= 0; i--) {
    if (nodeItems[i].classList.contains('fa-square')) nodeItems[i].remove();
  }

  // setup algorithms
  switch (algorithm) {
    case "dfs":
      dfs_setup();
      break;
    case "bfs":
      bfs_setup();
      break;
    case "dijkstra":
      dijkstra_setup();
      break;
    case "aStar":
      aStar_setup();
      break;
  }

  mediaToggle(false);
  draw();

}

function generateMaze() {

  diagonalChange(false);

  // prep empty lists
  toEvaluate = [];
  evaluated = [];
  obstacles = [];
  path = [];

  // add new neighboring nodes
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j].previous = null;
      grid[i][j].neighbors = [];
      grid[i][j].addNeighbors();
    }
  }

  // remove obstacle icons
  var nodeItems = document.getElementsByClassName('nodeIcons');
  for (let i = nodeItems.length - 1; i >= 0; i--) {
    if (nodeItems[i].classList.contains('fa-square')) nodeItems[i].remove();
  }

  // setup for maze generator
  maze_setup();

  // set outside variables
  mediaToggle(false);
  mazeMaking = true;

  // start generating
  draw();

}

function mediaToggle(pausing) {

  var mediaButton = document.getElementById('media');

  // changes button
  if (pausing == false) {
    mediaButton.classList.replace('fa-play', 'fa-undo');
  } else {
    mediaButton.classList.replace('fa-undo', 'fa-play');
  }

  // switches boolean "paused"
  paused = pausing;

}

function mediaAction() {

  var mediaButton = document.getElementById('media');

  if (mediaButton.classList.contains('fa-play')) {
    startPathfinding();
  } else if (mediaButton.classList.contains('fa-undo')) {
    setup();
  }

}

function diagonalCheck(change) {
  diagonal = change;
}

function diagonalChange(change) {
  var checkbox = document.getElementById('diagonals');
  
  diagonal = change;
  checkbox.checked = change;
}