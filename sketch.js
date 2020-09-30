var canvas, backgroundImage;
var cars;
var car1, car2, car3, car4;
var imgCar1, imgCar2, imgCar3, imgCar4, track, trackImg, ground, groundImg;

var gameState = 0;
var playerCount;

var database;

var form, player, game;

var allPlayers;

function preload(){
  imgCar1 = loadImage("images/car1.png");
  imgCar2 = loadImage("images/car2.png");
  imgCar3 = loadImage("images/car3.png");
  imgCar4 = loadImage("images/car4.png");
  trackImg = loadImage("images/track.png");
  groundImg = loadImage("images/ground.png"); 
}

function setup(){
  canvas = createCanvas(displayWidth-20, displayHeight-30);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
  console.log(displayHeight);
  console.log(displayWidth);
}


function draw(){
  if(playerCount === 4){
     game.update(1);
  }
  if(gameState === 1){
    clear();
    game.play();
  }
  if(gameState === 2){
    game.end();
  }
}
