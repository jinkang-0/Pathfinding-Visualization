function dfs_setup() {
  toEvaluate.push(startNode);
}

function dfs() {

  if (toEvaluate.length > 0) {

    var current = toEvaluate[ toEvaluate.length - 1 ];

    removeFromArray(toEvaluate, current);
    evaluated.push(current);

    // search from the end of the stack
    for (let i = current.neighbors.length-1; i >= 0; i--) {
      let neighbor = current.neighbors[i];

      if (!evaluated.includes(neighbor)) {
        neighbor.previous = current;
        toEvaluate.push(neighbor);
      }
    }

    // if this is the desired goal, return path
    if (current === endNode) {

      setTimeout(() => {
        current.tracePath();
      }, 1);

      paused = true;
      return;
    }

  } else {
    // if we have not reached our goal and there are no more nodes to evaluate,
    // return failure and pause
    paused = true;
    return;
  }

}