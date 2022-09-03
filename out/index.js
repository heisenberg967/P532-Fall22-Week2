import { Clock } from "./Observer/clock_observer.js";
import { Observable } from "./Observable/observable.js";
import { Ball } from "./Components/ball.js";
import { BlowBrickCommand, MoveBallCommand, MovePaddle } from "./Command/command.js";
import { Paddle, leftRight } from "./Components/paddle.js";
import { Brick } from "./Components/brick.js";
var intervalId;
var wait = (ms) => {
    const start = Date.now();
    let now = start;
    while (now - start < ms) {
        now = Date.now();
    }
};
function resume() {
    intervalId = setInterval(() => {
        gameCanvas.getContext('2d').clearRect(0, 0, gameCanvas.width, gameCanvas.height);
        obs.changeState(); // the ball position gets updated and it's redrawn
        paddle.draw();
        bricks.forEach(brick => brick.draw());
        /** collisions*/
        /** collision with paddle*/
        if (((ball.x + ball.radius) > paddle.x
            && ((ball.x - ball.radius / 2) < (paddle.x + paddle.width))
            && (ball.y + ball.radius / 2 > paddle.y))) {
            ball.vy = -ball.vy;
        }
        /** collision with boundaries*/
        if ((ball.x - ball.radius <= 0) || ball.x >= gameCanvas.width)
            ball.vx = -ball.vx;
        if ((ball.y <= 0) || ball.y >= gameCanvas.height)
            ball.vy = -ball.vy;
        /** collision with brick wall*/
        for (let i = 0; i < bricks.length; i++) {
            if (ball.x >= bricks[i].left
                && (ball.x <= (bricks[i].left + bricks[i].width))
                && ball.y >= bricks[i].top
                && ball.y <= (bricks[i].top + bricks[i].height)) {
                let blowBrick = new BlowBrickCommand(bricks, i);
                blowBrick.execute(); // draws the leftover bricks
                commands.push(blowBrick);
                //bricks.splice(i, 1);
                console.log(ball.x + " " + ball.y + " " + bricks[i].top);
                ball.vy = -ball.vy;
            }
        }
        let move = new MoveBallCommand(new Ball(gameCanvas, ball.x, ball.y));
        move.execute();
        commands.push(move);
        if (leftRightActions.length > 0) {
            if (leftRightActions.pop() == leftRight.right) {
                paddle.x += paddle.vx;
            }
            else {
                paddle.x -= paddle.vx;
            }
        }
        let paddleMove = new MovePaddle(new Paddle(gameCanvas, paddle.x));
        paddleMove.execute();
        commands.push(paddleMove);
    }, 100);
}
function computeBrickPositions(canvas, left = 80, offset = 10, numRows = 8, numBricks = 25) {
    let bricks = [];
    let colors = ['red', 'red', 'orange', 'orange', 'green', 'green', 'yellow', 'yellow'];
    for (let j = 0; j < numRows; j++) {
        let tmp_left = left;
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
let leftRightActions = [];
window.addEventListener('keydown', (e) => {
    switch (e.key) {
        case "d":
            leftRightActions.push(leftRight.right);
            break;
        case "a":
            leftRightActions.push(leftRight.left);
            break;
        case "ArrowRight":
            console.log("move right");
            leftRightActions.push(leftRight.right);
            break;
        case "ArrowLeft":
            console.log("move left");
            leftRightActions.push(leftRight.left);
            break;
    }
});
document.getElementById("start").addEventListener('click', () => {
    clearInterval(intervalId);
    obs.detach(ball);
    obs.detach(paddle);
    ball = new Ball(gameCanvas, gameCanvas.width / 2, gameCanvas.height / 2);
    paddle = new Paddle(gameCanvas, gameCanvas.width / 2);
    bricks = computeBrickPositions(gameCanvas);
    bricks.forEach(brick => brick.draw());
    obs.attach(ball);
    obs.attach(paddle);
    resume();
});
document.getElementById("pause").addEventListener('click', () => {
    if (intervalId) {
        console.log("pause clicked");
        clearInterval(intervalId);
    }
});
document.getElementById("resume").addEventListener('click', () => {
    resume();
});
document.getElementById("undo").addEventListener('click', () => {
    commands.pop().undo();
});
document.getElementById("replay").addEventListener('click', () => {
    for (let i = 0; i < commands.length; i++) {
        gameCanvas.getContext('2d').clearRect(0, 0, gameCanvas.width, gameCanvas.height);
        commands[i].execute();
        bricks.forEach(brick => brick.draw());
        // paddleMove.execute(); 
    }
});
let gameCanvas = document.getElementById('game-canvas');
let clockCanvas = document.getElementById('clock-canvas');
let clock = new Clock(clockCanvas);
let ball = new Ball(gameCanvas, gameCanvas.width / 2, gameCanvas.height / 2);
let commands = [];
let paddle = new Paddle(gameCanvas, gameCanvas.width / 2);
let obs = new Observable();
ball.draw();
paddle.draw();
let bricks = computeBrickPositions(gameCanvas);
bricks.forEach(brick => brick.draw());
clock.update();
//obs.changeState(); // initial drawing
//obs.attach(ball);
// 1st method of changing state - time units
//setInterval(()=>obs.changeState(gameState), 100);
// 2nd method of changing state - when mouse is held down
//gameCanvas.addEventListener('mouseover', (e:MouseEvent)=>obs.changeState(gameState));
