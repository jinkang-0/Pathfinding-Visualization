function maze_setup() {

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      if ( !(grid[i][j] === startNode || grid[i][j] === endNode) ) {
        obstacles.push(grid[i][j]);
      }
    }
  }

  for (let neighbor of startNode.neighbors) {
    if (!(neighbor === endNode)) {
      toEvaluate.push(neighbor);
    }
  }

  evaluated.push(startNode);

}

// using randomized Prim's algorithm
function maze_generate() {

  if (toEvaluate.length > 0) {

    var current = toEvaluate[ Math.floor( Math.random() * toEvaluate.length ) ];

    // find num of visited neighbors this obstacle has
    // also if neighbor is a wall, find amount of their neighbors that aren't walls
    let count = 0;
    let wallCount = 0;
    for (let neighbor of current.neighbors) {
      if (obstacles.includes(neighbor)) {
        for (let wallNeighbor of neighbor.neighbors) {
          if (!obstacles.includes(wallNeighbor)) {
            wallCount++;
          }
        }
      } else if (evaluated.includes(neighbor)) {
        count++;
      }
    }

    // mark self as visited
    removeFromArray(toEvaluate, current);
    evaluated.push(current);

    // if there is only one visited neighbor,
    // and there are less than 3 neighbors near neighboring walls,
    // make this a passage
    if (count == 1 && wallCount < 3) {
      removeFromArray(obstacles, current);

      // add neighboring walls to evaluate
      for (let neighbor of current.neighbors) {
        if (!toEvaluate.includes(neighbor) && !(neighbor === startNode || neighbor === endNode || evaluated.includes(neighbor))) {
          toEvaluate.push(neighbor);
        }
      }
    }

  } else {
    // if no more cells to evaluate, return
    evaluated = [];

    // pause loop
    mazeMaking = false;
    mediaToggle(true);
    return;
  }

}