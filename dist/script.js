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
  const prevPosX = posX;
  const prevPosY = posY;

  posX += deltaX;
  posY += deltaY;

  // 画面の端を超えないようにする
  posX = Math.max(Math.min(posX, canvas.width - fontSize / 2), fontSize / 2);
  posY = Math.max(Math.min(posY, canvas.height - fontSize / 2), fontSize / 2);

  const currentCharacter = trail === 'n' ? 'u' : 'n';
  
  // 現在の文字とtrailが同じ場合にのみ、過去の位置に文字を描画
  if (currentCharacter === trail) {
    drawCharacter(prevPosX, prevPosY, trail);
  }

  trail = currentCharacter;
  drawCharacter(posX, posY, currentCharacter);
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

function drawCharacter(x, y, character) {
  ctx.fillStyle = 'white';
  ctx.font = `${fontSize}px Arial`;

  // アウターグローの設定
  ctx.shadowBlur = 5; // グローの広がり
  ctx.shadowColor = 'white'; // グローの色
  ctx.shadowOffsetX = 0; // 横方向のオフセット
  ctx.shadowOffsetY = 0; // 縦方向のオフセット

  ctx.fillText(character, x - fontSize / 2, y + fontSize / 2);

  // アウターグローの設定をリセット
  ctx.shadowBlur = 0;
  ctx.shadowColor = 'transparent';
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;
}