var monkey , monkey_running;
var banana ,bananaImage;
var obstacle, obstacleImage; 
var FoodGroup, obstacleGroup;
var score;
var ground, invisibleGround;
var gameState;

function preload(){
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}


function setup() {
 createCanvas(600,500);
 
 monkey = createSprite(80,305,20,20);
 monkey.addAnimation("moving", monkey_running);
 monkey.scale = 0.1;
 
 ground = createSprite(400,350,900,30);
 ground.velocityX = -4;
  
 score = 0;
  
 gameState = "Play";
  
 FoodGroup = createGroup();
 obstacleGroup = createGroup();
  
}

function draw() {
background(225);

if(gameState === "Play") {
  
ground.x = ground.width/4;
console.log(ground.x);
  
score = Math.round((frameCount + 10)/18) - Math.round(score/200);

stroke("black");
fill("black");
textSize(20);
text("Survival time: "+ score, 200, 50);

monkey.collide(ground);
monkey.velocityY = monkey.velocityY + 2.5;

if(FoodGroup.isTouching(monkey)) {
  monkey.scale = monkey.scale + 0.01;
  FoodGroup.destroyEach();
      }

if(keyDown("space") && monkey.y >= 250) {
  monkey.velocityY = -23.5;
  }  


if(obstacleGroup.isTouching(monkey)) {
  gameState = "End";
  
  //obstacleGroup.destroyEach();
    } 
  
} 
 
  if(gameState === "End") {
  
    score = 0;
  
  FoodGroup.destroyEach();
  obstacleGroup.destroyEach();
  ground.destroy();
  monkey.destroy();
    
  background("black");
  
stroke("white");
textSize(40);
text("Game Over!", 200, 250);
}

Banana();  
TheObstacle();
drawSprites();
  
}

function TheObstacle() {
  
if(frameCount % 300 === 0) {
  
  obstacle = createSprite(600,315,50,50);
  obstacle.lifetime = 300;
  obstacle.depth = monkey.depth;
  obstacle.addImage("stone",obstacleImage);
  obstacle.scale = 0.1;
  obstacle.velocityX = -4;
  
  obstacleGroup.add(obstacle);
  }    
}


function Banana() {
  
if(frameCount % 80 === 0) {

banana = createSprite(550,350,20,20);
banana.addImage("hmm", bananaImage);
banana.scale = 0.1;
banana.y = random(120,200);
banana.velocityX = -4;
  
banana.lifetime = 300;
FoodGroup.add(banana);
  
  }  
}

