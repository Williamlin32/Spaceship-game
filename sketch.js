/* Variables for pages*/
const startMenu = 0,
  loadingPage = 1,
  namePage = 2,
  gamePage = 3,
  gameOverPage = 4;
var currentPage = 0;

/*Videos*/
var introVideo;
var loadingVideo;

/*Images*/
let backgroundImage;
let playerShipImage;
let enemyShipImage1;

/*Buttons*/
let playButton;
let enterButton;

/*Input*/
let nameInput;

/*Text Header*/
let textHeader;
let scoreBoard;
let nameDisplay;


/*groups*/
let bullets;
let walls;

/*Sprites*/
let playerShip;
let enemyShip;

var player = {
  name: " ",
  score: 0,
};

let margin = 10;

/*functions*/
function preload() {
  backgroundImage = loadImage("Images/Background.png");
  playerShipImage = loadImage("Images/PlayerShip.png");

  enemyShipImage1 = loadImage("Images/EnemyShip1.png");
}

function setup() {
  createCanvas(700, 700);
  select("canvas").position(400, 0);
  background(0, 0, 0);
  introVideo = createVideo("Videos/Intro.mp4");
  loadingVideo = createVideo("Videos/Loading.mp4");
  introVideo.volume(0);
  loadingVideo.volume(0);
  introVideo.loop();

  playerShip = createSprite(width / 2, height - 50);
  playerShip.addImage(playerShipImage);
  playerShip.debug = true;
  playerShip.setCollider("circle", 0, 5, 25);

  enemyShip = createSprite(width / 2, 100);
  enemyShip.addImage(enemyShipImage1);

  bullets = new Group();
  walls = new Group();
  createWalls();

  createElementsNameScreen();
  createButtonsForPages();
  hideElements();
}

function draw() {
  if (currentPage == 0) {
    mainMenu();
  }
  if (currentPage == 1) {
    loadingScreen();
  }
  if (currentPage == 2) {
    nameScreen();
  }
  if (currentPage == 3) {
    gameScreen();
  }
}

function hideElements() {
  introVideo.hide();
  loadingVideo.hide();
  playButton.hide();
  nameInput.hide();
  enterButton.hide();
  textHeader.hide();
  scoreBoard.hide();
}
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
/* Functions for pages or screens*/
function mainMenu() {
  image(introVideo, 50, 50, 600, 600);
  playButton.show();
}

function loadingScreen() {
  background(0, 0, 0);
  image(loadingVideo, 50, 50, 600, 600);
}

function nameScreen() {
  background(200, 200, 200);
  nameInput.show();
  textHeader.show();
  enterButton.show();
  textSize(32);
  text("Username", 90, 275);
  if(keyIsDown(13)){
    setTimeout(changeToGameScreen, 0);
  }
}

function gameScreen() {
  background(backgroundImage);
  scoreBoard.show();
  playerShip.display();
  enemyShip.display();
  checkCollision();
  drawSprites(bullets);
  drawSprites(walls);
  customKeyPressed();
  teleportation();
}

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

function changeToNameScreen() {
  introVideo.stop();
  playButton.hide();
  loadingVideo.play();
  changeScreen();
  setTimeout(changeScreen, 2600);
}
function changeToGameScreen() {
  changeScreen();
  hideElements();
  player.name = nameInput.value();
  if (player.name == "") {
    player.name = "Unknown Player";
  }
  print(player.name);
  nameDisplay.html(player.name, true);

}
function changeScreen() {
  currentPage++;
}

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

function customKeyPressed() {
  if (keyIsDown(RIGHT_ARROW)) {
    playerShip.position.x += 6;
  }
  if (keyIsDown(LEFT_ARROW)) {
    playerShip.position.x -= 6;
  }
}

function keyPressed() {
  if (keyCode == 32) {
    setTimeout(playerShooting, 0);
  }
}

function teleportation() {
  if (playerShip.position.x < -margin) {
    playerShip.position.x = width + margin;
  }
  if (playerShip.position.x > width + margin) {
    playerShip.position.x = -margin;
  }
}

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
function playerShooting(){
  let bullet = createSprite(playerShip.position.x, playerShip.position.y, 10, 10);
  bullet.setVelocity(0, -12);
  bullet.debug = true;
  bullets.add(bullet);
}

function checkCollision(){
  bullets.collide(walls, removeWallBullets);
}

function removeWallBullets(bullet, walls){
  bullet.remove();
}
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

/* functions for creating elements */
function createButtonsForPages() {
  playButton = select("#play-button");
  playButton.position(700, 550);
  playButton.mouseClicked(changeToNameScreen);

  enterButton = select("#enter-button");
  enterButton.position(860, 245);
  enterButton.mouseClicked(changeToGameScreen);
}

function createElementsNameScreen() {
  textHeader = select("#text-header");
  textHeader.position(500, 100);

  nameInput = select("#name-input");
  nameInput.position(650, 245);

  scoreBoard = select("#score-board");
  scoreBoard.position(1100,0);

  nameDisplay = select("#username-text");
}

function createWalls(){
  let wall1 = createSprite(0, 0, width*2, 2);
  let wall2 = createSprite(0, height-2, width*2, 2);
  wall1.shapeColor = color(0,0,63);
  wall2.shapeColor = color(0,0,63);
  walls.add(wall1);
  walls.add(wall2);
}
