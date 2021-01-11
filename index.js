var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
let screenWidth, screenHeight;

class Particle {
  constructor(color) {
    this.x = Math.random() * 1200;
    this.y = Math.random() * 400;
    this.color = color;
    this.xVel = 4;
    this.yVel = 4;
  }

  drawParticle() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, 10, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
  }

  moveParticle() {
    this.x += this.xVel;
    this.y += this.yVel;
  }

  wallCollision() {
    if (this.x + this.xVel + 10 > canvas.width || this.x + this.xVel - 10 < 0) {
      this.xVel *= -1;
    }
    if (
      this.y + this.yVel + 10 > canvas.height ||
      this.y + this.yVel - 10 < 0
    ) {
      this.y + 10;
      this.yVel *= -1;
    }
  }
}

function randomColor() {
  const newColor = "#" + (((1 << 24) * Math.random()) | 0).toString(16);
  return newColor;
}

const particleList = [];

for (let i = 0; i < 10; i++) {
  particleList[i] = new Particle(randomColor());
}

function detectCollision(particleA, particleB) {
  if (
    Math.sqrt(
      (particleA.x - particleB.x) ** 2 + (particleA.y - particleB.y) ** 2
    ) <= 20
  ) {
    if (particleA.xVel === particleB.xVel * -1) {
      particleA.xVel *= -1;
      particleB.xVel *= -1;
    } else if (particleA.xVel === particleB.xVel) {
      particleA.yVel *= -1;
      particleB.yVel *= -1;
    }
  }
}

function detectCollisions() {
  for (let i = 0; i < particleList.length; i++) {
    for (let j = i + 1; j < particleList.length; j++) {
      detectCollision(particleList[i], particleList[j]);
    }
  }
}

function calculateSize() {
  screenWidth = window.innerWidth;
  screenHeight = window.innerHeight;
  canvas.width = screenWidth;
  canvas.height = screenHeight;
}

function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let particle of particleList) {
    particle.drawParticle();
    particle.moveParticle();
    particle.wallCollision();
  }
  detectCollisions();
  window.requestAnimationFrame(render);
}

render();

window.onload = calculateSize;
window.onresize = calculateSize;
