var path, mainCyclist;
var pathImg, mainRacerImg1, mainRacerImg2;
var cycleBell;
var END = 0;
var PLAY = 1;
var gameState = PLAY;
var windowHeightStore = 0;
var distance = 0;
var distanceRacer = 0;
var cyclebell, redCG, pinkCG;
var player1, player2;
var randPlayerVel = 0;
var oppVelDiff = 0;
var randOppVel = 0;
var score = 0;
var obstacle;

var playerLoc = 0;
var textLoc = 0;
var obj2;
var frameCountStore = 0;
var finalScore =0;
var storeAdds=0;
var storeAdds2
var Victory = 0;
var victoryColors



function preload() {
  cycleBell = loadSound("bell.mp3");
  pathImg = loadImage("Road.png");
  mainRacerImg1 = loadAnimation("mainPlayer1.png", "mainPlayer2.png");
  mainRacerImg2 = loadAnimation("mainPlayer1.png", "mainPlayer2.png");
}

function setup() {

  randPlayerVel = Math.round(random(10, 15));
  createCanvas(windowWidth, windowHeight);



  windowHeightStore = canvas.width / 2;
  path = createSprite(150, windowHeight / 2);
  path.addImage(pathImg);
  //path.velocityX = -5;


  obstacle = createSprite(windowWidth, windowHeight / 2);
  obj2 = createSprite(obstacle.x, windowHeight / 2, 100, 10);
  obj2.shapeColor = "white"
  obstacle.shapeColor = "orange";

  //creating boy running
  mainCyclist = createSprite(70, 150, 20, 20);
  mainCyclist.addAnimation("SahilRunning", mainRacerImg1);
  mainCyclist.scale = 0.07;


}

function draw() {
  victoryColors = victoryColors + 5
  if(distance>49){
    Victory = 1;
  }


  
  obj2.x = obstacle.x;
  obj2.y = obstacle.y;
  if (keyDown("SPACE")) {
    cycleBell.play();
  }

  //time until bicycle spawned
  distanceRacer = distanceRacer + 1;
  if (distanceRacer > 100) {
  
    spawnCyclist();
    distanceRacer = 0;
  }
  //distance measurement;
  score = frameCount;
  distance = Math.round(score / 10);
  
  background(100);
 if(victoryColors>255){
   victoryColors=0
 }
  if (randPlayerVel > randOppVel) {
    oppVelDiff = randPlayerVel - randOppVel;
    redCG = oppVelDiff;
  }

  drawSprites();

  //displays distance
  textSize(20);
  fill(255);
  text("Distance: " + distance, windowWidth - 150 + textLoc, 30);
 if(Victory ==1){
   camera.position.x =camera.position.x-5 
     fill(rgb(victoryColors,victoryColors,victoryColors));
    textSize(69);
    text("You win! You reached 50 score",displayWidth/2,displayHeight/2);
    
  }
  if (gameState === PLAY) {
    frameCountStore = frameCountStore + 1;
    if (mainCyclist.isTouching(obstacle)) {
    gameState = "FALSE";
      finalScore = distance
  }
    camera.position.x = camera.position.x + 5;
    textLoc = textLoc + 5;
    playerLoc = playerLoc + 5
    //mainCyclist.x = 70 + textLoc;
    //cycle bell
    mainCyclist.y = World.mouseY;
    edges = createEdgeSprites();
    mainCyclist.collide(edges);

    //code to reset the background
    if (path.x < 0 - playerLoc) {
      path.x = width / 2;
    }
    if (frameCountStore > windowWidth / 5 + 25) {
    
      
      frameCountStore = 0;
      obstacle.x = playerLoc + windowWidth
      obstacle.y = Math.round(random(0, windowHeight));

    }
    mainCyclist.x = playerLoc + 70
  } else {
    frameCount = 0
    storeAdds2 = windowWidth/2
    storeAdds=windowWidth + windowHeight;
    textSize(storeAdds/30);
    fill("black")
    text("Your final score was " + finalScore,frameCountStore+ storeAdds2,windowHeight/2);
  }
}

function spawnCyclist() {

  //bicycle random spawn
  player1 = createSprite(50, Math.round(random(50, windowHeight - 50)), 10, 10);

  //makes opponents velocity relative to yours
  randOppVel = (random(10, 15));
  oppVelDiff = randPlayerVel - randOppVel;

  //makes animation and velocity
  player1.addAnimation("racerAn", mainRacerImg2);
  player1.scale = 0.07;
  player1.lifetime = 250;
  player1.velocityX = oppVelDiff;
}