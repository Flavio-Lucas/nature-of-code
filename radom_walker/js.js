let canvas = document.querySelector('#myGame')
let ctx = canvas.getContext('2d')

class RandWalker {
  constructor() {
    this.x = canvas.width / 2;
    this.y = canvas.height / 2;
  }

  display() {
    ctx.beginPath();
    ctx.rect(this.x, this.y, 10, 10);
    ctx.strokeStyle = "red";
    ctx.lineWidth = 1;
    ctx.stroke();
    
    ctx.fill();
  }

  choice() {
    return Math.ceil(Math.random() * 3) - 2;
  }
}

var a = new RandWalker();

function loop(){
  a.display();
  var choiceX = a.choice();
  var choiceY = a.choice();

  a.x += choiceX * 10;
  a.y += choiceY * 10;

}
setInterval(() => {
  loop()
}, 1000/60);
