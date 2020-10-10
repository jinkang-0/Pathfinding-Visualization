class Node {

  constructor(col, row) {
    this.col = col;
    this.row = row;
    this.neighbors = [];
    this.previous;
  }

  // adds all the neighbors of this node
  addNeighbors() {

    function notObstacle(node) {
      return !obstacles.includes(node);
    }

    // neighbors in cardinal directions
    if (this.col > 0) {
      let n = grid[this.col-1][this.row];
      if (notObstacle(n)) this.neighbors.push(n);
    }

    if (this.row < rows - 1) {
      let n = grid[this.col][this.row + 1];
      if (notObstacle(n)) this.neighbors.push(n);
    }

    if (this.col < cols - 1) {
      let n = grid[this.col + 1][this.row];
      if (notObstacle(n)) this.neighbors.push(n);
    }

    if (this.row > 0) {
      let n = grid[this.col][this.row - 1];
      if (notObstacle(n)) this.neighbors.push(n);
    }

    // diagonals
    if (diagonal == true) {

      if (this.col > 0 && this.row > 0) {
        let n = grid[this.col - 1][this.row - 1];
        if (notObstacle(n)) this.neighbors.push(n);
      }
  
      if (this.col > 0 && this.row < rows - 1) {
        let n = grid[this.col - 1][this.row + 1];
        if (notObstacle(n)) this.neighbors.push(n);
      }
  
      if (this.col < cols - 1 && this.row > 0) {
        let n = grid[this.col + 1][this.row - 1];
        if (notObstacle(n)) this.neighbors.push(n);
      }
  
      if (this.col < cols - 1 && this.row < rows - 1) {
        let n = grid[this.col + 1][this.row + 1];
        if (notObstacle(n)) this.neighbors.push(n);
      }

    }
    
  }

  // runs when left click is held and mouse is moving
  moveObject() {

    switch (nodePlacer) {
      case 'circle':

        // places the start node at this node
        if (this != startNode && this != endNode && !obstacles.includes(this)) {
          startNode = this;
        }

        break;
      case 'flag':

        // places the end node at this node
        if (this != startNode && this != endNode && !obstacles.includes(this)) {
          endNode = this;
        }

        break;
      case 'square':
        
        // place or destroy an obstacle
        if (placing == true && !obstacles.includes(this)) {
          obstacles.push(this);
        } else if (placing == false) {
          removeFromArray(obstacles, this);
        }
        
        break;
    }

    updateIcons();

  }

  // runs when lmb is down
  clickAction() {

    placing = true;

    // determines to place or destroy obstacle, and copy clicked node type
    if (obstacles.includes(this)) {
      nodeSelect('square', placing);
      placing = false;
    } else if (startNode === this) {
      nodeSelect('circle', placing);
    } else if (endNode === this) {
      nodeSelect('flag', placing);
    } else if (nodePlacer == 'square') {
      nodeSelect('square', placing);
    }

    // place nodes or place/destroy obstacles
    this.moveObject();

  }

  // checks if mouse is on top of this node
  locatedAt(mouseX, mouseY) {
    if ( mouseX > this.col * scale + 1 && mouseX < this.col * scale + scale - 1
      && mouseY > this.row * scale + 1 && mouseY < this.row * scale + scale - 1) {
      return true;
    }
  }

  // draws the node background
  show() {

    c.fillStyle = "darkgray";
    
    if (evaluated.includes(this)) {
      c.fillStyle = "limegreen";
    } else if (toEvaluate.includes(this)) {
      c.fillStyle = "red";
    } else if (obstacles.includes(this)) {
      c.fillStyle = "gray";
    }
    
    c.fillRect(this.col * scale + 1, this.row * scale + 1, scale - 1, scale - 1);

    if (obstacles.includes(this)) {
      c.fillStyle = "black";
      // c.fillRect(this.col * scale + 10, this.row * scale + 10, scale - 20, scale - 20);
      // c.fillRect(this.col * scale + 1, this.row * scale + 1, scale - 1, scale - 1);
      if (mazeMaking) {
        c.fillRect(this.col * scale + 1, this.row * scale + 1, scale - 1, scale - 1);
      } else {
        c.fillRect(this.col * scale + 10, this.row * scale + 10, scale - 20, scale - 20);
      }
    }

  }

  tracePath() {
    
    if (this.previous != null) {
      this.traceBack();
      path.push(this.previous);
      this.previous.tracePath();
    } else {
      return;
    }

  }

  traceBack() {
    c.strokeStyle = "royalblue";
    c.fillStyle = "royalblue";
    c.lineWidth = scale / 2;

    line(this.col * scale + scale/2, this.row * scale + scale/2, 
      this.previous.col * scale + scale/2, this.previous.row * scale + scale/2);
    dot(this.col * scale + scale/2, this.row * scale + scale/2, scale / 4);
    dot(this.previous.col * scale + scale/2, this.previous.row * scale + scale/2, scale/4);
  }

  drawBlank() {
    c.fillStyle = "darkgray";
    c.fillRect(this.col * scale + 1, this.row * scale + 1, scale - 1, scale - 1);
  }

}