class Game {
  constructor(){}
  
  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })
   
  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref(playerCount).once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form();
      form.display();
    }
    car1 = createSprite(150,200,20,20);
    car1.addImage(imgCar1);
    car2 = createSprite(350,200,20,20);
    car2.addImage(imgCar2);
    car3 = createSprite(550,200,20,20);
    car3.addImage(imgCar3);
    car4 = createSprite(750,200,20,20);
    car4.addImage(imgCar4);
    cars = [car1, car2, car3, car4];
  }

  play(){
    form.hide();
    //textSize(20);
    //text("Game Start",displayWidth/2-40, displayHeight/2);
    Player.getPlayerInfo();
    player.getCarsAtEnd();
    if(allPlayers !== undefined){
      background(groundImg);
      image(trackImg, 0, -displayHeight*5, displayWidth, displayHeight*5);
       //var displayPosition = 150;
       //console.log(allPlayers);
       var index = 0;
       var x = 150;
       var y = 0;
      for(var plr in allPlayers){
         /*if(plr === "player" + player.index){
           fill("red");    
         }else{
           fill("black");
         }*/
         index = index + 1;
         x = x + 200;
         y = displayHeight - allPlayers[plr].distance;
         cars[index - 1].x = x;
         cars[index - 1].y = y;
         //displayPosition += 20;
         //text(allPlayers[plr].name +" : "+ allPlayers[plr].distance , 120,displayPosition);
         if(index === player.index){
           //cars[index - 1].shapeColor = "red";
           fill("Red");
           ellipse(x, y, 150, 150);
           camera.position.x = displayWidth/2;
           camera.position.y = cars[index - 1].y;
         }
      }
    }
      if(keyDown(UP_ARROW) && player.index !== null){
         player.distance += 50;
         player.update();
      }
      drawSprites();
      if(player.distance > 4700){
        player.rank++;
        Player.updateCarsAtEnd(player.rank);
        gameState = 2;
      }
  }
  end(){
    //console.log("Game ended");
    console.log(player.rank);
    for(var car in cars){
      car.visible = false;
    }
  }
}
