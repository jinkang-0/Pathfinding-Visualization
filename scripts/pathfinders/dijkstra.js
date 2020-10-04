function dijkstra_setup() {

  // setup distance score for all nodes
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j].f = Infinity;
    }
  }

  // setup start node to evaluate that first
  startNode.f = 0;
  toEvaluate.push(startNode);

}

function dijkstra() {

  if (toEvaluate.length > 0) {

    // find available node with shortest distance
    let index = 0;
    for (let i = 0; i < toEvaluate.length; i++) {
      if (toEvaluate[i].f < toEvaluate[index].f) {
        index = i;
      }
    }

    // identify node to evaluate
    var current = toEvaluate[index];

    // remove this node from evaluation list
    removeFromArray(toEvaluate, current);
    evaluated.push(current);

    // find more paths
    for (let neighbor of current.neighbors) {

      // find cost
      let cost;
      if (diagonal) {
        cost = euclideanDistance(current, startNode) + euclideanDistance(current, neighbor);
      } else {
        cost = manhattanDistance(current, startNode) + manhattanDistance(current, neighbor);
      }

      // if cost is better, record it
      if (cost < neighbor.f) {
        neighbor.f = cost;
        if (neighbor.previous == null) neighbor.previous = current;

        // if not evaluated already, add to be evaluated
        if (!evaluated.includes(neighbor)) {
          toEvaluate.push(neighbor);
        }
      }

    }

    // if the node is the end node, we're done
    if (current === endNode) {
      setTimeout(() => {
        current.tracePath();
      }, 1);
      
      paused = true;
      return;
    }

  } else {
    // if all nodes available are evaluated and have not reached desired location,
    // return failure and pause
    paused = true;
    return;
  }

}