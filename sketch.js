var bg, bgImg
var bottomGround
var topGround
var balloon, balloonImg
var lampImg, lamp, lampGroup
var building1Img, building1, building1Group
var building2IMG
var gameState = 'start'
var bg2
var coinImg, gameOverImg
var coins, coinGroup
var score = 0
// step1: create variables for our game
function preload() {
  bgImg = loadImage("balloonImageGame.png")
  //step5: created Image in the game
  lampImg = loadImage('assets/lamp.png')
  balloonImg = loadAnimation("assets/balloon1.png", "assets/balloon2.png", "assets/balloon3.png")
  building1Img = loadImage('assets/obsBottom1.png')
  building2IMG = loadImage('assets/obsBottom3.png')
  bg2 = loadImage('balloon_runner_game_Image-removebg-preview.png')
  coinImg = loadImage('coin.png')
  gameOverImg = loadImage('gameover.png')
}

function setup() {

  //background
  createCanvas(windowWidth, windowHeight);
  bg = createSprite(0, height / 2);
  bg.addImage('moving', bgImg);
  bg.scale = 1.5;
  bg.velocityX = 1
  //creating top and bottom grounds
  bottomGround = createSprite(200, 390, 800, 20);
  bottomGround.visible = false;

  topGround = createSprite(200, 10, 800, 20);
  topGround.visible = false;

  //creating balloon     
  balloon = createSprite(1200, 200, 20, 50);
  balloon.addAnimation("balloon", balloonImg);
  balloon.scale = 0.2;
  // step2: create a group for the obstacles to put all inside one
  lampGroup = new Group()
  building1Group = new Group()
  coinGroup = new Group()
}

function draw() {

  background('black');
  if (gameState === 'start') {
    background(bg2)
    textSize(45)
    text('Infinite balloon runner game', 500, 500)
    text('Press enter to start', 500, 600)
    if (keyDown('enter')) {
      gameState = 'play'
    }
  }
  else if (gameState === 'play') {
    if (keyDown("space")) {
      balloon.velocityY = -6;

    }
    if (bg.x > 750) {
      bg.x = 0;
    }
    //adding gravity
    balloon.velocityY = balloon.velocityY + 2;
    //step4: calling function to execute it
    spawnBuilding1();
    spawnlamp();
    spawncoins()
    drawSprites();
    textSize(40)
    text('Score: '+score,width-200,50)
    if(lampGroup.isTouching(balloon) || building1Group.isTouching(balloon) || balloon.y > windowHeight){
      gameState = 'end'
    }
  }
  else if (gameState === 'end') {
    imageMode(CENTER)
    image(gameOverImg,width/2,height/2,400,400)
  }
  //making the hot air balloon jump


}
//step3: spawning lamp obstacles
function spawnlamp() {
  if (frameCount % 87 === 0) {
    lamp = createSprite(-5, 1000, 300, 500);
    lamp.velocityX = 4
    lamp.addImage(lampImg)
    lamp.scale = 0.2
    lamp.depth -= 2
    lampGroup.add(lamp);
  }
}

function spawncoins(){
  if(frameCount % 50 === 0){
    coins = createSprite(-10, 200)
    coins.addImage(coinImg)
    coins.scale = 0.3
    coins.velocityX = 4
    coins.y = Math.round(random(100,800))
    coinGroup.add(coins)
  }
}
function spawnBuilding1() {
  if (frameCount % 87 === 0) {
    building1 = createSprite(-5, 1050, 400, 600);
    building1.velocityX = 10;
    var randomNumber = Math.round(random(1, 2))
    if (randomNumber === 1) {
      building1.addImage(building1Img);
    }
    else if (randomNumber === 2) {
      building1.addImage(building2IMG);
    }
    building1.scale = 0.3;
    console.log(building1.depth)
    building1Group.add(building1);
  }
}