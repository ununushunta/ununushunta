const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const fontSize = 20;
const stepSize = 1;

let posX = canvas.width / 2;
let posY = canvas.height / 2;

let trail = 'n';

function drawCharacter(x, y, character) {
  ctx.fillStyle = 'white';
  ctx.font = `${fontSize}px Arial`;
  ctx.fillText(character, x - fontSize / 2, y + fontSize / 2);
}

function moveCharacter(deltaX, deltaY) {
  ctx.clearRect(posX - fontSize / 2, posY - fontSize / 2, fontSize, fontSize);

  drawCharacter(posX, posY, trail);

  posX += deltaX;
  posY += deltaY;

  posX = Math.max(Math.min(posX, canvas.width - fontSize / 2), fontSize / 2);
  posY = Math.max(Math.min(posY, canvas.height - fontSize / 2), fontSize / 2);

  trail = trail === 'n' ? 'u' : 'n';
  drawCharacter(posX, posY, 'u');
}

function randomMove() {
  const directions = [
    [0, -stepSize * 20], // Up
    [0, stepSize * 20], // Down
    [-stepSize * 20, 0], // Left
    [stepSize * 20, 0], // Right
  ];

  const randomDirection = directions[Math.floor(Math.random() * directions.length)];
  moveCharacter(randomDirection[0], randomDirection[1]);
}

drawCharacter(posX, posY, 'u');

// 自動で文字を移動させる
setInterval(randomMove, 100);
