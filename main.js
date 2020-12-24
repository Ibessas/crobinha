var max = 100;
var pont = document.getElementById("points");
var head = document.getElementById("headAt");
var food = document.getElementById("foodAt");
var velocidade = document.getElementById("velocidade");
var colParedes = document.getElementById("colisaoParedes");
var colCorpo = document.getElementById("colisaoCorpo");
var tamanho = document.getElementById("tamanho");

var c = document.getElementById("field");
var ctx = c.getContext("2d");
ctx.canvas.height = max;
ctx.canvas.width = max;
var alive = true;
var moved = false;

var foodx = 0;
var foody = 0;
var heading = "s";
var tail = [{ x: 20, y: 20 }];
var lastTail = {};
var tailColor = getTailColor();
var fColor = "black";
var sColor = "red";
var vazios = [];

ctx.fillStyle = "green";
ctx.fillRect(0, 0, max, max);

document.onkeypress = function ({ key }) {
  if (
    alive &&
    !moved &&
    (key === "w" || key === "a" || key === "s" || key === "d") &&
    ((key === "w" && heading != "s") ||
      (key === "s" && heading != "w") ||
      (key === "a" && heading != "d") ||
      (key === "d" && heading != "a"))
  ) {
    heading = key;
    // game();
    moved = true;
  }
};

setSize();
tamanho.onchange = setSize();
function setSize() {
  var calda = [];
  for (var i = 0; i < tamanho.valueAsNumber; i++) {
    calda.push({ x: 50, y: 50 });
  }
  tail = calda;
}

velocidade.onchange = () => {
  document.location.reload();
};

setInterval(() => {
  if (alive) game();
}, 500);

function getTailColor() {
  return `rgb(${Math.random() * 255},${Math.random() * 255},${
    Math.random() * 255
  })`;
}

function drawSnakeHead() {
  ctx.fillStyle = fColor;
  ctx.fillRect(tail[0].x, tail[0].y, 10, 10);
}

function drawSnakeBody() {
  ctx.fillStyle = "yellow";
  var tx = 0;
  var ty = 0;
  for (var i = 0; i < tail.length; i++) {
    ctx.fillRect(tail[i].x, tail[i].y, 10, 10);
  }
}

function walk() {
  switch (heading) {
    case "w":
      tail.push({ x: tail[0].x, y: tail[0].y - 10 });
      break;
    case "d":
      break;
    case "s":
      break;
    case "a":
      break;
  }

  if (tail[0].x === foodx && tail[0].y === foody) {
    tail.push(lastTail);
    generateFood();
    tailColor = getTailColor();
    fColor = getTailColor();
    sColor = getTailColor();
  }

  tail.splice(tail.length);
}

function getEspacosVazios() {
  vazios = [];
  for (let i = 0; i <= max - 10; i += 10) {
    for (let j = 0; j <= max - 10; j += 10) {
      console.log(isOcupado(i, j));
      if (!isOcupado(i, j)) vazios.push({ x: i, y: j });
    }
  }
}

function generateFood() {
  getEspacosVazios();
  const val = Math.abs((Math.random() * vazios.length - 1).toFixed(0));
  var pos = vazios[val];
  foodx = pos.x;
  foody = pos.y;

  ctx.fillStyle = "red";
  ctx.fillRect(foodx, foody, 10, 10);
}

function isOcupado(px, py) {
  return tail.find(
    (t) =>
      (t.x === px && t.y === py) ||
      (t.x === x && t.y === y) ||
      (px === foodx && py === foody) ||
      (px === lastTail.x && py === lastTail.y)
  );
}

function enviarPos() {
  var data = JSON.stringify({
    cabeca: { x, y },
    corpo: tail,
    comida: { x: foodx, y: foody },
  });
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "http://localhost:3000");
  xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
  xhr.send(data);
}

function game() {
  moved = false;

  if (tail.length < 50000) {
    ctx.fillStyle = "green";
    ctx.fillRect(0, 0, max, max);
    ctx.fillStyle = "red";
    ctx.fillRect(foodx, foody, 10, 10);
    walk();
    drawSnakeHead();
    drawSnakeBody();
  }
}
// ctx.arc(foodx + 5, foody + 5, 1, 0, 2 * Math.PI);
// ctx.stroke();
// //block
// ctx.fillStyle = "red";
// ctx.fillRect(490, 20, 10, 10);
// ctx.fillStyle = "white";
// ctx.fillRect(490, 20, 10, 0.9);
// ctx.fillRect(500, 20, 0.9, 5);
// ctx.fillRect(490, 20, 0.9, 5);
// ctx.fillRect(495, 20, 0.9, 5);
// ctx.fillRect(490, 24, 10, 2);
// ctx.fillRect(493, 25, 0.9, 4);
// ctx.fillRect(497, 25, 0.9, 4);
// ctx.fillRect(490, 29, 10, 0.9);
// //block
// ctx.fillStyle = "red";
// ctx.fillRect(490, 30, 10, 10);
// ctx.fillStyle = "white";
// ctx.fillRect(490, 30, 10, 0.9);
// ctx.fillRect(500, 30, 0.9, 5);
// ctx.fillRect(490, 30, 0.9, 5);
// ctx.fillRect(495, 30, 0.9, 5);
// ctx.fillRect(490, 34, 10, 2);
// ctx.fillRect(493, 35, 0.9, 4);
// ctx.fillRect(497, 35, 0.9, 4);
// ctx.fillRect(490, 39, 10, 0.9);
