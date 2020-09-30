class Player {
  constructor(){
     this.index = null;
     this.distance = 0;
     this.name = null;
     this.rank = null;
  }

  getCount(){
    var playerCountRef = database.ref('playerCount');
    playerCountRef.on("value",function(data){
      playerCount = data.val();
    })
  }

  updateCount(count){
    database.ref('/').update({
      playerCount: count
    });
  }

  update(){
    var playerIndex = "players/player" + this.index;
    database.ref(playerIndex).set({
      name:this.name,
      distance:this.distance
    });
  }
  
  getCarsAtEnd(){
    var carsatend = database.ref('CarsAtEnd');
    carsatend.on("value", (data) => {this.rank = data.val()});
  }

  static updateCarsAtEnd(rank){
    database.ref('/').update({
      CarsAtEnd : rank
    })
  }

  static getPlayerInfo(){
    var playerInfoRef = database.ref('players');
    playerInfoRef.on("value",(data) => {allPlayers = data.val()});
  }
}
