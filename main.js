var max = 500;
var pont = document.getElementById("points");
var head = document.getElementById("headAt");
var food = document.getElementById("foodAt");
var velocidade = document.getElementById("velocidade");
var colParedes = document.getElementById("colisaoParedes");
var colCorpo = document.getElementById("colisaoCorpo");
var tamanho = document.getElementById("tamanho");

var c = document.getElementById("field");
var ctx = c.getContext("2d");

var alive = true;
var moved = false;
var start = 20;
var x = start;
var y = start;

var foodx = 50;
var foody = 50;
var heading = "s";
var tail = [];
var lastTail = {};
var tailColor = getTailColor();
var fColor = "black";
var sColor = "red";

ctx.fillStyle = "green";
ctx.fillRect(0, 0, max, max);

document.onkeypress = function ({ key }) {
  if (
    !moved &&
    (key === "w" || key === "a" || key === "s" || key === "d") &&
    ((key === "w" && heading != "s") ||
      (key === "s" && heading != "w") ||
      (key === "a" && heading != "d") ||
      (key === "d" && heading != "a"))
  ) {
    heading = key;
    moved = true;
  }
};

setSize();
tamanho.onchange = setSize();
function setSize() {
  var calda = [];
  for (var i = 0; i < tamanho.valueAsNumber; i++) {
    calda.push({ x: start, y: start });
  }
  tail = calda;
}

velocidade.onchange = () => {
  document.location.reload();
};

setInterval(() => {
  if (alive) game();
}, velocidade.valueAsNumber);

function getTailColor() {
  return `rgb(${Math.random() * 255},${Math.random() * 255},${
    Math.random() * 255
  })`;
}

function drawSnakeHead() {
  ctx.fillStyle = fColor;
  ctx.fillRect(x, y, 10, 10);

  switch (heading) {
    case "s":
      ctx.fillStyle = "red";
      ctx.fillRect(x + 2, y + 7, 2, 2);
      ctx.fillRect(x + 6, y + 7, 2, 2);

      //Lingua
      if (y + 11 < max) {
        ctx.fillStyle = "red";
        ctx.fillRect(x + 4, y + 10, 1, 1);

        ctx.fillStyle = "red";
        ctx.fillRect(x + 4, y + 11, 2, 1);

        ctx.fillStyle = "red";
        ctx.fillRect(x + 5, y + 11, 1, 2);
      }
      break;
    case "d":
      ctx.fillStyle = "red";
      ctx.fillRect(x + 7, y + 2, 2, 2);

      ctx.fillStyle = "red";
      ctx.fillRect(x + 7, y + 6, 2, 2);

      //Lingua
      if (x + 11 < max) {
        ctx.fillStyle = "red";
        ctx.fillRect(x + 10, y + 4, 1, 1);

        ctx.fillStyle = "red";
        ctx.fillRect(x + 11, y + 4, 1, 2);

        ctx.fillStyle = "red";
        ctx.fillRect(x + 11, y + 5, 2, 1);
      }
      break;
    case "w":
      ctx.fillStyle = "red";
      ctx.fillRect(x + 2, y + 2, 2, 2);

      ctx.fillStyle = "red";
      ctx.fillRect(x + 6, y + 2, 2, 2);

      //Lingua
      ctx.fillStyle = "red";
      ctx.fillRect(x + 4, y - 2, 1, 2);

      ctx.fillStyle = "red";
      ctx.fillRect(x + 4, y - 3, 2, 1);

      ctx.fillStyle = "red";
      ctx.fillRect(x + 5, y - 4, 1, 2);
      break;
    case "a":
      ctx.fillStyle = "red";
      ctx.fillRect(x + 2, y + 2, 2, 2);

      ctx.fillStyle = "red";
      ctx.fillRect(x + 2, y + 6, 2, 2);

      //Lingua
      ctx.fillStyle = "red";
      ctx.fillRect(x - 2, y + 4, 2, 1);

      ctx.fillStyle = "red";
      ctx.fillRect(x - 2, y + 4, 1, 2);

      ctx.fillStyle = "red";
      ctx.fillRect(x - 4, y + 5, 2, 1);
      break;
  }
}

function drawSnakeBody() {
  var tx = 0;
  var ty = 0;
  for (var i = 0; i < tail.length; i++) {
    switch (heading) {
      case "w":
        ty = y + 10;
        tx = x;
        break;
      case "d":
        ty = y;
        tx = x - 10;
        break;
      case "s":
        ty = y - 10;
        tx = x;
        break;
      case "a":
        ty = y;
        tx = x + 10;
        break;
    }
    ctx.fillStyle = i % 2 === 0 ? fColor : sColor;
    if (i === 0) {
      lastTail = tail[i];
      tail[i] = { x: tx, y: ty };
      ctx.fillRect(tail[i].x, tail[i].y, 10, 10);
    } else if (i === 1) {
      lastTail = tail[i];
      tail[i] = { x: tx, y: ty };
      ctx.fillRect(lastTail.x, lastTail.y, 10, 10);
    } else {
      switch (heading) {
        case "w":
          ty = lastTail.y;
          tx = lastTail.x;
          break;
        case "d":
          ty = lastTail.y;
          tx = lastTail.x;
          break;
        case "s":
          ty = lastTail.y;
          tx = lastTail.x;
          break;
        case "a":
          ty = lastTail.y;
          tx = lastTail.x;
          break;
      }
      lastTail = tail[i];
      tail[i] = { x: tx, y: ty };
      ctx.fillRect(lastTail.x, lastTail.y, 10, 10);
    }
    if (
      ((tx === x && ty === y) || (tail[i].x === x && tail[i].y === y)) &&
      colCorpo.checked
    )
      alive = false;
  }
}

function walk() {
  if (colParedes.checked)
    switch (heading) {
      case "w":
        if (y - 10 >= 0) y -= 10;
        else alive = false;
        break;
      case "d":
        if (x + 10 < max) x += 10;
        else alive = false;
        break;
      case "s":
        if (y + 10 < max) y += 10;
        else alive = false;
        break;
      case "a":
        if (x - 10 >= 0) x -= 10;
        else alive = false;
        break;
    }
  else
    switch (heading) {
      case "w":
        if (y - 10 >= 0) y -= 10;
        else y = max - 10;
        break;
      case "d":
        if (x + 10 < max) x += 10;
        else x = 0;
        break;
      case "s":
        if (y + 10 < max) y += 10;
        else y = 0;
        break;
      case "a":
        if (x - 10 >= 0) x -= 10;
        else x = max - 10;
        break;
    }
  if (x === foodx && y === foody) {
    tail.push(lastTail);
    tailColor = getTailColor();
    generateFood();
    fColor = getTailColor();
    sColor = getTailColor();
  }
}

function generateFood() {
  var x = Math.random().toFixed(1) * max - 10;
  var y = Math.random().toFixed(1) * max - 10;
  foodx = x < 0 ? 0 : x;
  foody = y < 0 ? 0 : y;
}

function game() {
  moved = false;
  pont.innerHTML = tail.length;
  head.innerHTML = `{ x:${x}, y:${y} }`;
  food.innerHTML = `{ x:${foodx}, y:${foody} }`;

  if (tail.length < 50000) {
    ctx.fillStyle = "green";
    ctx.fillRect(0, 0, max, max);
    ctx.fillStyle = "red";
    ctx.fillRect(foodx, foody, 10, 10);

    // ctx.arc(foodx + 5, foody + 5, 1, 0, 2 * Math.PI);
    // ctx.stroke();
    walk();
    drawSnakeHead();
    drawSnakeBody();
  }
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
}
