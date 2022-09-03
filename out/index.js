import { Clock } from "./Observer/clock_observer.js";
import { Observable } from "./Observable/observable.js";
import { Ball } from "./Components/ball.js";
import { MoveBallCommand, MovePaddle } from "./Command/command.js";
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
        obs.changeState(); // the ball and paddle positions get updated
        gameCanvas.getContext('2d').clearRect(0, 0, gameCanvas.width, gameCanvas.height);
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
function drawBricks(bricks) {
    bricks.forEach((brick) => brick.draw());
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
    drawBricks(bricks);
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
        //gameCanvas.getContext('2d').clearRect(0, 0, gameCanvas.width, gameCanvas.height);
        commands[i].execute();
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
drawBricks(bricks);
clock.update();
//obs.changeState(); // initial drawing
//obs.attach(ball);
// 1st method of changing state - time units
//setInterval(()=>obs.changeState(gameState), 100);
// 2nd method of changing state - when mouse is held down
//gameCanvas.addEventListener('mouseover', (e:MouseEvent)=>obs.changeState(gameState));
