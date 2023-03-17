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

  // 画面の端を超えないようにする
  posX = Math.max(Math.min(posX, canvas.width - fontSize / 2), fontSize / 2);
  posY = Math.max(Math.min(posY, canvas.height - fontSize / 2), fontSize / 2);

  trail = trail === 'n' ? 'u' : 'n';
  drawCharacter(posX, posY, 'u');
}

function handleDeviceOrientation(event) {
  const beta = event.beta / 90; // -1（下）〜1（上）
  const gamma = event.gamma / 90; // -1（左）〜1（右）

  moveCharacter(gamma * stepSize * 20, beta * stepSize * 20);
}

function handleKeyboardMove(e) {
  switch (e.code) {
    case 'ArrowUp':
      moveCharacter(0, -stepSize * 20);
      break;
    case 'ArrowDown':
      moveCharacter(0, stepSize * 20);
      break;
    case 'ArrowLeft':
      moveCharacter(-stepSize * 20, 0);
      break;
    case 'ArrowRight':
      moveCharacter(stepSize * 20, 0);
      break;
    default:
      return;
  }
}

drawCharacter(posX, posY, 'u');

// DeviceOrientationEventのイベントリスナー
window.addEventListener('deviceorientation', handleDeviceOrientation);

// キーボード操作のイベントリスナー
document.addEventListener('keydown', handleKeyboardMove);