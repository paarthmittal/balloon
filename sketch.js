var balloon,balloonImage1,balloonImage2;
var database;
var balloonair;
var position;
// create database and position variable here

function preload(){
   bg =loadImage("cityImage.png");
   balloonImage1=loadAnimation("hotairballoon1.png");
   balloonImage2=loadAnimation("hotairballoon1.png","hotairballoon1.png",
   "hotairballoon1.png","hotairballoon2.png","hotairballoon2.png",
   "hotairballoon2.png","hotairballoon3.png","hotairballoon3.png","hotairballoon3.png");
  }

//Function to set initial environment
function setup() {
createCanvas(1500,700);
  database = firebase.database();

  balloon= createSprite(200,200,10,10);
  balloon.shapeColor = "red";

  var balloonpos = database.ref("balloon/position")
  balloonpos.on("value",readPosition,showError)
}

// function to display UI
function draw() {
  background(bg);
if (position!== undefined){
  if(keyDown(LEFT_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
 
    writePosition(-10,0)
  }
  else if(keyDown(RIGHT_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
   
    writePosition(10,0)
  }
  else if(keyDown(UP_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
  
    writePosition(0,-10)
  }
  else if(keyDown(DOWN_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    
    writePosition(0,+10)
  }
}
  drawSprites();
  fill(0);
  stroke("white");
  textSize(25);
  text("**Use arrow keys to move Hot Air Balloon!",40,40);
}
function writePosition(x,y){
  database.ref("balloon/position").set({
      'x' : position.x + x,
      'y' : position.y + y
  })
}
function showError(){
  console.log("there is error")
}

function readPosition(data){
position = data.val();
balloon.x = position.x
balloon.y = position.y
}