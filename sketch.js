//Create variables here
var dog,happyDog;
var database;
var food,foodStock;
var foodS;
var lastFed;
var readState, changeState;
var bedroomImg, washroomImg, gardenImg;
function preload()
{
  //load images here
  dogImg= loadImage("images/Dog.png");
  happyDogImg= loadImage("images/happydog.png");
  bedroomImg = loadImage("virual pet images/Bed Room.png");
  washroomImg = loadImage("virual pet images/Wash Room.png");
  gardenImg = loadImage("virual pet images/Garden.png");
}

function setup() {
  database=firebase.database();
	createCanvas(1000, 400);
  foodObj= new Food();
  foodStock= database.ref("Food");
  foodStock.on("value",readStock);

  readState = database.ref('gameState');
    readState.on("value",function(data){
-   gameState ; data.val();
  });

  dog= createSprite(800,250,150,150);
  dog.addImage(dogImg);
  dog.scale=0.2;

  feed = createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood= createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);


}


function draw() {  
background(46, 139, 87);
foodObj.display();

fedTime= database.ref('FeedTime');
fedTime.on("value",function(data){
  lastFed= data.val();
  //console.log(lastFed);
})
currentTime
if(currentTime==(lastFed+1)){
  update("Playing");
  Food.garden();
}else if(current==(lastFed+2)){
  update("Sleeping");
  Food.bedroom();
}else if(currentTime>(lestFed+2) && currentTime<=(lastFed+4)){
  update("Bathing");
  Food.washroom();
}else{
  update("Hungry")
  Food.display();
}
}

fill("white");
textSize(15);
if(lastFed>=12){
  text("Last Feed:"+ lastFed%12+"PM",350,30);
}else if(lastFed == 0){
  text("Last Feed: 12 AM",350,30);
}
else{
  text("Last Feed:"+lastFed+"AM",350,30);
}
  drawSprites();
  //add styles here
  
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}
function feedDog(){
  dog.addImage(happyDogImg);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food: foodS
  })
}
function update(state){
  database.ref('/').update({
    gameState:state
  }); 
}

