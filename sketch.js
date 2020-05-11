var PLAY = 1;
var END = 0;
var gameState = PLAY;

var player, player_running;
var ground;

var InstrumentsGroup, screwImage,hammerImage;
var obstaclesGroup, obstacle_img;

var score=0;

var gameOver, restart,gameOverImg,restartImg;


function preload(){
  player_running =   loadImage("AlphaPig.png");
  
  
 // groundImage = loadImage("ground.jpg");
  
  screwImage = loadImage("screw.png");
  hammerImage= loadImage("hammer.png");
  
  obstacle_img = loadImage("obstacle.png");
  
  
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
}

function setup() {
  createCanvas(800, 400);
  
  player = createSprite(100,350,20,50);
  
  player.addImage("running", player_running);
  
  player.scale = 0.1;
  
  ground = createSprite(400,380,800,10);
  //ground.addImage
  
  gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(300,140);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.5;

  gameOver.visible = false;
  restart.visible = false;
  
  
  //invisibleGround.visible = false;
  
  InstrumentsGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;
}

function draw() {
  //trex.debug = true;
  background(255);
  text("Score: "+ score, 500,50);
  console.log(player.y);
  
  if (gameState===PLAY){
    
    if(InstrumentsGroup.isTouching(player)){
      InstrumentsGroup.destroyEach();
    score = score + 2;
    }
    switch(score){
      case 10: player.scale=0.20;
        break;
        case 20: player.scale=0.25;
        break;
        case 30: player.scale=0.30;
        break;
        default: break;
    }
  
    if(keyDown("space") ) {
      player.velocityY = -18;
    }
  
    player.velocityY = player.velocityY + 0.8
  
  /*  if (ground.x < 0){
      ground.x = ground.width/2;
    }*/
  edges=createEdgeSprites();
    player.collide(ground);
    spawnInstruments();
    spawnObstacles();
  
    if(obstaclesGroup.isTouching(player)){
        gameState = END;
    }
  }
  else if (gameState === END) {
    gameOver.visible = true;  
    restart.visible = true;
    
    //set velcity of each game object to 0
  
    player.velocityY = 0;
    InstrumentsGroup.setVelocityXEach(0);
    obstaclesGroup.setVelocityXEach(0);
    
  
    
    //set lifetime of the game objects so that they are never destroyed
    InstrumentsGroup.setLifetimeEach(-1);
    obstaclesGroup.setLifetimeEach(-1);
    
    if(mousePressedOver(restart)) {
      reset();
    }
  }
  
  
  drawSprites();
}

function spawnInstruments() {
  //write code here to spawn the clouds
  if (frameCount % 100 === 0) {
    var instrument = createSprite(600,250,40,10);
    instrument.y = random(200,250);
    
    
    instrument.addImage(screwImage);
     
    
    instrument.scale = 0.05;
    instrument.velocityX = -3;
    
     //assign lifetime to the variable
    instrument.lifetime = 300;
    
    //adjust the depth
    instrument.depth = player.depth;
    player.depth = player.depth + 1;
    
    //add each cloud to the group
    InstrumentsGroup.add(instrument);
  }
  
}

function spawnObstacles() {
  if(frameCount % 100 === 0) {
    var obstacle = createSprite(800,360,10,40);
    obstacle.debug = true;
    obstacle.velocityX = -6;
        
       obstacle.addImage(obstacle_img);
           
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.1;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  InstrumentsGroup.destroyEach();
  
  
  score = 0;
  
}