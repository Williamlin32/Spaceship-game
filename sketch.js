/* Variables for pages*/
const startMenu = 0, loadingPage = 1, namePage = 2, gamePage = 3, gameOverPage = 4;
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

/*Sprites*/
let playerShip;

var player = {
  name: " ",
  score: 0
};

let margin = 10;

/*functions*/
function preload(){
  backgroundImage = loadImage('Images/Background.png');
  playerShipImage = loadImage('Images/PlayerShip.png');
  
  // enemyShipImage1 = loadImage('Images/EnemyShips/EnemyShip1.png')
}

function setup() {
 createCanvas(700, 700);
  background(0, 0, 0);
  introVideo = createVideo("Videos/Intro.mp4");
  loadingVideo = createVideo("Videos/Loading.mp4");
  introVideo.volume(0);
  loadingVideo.volume(0);
  introVideo.loop();
  
  playerShip = createSprite(width/2, height - 85)
  playerShip.addImage(playerShipImage);
  
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
  if (currentPage == 2){
    nameScreen();
  }
  if(currentPage == 3){
    gameScreen();
  }
}

function hideElements(){
  introVideo.hide();
  loadingVideo.hide();
  nameInput.hide();
  playButton.hide();
  enterButton.hide();
  textHeader.hide();
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

function nameScreen(){
  background(200,200,200)
  nameInput.show();
  textHeader.show();
  enterButton.show();
  textSize(32)
  text("Name", 150, 275)
}

function gameScreen(){
  background(backgroundImage);
  playerShip.display();
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
  setTimeout(changeScreen, 2600)
  
}
function changeToGameScreen(){
  changeScreen();
  hideElements();
  player.name = nameInput.value();
  if(player.name == ""){
    player.name = "Unknown Player"
  }
  print(player.name)
}
function changeScreen(){
  currentPage++;
}

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

function customKeyPressed(){
  if(keyIsDown(RIGHT_ARROW)){
    playerShip.position.x += 8;
  }
  if(keyIsDown(LEFT_ARROW)){
    playerShip.position.x -= 8;
  }
}

function teleportation(){
  if(playerShip.position.x < -margin){
    playerShip.position.x = width + margin; 
  }
  if(playerShip.position.x > width + margin){
    playerShip.position.x = -margin
  }
}

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////


/* functions for elements*/ 
function createButtonsForPages() {
  playButton = createButton("Play");
  playButton.style('width: 100px; height: 35px; background-color: lightgreen; color: black; font-size: 22px; border-radius: 10px;')
  playButton.id("play_button");
  // playButton.position(width/2 - 60, height - 215)
  playButton.mouseClicked(changeToNameScreen);
  
  enterButton = createButton('Enter');
  enterButton.style('width: 75px; height: 35px; color: black; font-size: 24px; border-radius: 10px;')
  enterButton.position(460,250)
  enterButton.mouseClicked(changeToGameScreen);
}
  
function createElementsNameScreen(){
  textHeader = createDiv("Galaga Game")
  textHeader.style("font-size: 64px; font-family: Tahoma; ")
  textHeader.position(75, 75)
  
  nameInput = createInput('');
  nameInput.style(' width: 200px; height: 30px; font: Georgia;  font-size: 24px; border-radius: 5px; border: 2px solid black;')
  nameInput.position(250,250)
}