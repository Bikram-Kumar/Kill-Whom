import {fitCanvasToScreen} from "./ui.js";
import {Hero} from "./mechanics.js"; // Classes
import {handleDrawingObjects, detectCollisions} from "./mechanics.js"; // Functions

// Declare Global Variables Here
window.cnvs = document.getElementById('cnvs');
window.ctx = cnvs.getContext('2d');
window.gameArea = document.getElementById("gameArea");
window.scaleFactor = null;
window.imageFolder = null;
window.imageScalar = null;
window.hero = null;
window.pressedKeys = {
  left: false,
  right: false,
  up: false,
  down: false
};

var animationBucket = [];
var gameOver = false;
var callerOfAnimationStarter;
var spawnerId;

var time1, deltaTime = 0;


window.requestFullScreen = function() {
  gameArea.requestFullscreen();
};
window.onresize = window.onorientationchange = fitCanvasToScreen;
window.onload = function () {
  fitCanvasToScreen();
  startGame();
} ;


function gameLoop(timeSinceStart) {
  ctx.beginPath();
  ctx.clearRect(0, 0, cnvs.width, cnvs.height);
  handleDrawingObjects();
  
  animationBucket.forEach(function (item) {
    item.draw();
  }
  );
  detectCollisions();

  deltaTime = (timeSinceStart - time1) / 20;
  time1 = timeSinceStart;
  
  if (!gameOver) {
    callerOfAnimationStarter = requestAnimationFrame(gameLoop);
  }
}

function startGame() {
  hero = new Hero(50, 150, 64);
  animationBucket.push(hero);
  gameLoop();
}

