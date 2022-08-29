import { Game } from "./Observer/game_observer.js";
import { Clock } from "./Observer/clock_observer.js";
import { Observable } from "./Observable/observable.js";
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
let gameCanvas = document.getElementById('game-canvas');
let clockCanvas = document.getElementById('clock-canvas');
let game = new Game(gameCanvas);
let clock = new Clock(clockCanvas);
let obs = new Observable();
window.addEventListener('keydown', (e) => {
    switch (e.key) {
        case "d":
            game.paddle.moveRight(5);
            break;
        case "a":
            game.paddle.moveLeft(5);
            break;
        case "ArrowRight":
            game.paddle.moveRight(5);
            break;
        case "ArrowLeft":
            game.paddle.moveLeft(5);
            break;
    }
});
obs.attach(game);
obs.attach(clock);
// 1st method of changing state - time units
setInterval(() => obs.changeState(), 100);
// 2nd method of changing state - when mouse is held down
//gameCanvas.addEventListener('mouseover', (e:MouseEvent)=>obs.detach(game));
document.getElementById("pauseGame").addEventListener('click', () => {
    obs.detach(game);
});
document.getElementById("resumeGame").addEventListener('click', () => {
    obs.attach(game);
});
document.getElementById("pauseClock").addEventListener('click', () => {
    obs.detach(clock);
});
document.getElementById("resumeClock").addEventListener('click', () => {
    obs.attach(clock);
});
