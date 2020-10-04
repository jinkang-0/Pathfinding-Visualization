// canvas tools
function dot(x, y, r) {
  c.beginPath();
  c.arc(x, y, r, 0, 360);
  c.closePath();
  c.fill();
}

function line(x1, y1, x2, y2) {
  c.beginPath();
  c.moveTo(x1, y1);
  c.lineTo(x2, y2);
  c.closePath();
  c.stroke();
}

// general stuff
function removeFromArray(arr, elem) {
  for (let i = arr.length-1; i >= 0; i--) {
    if (arr[i] === elem) {
      arr.splice(i, 1);
    }
  }
}

function manhattanDistance(from, to) {
  let xDiff = Math.abs( from.col - to.col );
  let yDiff = Math.abs( from.row - to.row );
  return xDiff + yDiff;
}

function euclideanDistance(from, to) {
  return Math.sqrt( Math.pow(from.col - to.col, 2) + Math.pow(from.row - to.row, 2) );
}

// DOM elements
function createIcon(icon, col, row) {

  // create element
  let elem = document.createElement('i');

  // set class
  elem.classList.add('fas');
  elem.classList.add(`fa-${icon}`);
  elem.classList.add('nodeIcons');

  // set position
  let x = col * scale;
  let y = row * scale;

  elem.style.top = `${y+scale/8}px`;
  elem.style.left = `${x+scale/8}px`;

  // set size
  elem.style.fontSize = `${scale-10}px`;

  document.body.appendChild(elem);

}

function updateIcons() {

  // delete pre-existing node icons
  let icons = document.getElementsByClassName('nodeIcons');

  for (let i = icons.length-1; i >= 0; i--) {
    icons[i].remove();
  }

  // add icon for special nodes
  createIcon('circle', startNode.col, startNode.row);
  createIcon('flag', endNode.col, endNode.row);

  // add obstacle icons
  for (let i = 0; i < obstacles.length; i++) {
    createIcon('square', obstacles[i].col, obstacles[i].row);
  }

  // reset canvas squares
  c.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j].drawBlank();
    }
  }

  // pause
  mediaToggle(true);

}