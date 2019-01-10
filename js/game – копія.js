var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var player = {
  x : 100,
  y : 100,
  r : 50
}

var foods = [];

var x = 100;
var y = 100;

var mouse_x;
var mouse_y;
// ctx.beginPath();
// ctx.arc(player.x, player.y, player.r, 0, Math.PI*2, false);
// ctx.closePath();
// ctx.fill();

function spavnFood() {
  foods.push();
}


function getmousemove(event) {
  mouse_x = event.clientX;
  mouse_y = event.clientY;
}

function mouse_position() {
 ctx.clearRect(0, 0, 3820, 2160);

  if (player.x != mouse_x) {
    if (mouse_x > player.x)
      player.x++;
    else if(mouse_x < player.x)
      player.x--;
  }
  if (player.y != mouse_y) {
    if (mouse_y > player.y)
      player.y++;
    else if(mouse_y < player.y)
      player.y--;
  }

  ctx.beginPath();
  ctx.arc(player.x, player.y, player.r, 0, Math.PI*2, false);
  ctx.closePath();
  ctx.fill();


}


setInterval(mouse_position,17);
