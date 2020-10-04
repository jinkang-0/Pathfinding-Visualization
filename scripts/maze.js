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
    let count = 0;
    for (let neighbor of current.neighbors) {
      if (evaluated.includes(neighbor) || neighbor === endNode) {
        count++;
      }
    }

    // if there is one visited neighbor, make this a passage
    if (count <= 1) {
      removeFromArray(obstacles, current);

      // add neighboring walls to evaluate
      for (let neighbor of current.neighbors) {
        if (!(neighbor === startNode || neighbor === endNode)) {
          toEvaluate.push(neighbor);
        }
      }
    }

    // mark as visited
    removeFromArray(toEvaluate, current);
    evaluated.push(current);

  } else {
    // if no more cells to evaluate, return
    evaluated = [];
    toEvaluate = [];

    // pause loop
    mazeMaking = false;
    mediaToggle(true);
    return;
  }

}