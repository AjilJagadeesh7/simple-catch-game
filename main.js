var game = document.querySelector(".game");
var fruits = document.querySelector(".fruits");

var basket = document.querySelector(".basket");
var basketBottom = parseInt(
  window.getComputedStyle(basket).getPropertyValue("bottom")
);
var score = 0;
var basketPos;

dragElement(basket);
function dragElement(elmnt) {
  var pos1 = 0,
    pos3 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    pos3 = e.clientX;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    pos1 = pos3 - e.clientX;
    pos3 = e.clientX;
    if (elmnt.offsetLeft - pos1 > 0 && elmnt.offsetLeft - pos1 < 620) {
      basketPos = elmnt.offsetLeft - pos1;
      elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
    }
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

function generateFruits() {
  var fruitBottom = 470;
  var fruitLeft = Math.floor(Math.random() * 620);
  var fruit = document.createElement("div");
  fruit.setAttribute("class", "fruit");
  fruits.appendChild(fruit);
  function falldownFruit() {
    if (
      fruitBottom < basketBottom + 50 &&
      fruitBottom > basketBottom &&
      fruitLeft > basketPos - 30 &&
      fruitLeft < basketPos + 80
    ) {
      fruits.removeChild(fruit);
      clearInterval(fallInterval);
      score++;
    }
    if (fruitBottom < basketBottom) {
      alert("Game over, score = " + score);
      clearInterval(fallInterval);
      clearTimeout(fruitsTimeout);
      location.reload();
    }
    fruitBottom -= 5;
    fruit.style.bottom = fruitBottom + "px";
    fruit.style.left = fruitLeft + "px";
  }
  var fallInterval = setInterval(falldownFruit, 20);
  var fruitsTimeout = setTimeout(generateFruits, 2000);
}
generateFruits();
