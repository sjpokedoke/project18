var banimg, obsimg, bg, bgimg, monkey, monimg1, monimg2, monimg3, monimg4, invsground, go, goimg;
var bananagroup, obsgroup, banana,obs, obsimg, banimg;
var score = 0;
var lives = 3;
var PLAY = 1;
var END = 0;
var gamestate = PLAY;

//preload
function preload(){
bgimg = loadImage("jungle.jpg");
monimg1 = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
obsimg = loadImage("stone.png");
banimg = loadImage("banana.png");
goimg = loadImage("go.png")
}

//setup
function setup() {
  createCanvas(800, 300);
  bg = createSprite(400, 150, 800, 300);
  bg.addImage("bgimg", bgimg);
  bg.x = bg.width /2;
  
  go = createSprite(400, 150);
  go.addImage("goimg", goimg);
  go.visible = false;
  
  monkey = createSprite(100, 260, 20, 20);
  monkey.addAnimation("monimg", monimg1);
  monkey.scale = 0.1;
  
  invsground = createSprite(400, 300, 800, 20);
  invsground.visible = false;
  
  bananagroup = new Group();
  obsgroup = new Group();
}

//draw
function draw() {
  background("black");
  if(gamestate===PLAY){
    
    //bg velocity
     bg.velocityX = -4;
  if (bg.x < 300){
      bg.x = bg.width/2;
    }
    
    //jump monkey
    if(keyDown("space") && monkey.y >= 229){
    monkey.velocityY = -16;
    }
    monkey.velocityY = monkey.velocityY + 0.8;
    
    //increase score
    for(var i=0;i<bananagroup.length;i++){
    if(monkey.isTouching(bananagroup.get(i))){
      bananagroup.get(i).destroy();
      score = score+2;
    }                                
  }
    
    //decrease lives
   for(var j=0;j<obsgroup.length;j++){
    if(monkey.isTouching(obsgroup.get(j))){
      obsgroup.get(j).destroy();
      monkey.scale = 0.1;
      score = 0;
      lives = lives-1;
    }                                
  }
    
    //monkey bigger
    switch(score){
      case 10: monkey.scale = 0.12;
      break;
      case 20: monkey.scale = 0.14;
      break;
      case 30: monkey.scale = 0.16;
      break;
      case 40: monkey.scale = 0.18;
      break;
      default: break;
    }
     }
  
  if(lives===0||lives<0&&gamestate===PLAY){
    gamestate=END;
  }
  
  if(gamestate === END){
    bananagroup.destroyEach();
    obsgroup.destroyEach();
    invsground.visible = false;
    monkey.visible = false;
    bg.visible = false;
    go.visible = true;
    fill("white");
    text("Press r to restart", 400, 250);
    }
  if(keyDown("r")&&gamestate===END){
    gamestate = PLAY;
    monkey.visible = true;
    lives = 3;
    score = 0;
    go.visible = false;
    bg.visible = true;
  }
  
  monkey.collide(invsground);
  
  //calling function
  spawnobs();
  spawnban();
  
  //draw sprites
  drawSprites();
  
  //texts
  if(gamestate===PLAY){
    stroke("white");
  fill("white");
  textSize(20);
  text("Score: "+score, 500, 50);
  text("Lives: "+lives, 500, 80);
}
}

//spawn obs
function spawnobs() {
  if (frameCount % 100 === 0&&frameCount>0&&gamestate===PLAY) {
    obs = createSprite(800,280,40,10);
    obs.scale = 0.15;
    obs.velocityX = -4;
    obs.addImage("obsimage",obsimg);
    obs.lifetime = 200;
    obsgroup.add(obs);
  }
  
}

//spawn banana
function spawnban() {
  if (frameCount % 80 === 0&&frameCount>0&&gamestate===PLAY) {
    banana = createSprite(800,280,40,10);
    var rand = random(120, 200);
    banana.y = rand;
    banana.scale = 0.05;
    banana.velocityX = -4;
    banana.addImage("banimage",banimg);
    banana.lifetime = 200;
    bananagroup.add(banana);
  }
  
}