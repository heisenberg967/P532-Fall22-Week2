"use strict";
class Observable {
    constructor() {
        this.sprites = [];
        this.speed = 80;
    }
    loop() {
        setInterval(() => this.sprites.forEach(spr => spr.update()), this.speed);
    }
    attach(sprite) {
        this.sprites.push(sprite);
    }
    detach(sprite) {
        for (let i = 0; i < this.sprites.length; i++) {
            if (this.sprites[i] == sprite) {
                this.sprites.splice(this.sprites.indexOf(this.sprites[i]), 1);
            }
        }
    }
}
/*function draw(canvas: HTMLCanvasElement, ball : Ball, paddle : Paddle, bricks: Array<Brick>,
    points:Points){
    let ball_vx = 3;
    let ball_vy = 3;
    let speed = 50;
    let vertical = "down";
    let horizontal = "right";
    let ctx : CanvasRenderingContext2D = canvas.getContext('2d');
    
    let intervalId = setInterval(()=>{
    function redraw(){
        
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        drawBricks(ctx, bricks);
        paddle.draw(ctx);
        ball.draw(ctx);
        points.draw(ctx);
        
        if(vertical == "down")
            ball.y += ball_vy;
        else if(vertical == "up")
            ball.y -= ball_vy;
                
        if(horizontal == "left")
            ball.x -= ball_vx;
        else if(horizontal == "right")
            ball.x += ball_vx;
        // collisions
        // collision with paddle
        if(((ball.x + ball.radius/2) > paddle.x && ((ball.x-ball.radius/2) < (paddle.x+paddle.width))
            && (ball.y + ball.radius/2 > paddle.y)))
        {
            console.log("collision");
            vertical ="up";
        }
        // collision with boundaries
        if(ball.x <= 0) horizontal = "right";
        if(ball.x >= canvas.width) horizontal = "left";
        if(ball.y <= 0) vertical = "down";
        if(ball.y >= canvas.height) status = "over";
        
        // collision with brick wall
        for(let i = 0; i< bricks.length;i++)
        {
            if(((ball.x+ball.radius) > bricks[i].left) &&
                ((ball.x+ball.radius/2) < (bricks[i].left+bricks[i].width)) &&
                (ball.y - ball.radius/2) < bricks[i].top)
            {
                bricks.splice(i, 1);
                if(vertical == "down") vertical = "up";
                else vertical = "down";
                switch(bricks[i].color)
                {
                case "yellow":
                    points.add(1);
                    break;
                case "green":
                    points.add(3);
                    break;
                case "orange":
                    points.add(5);
                    break;
                case "red":
                    points.add(7);
                    break;
                }
            }
            
        };
    }
    redraw();
    }, speed);
    return intervalId;
};
*/
function drawBricks(ctx, bricks) {
    bricks.forEach((brick) => {
        drawBorder(ctx, brick.left, brick.top, brick.width, brick.height);
        ctx.fillStyle = brick.color;
        ctx.fillRect(brick.left, brick.top, brick.width, brick.height);
    });
}
function computeBrickPositions(canvas, left = 80, offset = 10, numRows = 8, numBricks = 25) {
    let bricks = [];
    let colors = ['red', 'red', 'orange', 'orange', 'green', 'green', 'yellow', 'yellow'];
    for (let j = 0; j < numRows; j++) {
        let tmp_left = left;
        console.log(tmp_left);
        for (let i = 0; i < numBricks; i++) {
            let new_brick = new Brick(canvas);
            tmp_left = tmp_left + new_brick.width;
            new_brick.left = tmp_left;
            new_brick.top = offset;
            new_brick.color = colors[j];
            bricks.push(new_brick);
        }
        let tmp_brick = new Brick(canvas);
        offset = offset + tmp_brick.height + 2;
    }
    return bricks;
}
function drawBorder(ctx, xPos, yPos, width, height, thickness = 2) {
    ctx.fillStyle = '#000';
    ctx.fillRect(xPos - (thickness), yPos - (thickness), width + (thickness * 2), height + (thickness * 2));
}
class Brick {
    constructor(canvas) {
        this.color = 'yellow';
        this.left = 0;
        this.top = 0;
        this.width = 30;
        this.height = 10;
    }
}
class Paddle {
    constructor(canvas) {
        this.x = canvas.width / 2;
        this.y = canvas.height - (canvas.height / 20);
        this.width = 80;
        this.height = 10;
    }
    ;
    draw(ctx) {
        ctx.fillStyle = 'black';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}
class Ball {
    constructor(canvas) {
        this.x = canvas.width / 2;
        this.y = canvas.height / 2;
        this.radius = 10;
        this.color = 'blue';
    }
    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}
;
class Points {
    constructor(canvas) {
        this.value = "0";
    }
    ;
    add(x) {
        this.value = (parseInt(this.value) + x).toString();
    }
    ;
    draw(ctx) {
        ctx.font = "30px Arial";
        ctx.fillText(this.value, 30, 30);
    }
}
class Game {
    constructor(canvas) {
        this.ball_vx = 3;
        this.ball_vy = 3;
        this.speed = 50;
        this.vertical = "down";
        this.horizontal = "right";
        this.canvas = canvas;
        this.numBricks = 25;
        this.numRows = 8;
        let left = (this.canvas.width - (this.numBricks * ((new Brick(this.canvas)).width))) / 2;
        console.log(left);
        let offset = this.canvas.height / (this.numRows * 3);
        this.paddle = new Paddle(this.canvas);
        this.ball = new Ball(this.canvas);
        this.bricks = computeBrickPositions(this.canvas, left, offset, this.numRows, this.numBricks);
        this.points = new Points(this.canvas);
    }
    ;
    update() {
        this.draw(this.canvas.getContext('2d'));
    }
    draw(ctx) {
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        drawBricks(ctx, this.bricks);
        this.paddle.draw(ctx);
        this.ball.draw(ctx);
        this.points.draw(ctx);
        if (this.vertical == "down")
            this.ball.y += this.ball_vy;
        else if (this.vertical == "up")
            this.ball.y -= this.ball_vy;
        if (this.horizontal == "left")
            this.ball.x -= this.ball_vx;
        else if (this.horizontal == "right")
            this.ball.x += this.ball_vx;
        // collisions
        // collision with paddle
        if (((this.ball.x + this.ball.radius / 2) > this.paddle.x && ((this.ball.x - this.ball.radius / 2) < (this.paddle.x + this.paddle.width))
            && (this.ball.y + this.ball.radius / 2 > this.paddle.y))) {
            console.log("collision");
            this.vertical = "up";
        }
        // collision with boundaries
        if (this.ball.x <= 0)
            this.horizontal = "right";
        if (this.ball.x >= this.canvas.width)
            this.horizontal = "left";
        if (this.ball.y <= 0)
            this.vertical = "down";
        if (this.ball.y >= this.canvas.height)
            status = "over";
        // collision with brick wall
        for (let i = 0; i < this.bricks.length; i++) {
            if (((this.ball.x + this.ball.radius) > this.bricks[i].left) &&
                ((this.ball.x + this.ball.radius / 2) < (this.bricks[i].left + this.bricks[i].width)) &&
                (this.ball.y - this.ball.radius / 2) < this.bricks[i].top) {
                this.bricks.splice(i, 1);
                if (this.vertical == "down")
                    this.vertical = "up";
                else
                    this.vertical = "down";
                switch (this.bricks[i].color) {
                    case "yellow":
                        this.points.add(1);
                        break;
                    case "green":
                        this.points.add(3);
                        break;
                    case "orange":
                        this.points.add(5);
                        break;
                    case "red":
                        this.points.add(7);
                        break;
                }
            }
        }
        ;
    }
}
let game;
let obs;
let canvas = document.getElementById('game-canvas');
//draw(canvas, ball, paddle, bricks, points);
game = new Game(canvas);
obs = new Observable();
window.addEventListener('keydown', (e) => {
    console.log(e.key);
    switch (e.key) {
        case "d":
            game.paddle.x += 5;
            break;
        case "a":
            game.paddle.x -= 5;
            break;
        case "ArrowRight":
            game.paddle.x += 5;
            break;
        case "ArrowLeft":
            game.paddle.x -= 5;
            break;
    }
});
obs.attach(game);
obs.loop();
