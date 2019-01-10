var end = false;
var mapWidth = 3960;
var mapHeight = 2600;

$(function(){
  $('#camera').attr('width',$(window).width());
  $('#camera').attr('height', $(window).height());
});

class GameObject {
  constructor(x,y,radius,color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
  }

  get getX() {
      return this.x;
    }
  set setX(x) {
      this.x = x;
    }
  get getY() {
      return this.y;
    }
  set setY(y) {
      this.y = y;
    }
  get getRadius() {
      return this.radius;
    }
  set setRadius(radius) {
      this.radius = radius;
    }
  get getColor() {
      return this.color;
    }
  set setColor(color) {
      this.color = color;
    }

  paint(ctx){
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
    ctx.closePath();
    ctx.fill();
  }

  eatFood(foods,player) {
    var r = this.radius / 1.3;
    var startX = this.x - r;
    var endX = this.x + r;
    var startY = this.y - r;
    var endY = this.y + r;

    var length = foods.length;
    for (var i = 0; i < length; i++) {
      if (startX < foods[i].x && endX > foods[i].x ) {
        if (startY < foods[i].y && endY > foods[i].y ) {
            foods.splice(i, 1);
            this.radius++;
            player.scale += 0.001;
            break;
        }
      }
    }
  }
  eatEnemy(enemies,player){
    var r = this.radius / 1.3;
    var startX = this.x - r;
    var endX = this.x + r;
    var startY = this.y - r;
    var endY = this.y + r;

    var length = enemies.length;
    for (var i = 0; i < length; i++) {
      if (this != enemies[i]) {
        if (startX < enemies[i].x && endX > enemies[i].x ) {
          if (startY < enemies[i].y && endY > enemies[i].y ) {
            if (this.radius > enemies[i].radius ) {
              this.radius += enemies[i].radius / 1.5;
              if (this == player ) {
                player.scale += enemies[i].radius / 1000;
              }
              if (enemies[i] == player) {
                end = true;
              }

              enemies.splice(i, 1);
              break;
            }
          }
        }
      }
    }
  }

}
class Player extends GameObject{
  constructor(x,y,radius,color) {
    super(screen.width /2,screen.height /2,radius,color);
    this.mouse_x = 0;
    this.mouse_y = 0;
    this.scale = 1;
    this.myMap_X = x;
    this.myMap_Y = y;
    this.speed = 2;
  }

  get getMouse_x() {
      return this.mouse_x;
    }
  set setMouse_x(mouse_x) {
      this.mouse_x = mouse_x;
    }
  get getMouse_y() {
      return this.mouse_y;
    }
  set setMouse_y(mouse_y) {
      this.mouse_y = mouse_y;
    }
  get getScale() {
      return this.scale;
    }
  set setScale(scale) {
      this.scale = scale;
    }


    // moveToCursor(){
    //   if (player.x != player.mouse_x){
    //     if (player.mouse_x > player.x)
    //       player.x++;
    //     else if(player.mouse_x < player.x)
    //       player.x--;
    //   }
    //   if (player.y != player.mouse_y){
    //     if (player.mouse_y > player.y)
    //       player.y++;
    //     else if(player.mouse_y < player.y)
    //       player.y--;
    //   }
    // }

  moveFoodsMinX(foods){
    var length = foods.length;
    for (var i = 0; i < length; i++) {
      foods[i].x -= this.speed;
    }
  }
  moveFoodsPlasX(foods){
    var length = foods.length;
    for (var i = 0; i < length; i++) {
      foods[i].x += this.speed;
    }
  }
  moveFoodsMinY(foods){
    var length = foods.length;
    for (var i = 0; i < length; i++) {
      foods[i].y -= this.speed;
    }
  }
  moveFoodsPlasY(foods){
    var length = foods.length;
    for (var i = 0; i < length; i++) {
      foods[i].y += this.speed;
    }
  }
    ////////////////////////////
  moveEnemyMinX(enemies){
    var length = enemies.length;
    for (var i = 0; i < length; i++) {
      if(enemies[i] != this)
        enemies[i].x -= this.speed;
    }
  }
  moveEnemyPlasX(enemies){
    var length = enemies.length;
    for (var i = 0; i < length; i++) {
      if(enemies[i] != this)
        enemies[i].x += this.speed;
    }
  }
  moveEnemyMinY(enemies){
    var length = enemies.length;
    for (var i = 0; i < length; i++) {
      if(enemies[i] != this)
        enemies[i].y -= this.speed;
    }
  }
  moveEnemyPlasY(enemies){
    var length = enemies.length;
    for (var i = 0; i < length; i++) {
      if(enemies[i] != this)
        enemies[i].y += this.speed;
    }
  }
    ////////////////////////////
  moveToCursor(foods,enemies){
    // if(player.myMap_X > 0 && player.myMap_X < mapWidth ){
          if (player.mouse_x > player.x){
            player.myMap_X += this.speed;
            player.moveFoodsMinX(foods);
            player.moveEnemyMinX(enemies);
          }
          else if(player.mouse_x < player.x){
            player.myMap_X -= this.speed;
            player.moveFoodsPlasX(foods);
            player.moveEnemyPlasX(enemies);
          }
    // }
    // if(player.myMap_Y > 0 && player.myMap_Y < mapHeight ){
          if (player.mouse_y > player.y){
            player.myMap_Y += this.speed;
            player.moveFoodsMinY(foods);
            player.moveEnemyMinY(enemies);
          }
          else if(player.mouse_y < player.y){
            player.myMap_Y -= this.speed;

            player.moveFoodsPlasY(foods);
            player.moveEnemyPlasY(enemies);
          }
      // }
      }




  }

class Food extends GameObject{
  constructor(x = 0,y = 0,radius = 15 ,color = "white") {
    super(x,y,radius,color);
  }

  spawnFood(length){
    var foods = [];
    for(var i = 0; i<length; i++)
    {
      foods.push({   x : getRandomInt(mapWidth),  y : getRandomInt(mapHeight) , color :  getRandomColor2() });
    }
    return foods;
  }
  addFood(count,foods){
    for(var i = 0; i<count; i++)
    {
      foods.push({   x : getRandomInt(mapWidth),  y : getRandomInt(mapHeight) , color :  getRandomColor2() });
    }
  }
  FoodFrame(ctx,foods,player){
    foods.forEach(function(item, i, arr) {
      // if (player.showMap_X < item.x && player.showMap_X + screen.width > item.x ) {
      //   if (player.showMap_Y < item.y && player.showMap_Y + screen.height > item.y ) {
          ctx.beginPath();
          ctx.fillStyle = item.color;
          ctx.arc(item.x, item.y, 13 / player.scale , 0, Math.PI*2, false);
          ctx.closePath();
          ctx.fill();
      //   }
      // }
    });
  }
}
class Enemy extends GameObject {
  constructor(x,y,radius,color) {
    super(x,y,radius,color);
    this.rX = 0;
    this.rY = 0;
  }
  rand(){
    this.rX = getRandomInt(200);
    this.rY = getRandomInt(200);
  }

  move(){
      if(this.rX < 100){
        if(this.x <= screen.width)
          this.x++;
        else
          this.x--;
      }
      else{
        if(this.x >= 0)
          this.x--;
        else
        this.x++;
      }

    if(this.rY < 100){
      if(this.y <= screen.height)
        this.y++;
      else
        this.y--;
    }
    else{
      if(this.y >= 0)
        this.y--;
      else
        this.y++;
    }
  }
}


function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
function getmousemove(event) {
  player.setMouse_x = event.clientX;
  player.setMouse_y = event.clientY;
}
function getRandomColor2() {
  var colors = ['red','orange','green','blue','grey','brown','purple','yellow','pink']
  return colors[getRandomInt(9)];
}

var canvas = document.getElementById("camera");
var ctx = canvas.getContext("2d");
var player = new Player(getRandomInt(screen.width),getRandomInt(screen.height),30,'orange');
var enemy = new Enemy(getRandomInt(screen.width),getRandomInt(screen.height),30,'red')
var enemies = [];
var food = new Food();
var foods = food.spawnFood(1000);
var allPlayers = [];

var screenWidth = $(window).width();
var screenHeight = $(window).height();

enemies.push(new Enemy(getRandomInt(screen.width),getRandomInt(screen.height),30,getRandomColor2()));
enemies.push(new Enemy(getRandomInt(screen.width),getRandomInt(screen.height),30,getRandomColor2()));
enemies.push(player);


function spawn() {
    food.addFood(13,foods);
}
function enemyRand() {
  var length = enemies.length;
  for (var i = 0; i < length; i++) {
    if (enemies[i] != player) {
      enemies[i].rand();
    }
  }
}

function Frame() {
  ctx.clearRect(0, 0,screenWidth , screenHeight);

  food.FoodFrame(ctx,foods,player);
  var length = enemies.length;
  for (var i = 0; i < length; i++) {
    if (enemies[i] != player) {
      enemies[i].move();
      enemies[i].paint(ctx);
      enemies[i].eatFood(foods,player);
      enemies[i].eatEnemy(enemies);
    }

  }
  if (!end) {
    player.moveToCursor(foods,enemies);
    player.paint(ctx);
    player.eatEnemy(enemies);
    player.eatFood(foods,player);
  }
  else {
    alert("Game Over!");
    location.reload()
  }

}


setInterval(Frame,17);
setInterval(spawn,7000);
setInterval(enemyRand,3000);
