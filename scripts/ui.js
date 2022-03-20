export {fitCanvasToScreen};

// pointerCoords contains the touch coordinates

var pointerCoords = {
  initial : {x: 0, y: 0},
  previous : {x: 0, y: 0},
  current: {x: 0, y: 0}
};

//For Touch Screens
window.gameArea.addEventListener('touchstart', handleTouchStart);
window.gameArea.addEventListener('touchmove', handleTouchMove);
window.gameArea.addEventListener('touchend', handleTouchEnd);
window.gameArea.addEventListener('touchcancel', handleTouchEnd);
window.gameArea.addEventListener('touchinterrupt', handleTouchEnd);

// For Desktops
window.addEventListener('keydown', handleKeyDown);
window.addEventListener('keyup', handleKeyUp);

function fitCanvasToScreen() {
  var sW = window.innerWidth;
  var sH = window.innerHeight;

  if (sW > sH) {
    cnvs.height = sH;
    cnvs.width = 3/2 * sH;
  } else {
    cnvs.width = sW;
    cnvs.height = 2/3 * sW;
  }
  scaleFactor = (cnvs.width/480).toFixed(4); // scaleFactor = cnvs.height/320; both have same value
  document.documentElement.style.fontSize = (20 * scaleFactor) + "px";

  if (scaleFactor < 2) {
    imageFolder = "assets/images/sd/";
    imageScalar = 1;
  } else {
    imageFolder = "assets/images/hd/";
    imageScalar = 2;
  }
}

function handleTouchStart(e) {
  e.preventDefault();
  switch (e.targetTouches.length) {
    case 1:
      handlePointerDown(e.targetTouches[0]);
      break;
  }
}
function handleTouchMove(e) {
  e.preventDefault();
  switch (e.targetTouches.length) {
    case 1:
      handlePointerMove(e.targetTouches[0]);
      break;
  }
}
function handleTouchEnd(e) {
  e.preventDefault();
  handlePointerUp();

  }


function handlePointerDown(e) {
  var bcr = e.target.getBoundingClientRect();
  var x = e.clientX - bcr.x;
  var y = e.clientY - bcr.y;
  pointerCoords.initial.x = x;
  pointerCoords.initial.y = y;
}
function handlePointerMove(e) {
  var bcr = e.target.getBoundingClientRect();
  var x = e.clientX - bcr.x;
  var y = e.clientY - bcr.y;
  swapPointerCoords(x,y);
  
  var x0 = pointerCoords.previous.x;
  var y0 = pointerCoords.previous.y;
  
  var leftSwipe, rightSwipe, upSwipe, downSwipe;
  
  if (x > x0) {
    //Right swipe
    rightSwipe = true;
    
  } else if (x < x0) {
    //Left swipe
    leftSwipe = true;
    
  }
  if (y < y0) {
    //Up swipe
    upSwipe = true;
    
  } else if (y > y0) {
    //Down swipe
    downSwipe = true;
  }
  
  if (leftSwipe && !(upSwipe || downSwipe)) {
    // only left swipe
    setDirVars(1,0,0,0,[0,0]);
       
  } else if (rightSwipe && !(upSwipe || downSwipe)) {
    // only right swipe
    setDirVars(0,1,0,0,[0,0]);
    
  } else if (upSwipe && !(leftSwipe || rightSwipe)) {
    // only up swipe
    setDirVars(0,0,1,0,[0,0]); 
    
  } else if (downSwipe && !(leftSwipe || rightSwipe)) {
    // only down swipe
    setDirVars(0,0,0,1,[0,0]); 
    
  } else if ( (leftSwipe || rightSwipe) && (upSwipe || downSwipe) ) {
    // diagonal swipe
    
    var aDiagonal = [
       Math.sign(x - pointerCoords.previous.x),
       Math.sign(y - pointerCoords.previous.y)
       ];
    setDirVars(0,0,0,0,aDiagonal); 
    
  } 
}
  
function handlePointerUp() {
  setDirVars(0,0,0,0,[0,0]); 
}

// Define functions for Desktops

function handleKeyDown(e) {
  if (e.repeat) {return};
  
  if (e.key == 'ArrowUp') {
    e.preventDefault();
    window.pressedKeys.up = true;
  } else if (e.key == 'ArrowDown') {
    e.preventDefault();
    window.pressedKeys.down = true;
  } else if (e.key == 'ArrowLeft') {
    e.preventDefault();
    window.pressedKeys.left = true;
  } else if (e.key == 'ArrowRight') {
    e.preventDefault();
    window.pressedKeys.right = true;
  }
  
  setDirVarsForDesktops();
}



function handleKeyUp(e) {
  if (e.repeat) {return};
  
  if (e.key == 'ArrowUp') {
    e.preventDefault();
    window.pressedKeys.up = false;
  } else if (e.key == 'ArrowDown') {
    e.preventDefault();
    window.pressedKeys.down = false;
  } else if (e.key == 'ArrowLeft') {
    e.preventDefault();
    window.pressedKeys.left = false;
  } else if (e.key == 'ArrowRight') {
    e.preventDefault();
    window.pressedKeys.right = false;
  }
  
  setDirVarsForDesktops();
}

function setDirVarsForDesktops() {
  var left = window.pressedKeys.left;
  var right = window.pressedKeys.right;
  var up = window.pressedKeys.up;
  var down = window.pressedKeys.down;
  
  if (left && !(up || down)) {
    //onlyleft
    setDirVars(1,0,0,0,[0,0]); 
    
  } else if (right && !(up || down)) {
    //only right
    setDirVars(0,1,0,0,[0,0]); 
    
  } else if (up && !(left || right)) {
    //only up
    setDirVars(0,0,1,0,[0,0]); 
    
  } else if (down && !(left || right)) {
    //only down
    setDirVars(0,0,0,1,[0,0]); 
    
  } else if (left  && up) {
    setDirVars(0,0,0,0,[-1, 1]); 
  
  } else if (left  && down) {
    setDirVars(0,0,0,0,[-1, -1]);
    
  } else if (right  && up) {
    setDirVars(0,0,0,0,[1,1]); 
    
  } else if (right  && down) {
    setDirVars(0,0,0,0,[1, -1]); 
    
  } else if (!(left || right || up || down)) {
    setDirVars(0,0,0,0,[0,0]);
   
  }
}


// Utility functions

function swapPointerCoords(x,y) {
  pointerCoords.previous.x = pointerCoords.current.x;
  pointerCoords.previous.y = pointerCoords.current.y;
  pointerCoords.current.x = x;
  pointerCoords.current.y = y;
}
function setDirVars(left, right, up, down, diagonal) {
  window.hero.bMoveLeft = left;
  window.hero.bMoveRight = right;
  window.hero.bMoveUp = up;
  window.hero.bMoveDown = down;
  window.hero.aMoveDiagonally = diagonal;
  
}