import { Game } from "./Observer/game_observer.js";
import { Clock } from "./Observer/clock_observer.js";
import { Observable, state } from "./Observable/observable.js";
import { Ball } from "./Components/ball.js";
window.addEventListener('keydown', (e) => {
    switch (e.key) {
        case "d":
            game.movePaddleRight(5);
            break;
        case "a":
            game.movePaddleLeft(5);
            break;
        case "ArrowRight":
            game.movePaddleRight(5);
            break;
        case "ArrowLeft":
            game.movePaddleLeft(5);
            break;
    }
});
var intervalId;
document.getElementById("start").addEventListener('click', () => {
    obs.detach(game);
    game = new Game(gameCanvas);
    obs.attach(game);
    intervalId = setInterval(() => obs.changeState(state.do), 100);
});
document.getElementById("pause").addEventListener('click', () => {
    if (intervalId) {
        console.log("pause clicked");
        clearInterval(intervalId);
    }
});
document.getElementById("resume").addEventListener('click', () => {
    intervalId = setInterval(() => obs.changeState(state.do), 100);
});
document.getElementById("undo").addEventListener('click', () => {
    obs.changeState(state.undo);
});
document.getElementById("replay").addEventListener('click', () => {
    game.commands = game.commands.reverse();
    intervalId = setInterval(() => obs.changeState(state.do), 100);
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
