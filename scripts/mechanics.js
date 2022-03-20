export {Hero}; //Classes
export {handleDrawingObjects, detectCollisions}; //Functions

class AllObjects {
  constructor(x1, y1, width) {
    this.x1 = x1;
    this.y1 = y1;
    this.width = width;
  }
  get x2() {
    return Math.round(this.x1 + this.width);
  }
  get height() {
    return Math.round(this.width * this.sh/this.sw);
  }
  get y2() {
    return Math.round(this.y1 + this.height);
  }

  draw() {
    let s = scaleFactor;
    ctx.drawImage(this.img, this.sx, this.sy, this.sw, this.sh, this.x1 * s, this.y1 * s, this.width * s, this.height * s);
  }
}

class Hero extends AllObjects {
  constructor(x1, y1, width) {
    super(x1, y1, width);
    this.img = ImageObject('kw-hero.png');
    this.sx = 0;
    this.sy = 0;
    this.bMoveLeft = false; //b for boolean
    this.bMoveRight = false;
    this.bMoveUp = false;
    this.bMoveDown = false;
    this.aMoveDiagonally = [0,0]; //a for array; 1st value is for xDir, and 2nd for yDir
    
  }
  get sw() {
    return 64 * imageScalar;
  }
  get sh() {
    return 64 * imageScalar;
  }
  moveLeft() {
    this.x1 -= 1;
  }
  moveRight() {
    this.x1 += 1;
  }
  moveUp() {
    this.y1 -= 1;
  }
  moveDown() {
    this.y1 += 1;
  }
  moveDiagonally(xDir,yDir) {
    this.x1 += xDir * 0.70710678; // cos(π/4) = sin(π/4) = 0.70710678
    this.y1 += yDir * 0.70710678;
  }
}

function handleDrawingObjects() {
  if (window.hero.bMoveLeft) {
    window.hero.moveLeft();
  } else if (window.hero.bMoveRight) {
    window.hero.moveRight();
  } else if (window.hero.bMoveUp) {
    window.hero.moveUp();
  } else if (window.hero.bMoveDown) {
    window.hero.moveDown();
  } else if (window.hero.aMoveDiagonally[0] || window.hero.aMoveDiagonally[1]) {
    window.hero.moveDiagonally(window.hero.aMoveDiagonally[0], window.hero.aMoveDiagonally[1]);
  }
}
function detectCollisions() {
  
}

// Utility Functions for only this module

function ImageObject(source) {
  let tempImage = new Image();
  tempImage.src = imageFolder + source;
  return tempImage;
}
