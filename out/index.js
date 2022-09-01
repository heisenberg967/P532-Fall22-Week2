import { Game } from "./Observer/game_observer.js";
import { Clock } from "./Observer/clock_observer.js";
import { Observable, state } from "./Observable/observable.js";
import { Ball } from "./Components/ball.js";
var gameState = state.do;
function start() {
    gameState = state.do;
}
;
function pause() {
    gameState = state.pause;
}
function undo() {
    gameState = state.undo;
}
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
document.getElementById("start").addEventListener('click', () => {
    gameState = state.do;
});
document.getElementById("pause").addEventListener('click', () => {
    gameState = state.pause;
});
document.getElementById("undo").addEventListener('click', () => {
    gameState = state.undo;
});
document.getElementById("replay").addEventListener('click', () => {
    obs.attach(clock);
});
document.getElementById("undo").addEventListener('click', () => {
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
setInterval(() => obs.changeState(gameState), 100);
// 2nd method of changing state - when mouse is held down
gameCanvas.addEventListener('mouseover', (e) => obs.changeState(gameState));
