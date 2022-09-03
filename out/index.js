import { Game } from "./Observer/game_observer.js";
import { Clock } from "./Observer/clock_observer.js";
import { Observable } from "./Observable/observable.js";
import { Ball } from "./Components/ball.js";
import { MoveBallCommand, MovePaddle } from "./Command/command.js";
import { Paddle, leftRight } from "./Components/paddle.js";
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
var intervalId;
document.getElementById("start").addEventListener('click', () => {
    clearInterval(intervalId);
    obs.detach(ball);
    obs.detach(paddle);
    ball = new Ball(gameCanvas, gameCanvas.width / 2, gameCanvas.height / 2);
    paddle = new Paddle(gameCanvas, gameCanvas.width / 2);
    obs.attach(ball);
    obs.attach(paddle);
    intervalId = setInterval(() => {
        obs.changeState(); // the ball and paddle positions get updated
        gameCanvas.getContext('2d').clearRect(0, 0, gameCanvas.width, gameCanvas.height);
        let move = new MoveBallCommand(new Ball(gameCanvas, ball.x, ball.y));
        let paddleMove = new MovePaddle(new Paddle(gameCanvas, paddle.x), leftRightActions.length > 0 ? leftRightActions.pop() : leftRight.none);
        move.execute();
        paddleMove.execute();
        ballCommands.push(move);
        paddleCommands.push(paddleMove);
    }, 100);
});
document.getElementById("pause").addEventListener('click', () => {
    if (intervalId) {
        console.log("pause clicked");
        clearInterval(intervalId);
    }
});
document.getElementById("resume").addEventListener('click', () => {
    intervalId = setInterval(() => {
        game.commands.push(new MoveBallCommand(game.ball));
        obs.changeState();
    }, 100);
});
document.getElementById("undo").addEventListener('click', () => {
    gameCanvas.getContext('2d').clearRect(0, 0, gameCanvas.width, gameCanvas.height);
    ballCommands.pop().undo();
    paddleCommands.pop().undo();
});
document.getElementById("replay").addEventListener('click', () => {
    for (let i = 0; i < ballCommands.length; i++) {
        let ballMove = Object.create(ballCommands[i]);
        let paddleMove = Object.create(paddleCommands[i]);
        setTimeout(() => {
            gameCanvas.getContext('2d').clearRect(0, 0, gameCanvas.width, gameCanvas.height);
            ballMove.execute();
            paddleMove.execute();
        }, 100);
    }
});
let gameCanvas = document.getElementById('game-canvas');
let clockCanvas = document.getElementById('clock-canvas');
let game = new Game(gameCanvas);
let clock = new Clock(clockCanvas);
let ball = new Ball(gameCanvas, gameCanvas.width / 2, gameCanvas.height / 2);
let ballCommands = [];
let paddle = new Paddle(gameCanvas, gameCanvas.width / 2);
let paddleCommands = [];
let obs = new Observable();
ball.draw();
paddle.draw();
clock.update();
//obs.changeState(); // initial drawing
//obs.attach(ball);
// 1st method of changing state - time units
//setInterval(()=>obs.changeState(gameState), 100);
// 2nd method of changing state - when mouse is held down
//gameCanvas.addEventListener('mouseover', (e:MouseEvent)=>obs.changeState(gameState));
