import { Game } from "./Observer/game_observer.js";
import { Clock } from "./Observer/clock_observer.js";
import { Observable, state } from "./Observable/observable.js";
import { Ball } from "./Components/ball.js";
import { MoveCommand, MovePaddle } from "./Command/command.js";
import { leftRight } from "./Components/paddle.js";
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
    obs.detach(game);
    game = new Game(gameCanvas);
    obs.attach(game);
    intervalId = setInterval(() => {
        game.commands.push(new MoveCommand(game.ball));
        if (leftRightActions.length == 0)
            game.commands.push(new MovePaddle(game.paddle, leftRight.none, gameCanvas.getContext('2d')));
        else {
            game.commands.push(new MovePaddle(game.paddle, leftRightActions.pop(), gameCanvas.getContext('2d')));
        }
        obs.changeState(state.do);
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
        game.commands.push(new MoveCommand(game.ball));
        obs.changeState(state.do);
    }, 100);
});
document.getElementById("undo").addEventListener('click', () => {
    obs.changeState(state.undo);
});
document.getElementById("replay").addEventListener('click', () => {
    game.commands.forEach(command => {
        setTimeout(command.execute);
    });
});
let gameCanvas = document.getElementById('game-canvas');
let clockCanvas = document.getElementById('clock-canvas');
let game = new Game(gameCanvas);
let clock = new Clock(clockCanvas);
let ball = new Ball(gameCanvas);
let obs = new Observable();
obs.attach(game);
obs.attach(clock);
//obs.attach(ball);
// 1st method of changing state - time units
//setInterval(()=>obs.changeState(gameState), 100);
// 2nd method of changing state - when mouse is held down
//gameCanvas.addEventListener('mouseover', (e:MouseEvent)=>obs.changeState(gameState));
