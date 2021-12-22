var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 100;

var dino = {
    x: 50,
    y: 200,
    width: 50,
    height: 50,
    draw(){
        ctx.fillStyle = 'green';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}


class Cactus {
    constructor(){
        this.x = 800;
        this.y = 200;
        this.width = 50;
        this.height = 50;
    }
    draw(){
        ctx.fillStyle = 'red';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

var timer = 0;
var jumpTimer = 0;
var cactusArray = [];
var isJumping = false;
var animation;

function doEveryFrame(){
    animation = requestAnimationFrame(doEveryFrame);
    timer++;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (timer % 200 == 0){
        var cactus = new Cactus();
        cactusArray.push(cactus);
    }

    cactusArray.forEach((a, i, o)=>{
        if (a.x < 0){
            o.splice(i, 1);
        }
        a.x-=3;

        checkCollision(dino, a);

        a.draw();
    })

    if (isJumping == true) {
        dino.y-=5;
        jumpTimer++;
    } else {
        if (dino.y < 200) {
            dino.y+=5;
        }
    }

    if (jumpTimer > 30){
        isJumping = false;
        jumpTimer = 0;
    }
    dino.draw();
}
doEveryFrame();

// Collision
function checkCollision(dino, cactus){
    var xDiff = cactus.x - (dino.x + dino.width);
    var yDiff = cactus.y - (dino.y + dino.height);
    if (xDiff < 0 && yDiff < 0){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        cancelAnimationFrame(animation);
    }
}

document.addEventListener('keydown', function(e){
    if (e.code == 'Space'){
        isJumping = true;
    }
})