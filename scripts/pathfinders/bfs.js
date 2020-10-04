function bfs_setup() {
  toEvaluate.push(startNode);
}

function bfs() {

  if (toEvaluate.length > 0) {

    var current = toEvaluate[0];

    removeFromArray(toEvaluate, current);
    evaluated.push(current);

    for (let neighbor of current.neighbors) {
      if (!evaluated.includes(neighbor)) {
        neighbor.previous = current;
        toEvaluate.push(neighbor);
      }
    }

    if (current === endNode) {

      setTimeout(() => {
        current.tracePath();
      }, 1);

      paused = true;
      return;
    }

  } else {
    // if no more nodes to examine and goal is not reached,
    // return failure and pause
    paused = true;
    return;
  }

}