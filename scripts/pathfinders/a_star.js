function aStar_setup() {
  
  // setup node f score and g score
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j].gScore = Infinity;
      grid[i][j].fScore = Infinity;
    }
  }

  // setup start node f score and g score
  startNode.gScore = 0;

  if (diagonal == false) {
    startNode.fScore = manhattanDistance(startNode, endNode);
  } else {
    startNode.fScore = euclideanDistance(startNode, endNode);
  }

  // add start node to evaluating list
  toEvaluate.push( startNode );

}

function aStar() {

  if (toEvaluate.length > 0) {

    // find node with lowest f score to be current node
    let index = 0;
    for (let i = 0; i < toEvaluate.length; i++) {
      if (toEvaluate[i].fScore < toEvaluate[index].fScore) {
        index = i;
      }
    }

    var current = toEvaluate[index]; 

    // remove current from toEvaluate list
    removeFromArray(toEvaluate, current);
    evaluated.push(current);

    // find more possible paths
    for (let neighbor of current.neighbors) {

      // find cost of current node to neighbor node
      let cost;
      if (diagonal == false) {
        cost = current.gScore + manhattanDistance(current, neighbor);
      } else {
        cost = current.gScore + euclideanDistance(current, neighbor);
      }

      // if cost is better, record neighbor node
      if (cost < neighbor.gScore) {
        neighbor.previous = current;
        neighbor.gScore = cost;

        if (diagonal == false) {
          neighbor.fScore = neighbor.gScore + manhattanDistance(neighbor, endNode);
        } else {
          neighbor.fScore = neighbor.gScore + euclideanDistance(neighbor, endNode);
        }

        // if not on evaluating list, add it to the list
        if (!toEvaluate.includes(neighbor)) {
          toEvaluate.push(neighbor);
        }
      }

    }

    // if we reached the goal, return
    if (current === endNode) {
  
      // trace back and find path
      setTimeout( () => {
        current.tracePath();
      }, 1);

      paused = true;
      return;
    }

  } else {
    // if there are no more nodes left and have not reached desired node,
    // return failure and pause
    paused = true;
    return;
  }

}