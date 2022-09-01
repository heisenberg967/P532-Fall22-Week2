import {Game} from "./Observer/game_observer.js"
import {Clock} from "./Observer/clock_observer.js"
import {Observable, state} from "./Observable/observable.js"
import { Ball } from "./Components/ball.js";

var gameState : state = state.do;
function start(){
    gameState = state.do;
};
function pause(){
    gameState = state.pause;
}
function undo(){
    gameState = state.undo;
}

window.addEventListener('keydown', (e)=>
{
    switch(e.key){
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

var intervalId : any;
document.getElementById("start").addEventListener('click', ()=>{
    intervalId = setInterval(()=> obs.changeState(state.do), 1000);
    
});
document.getElementById("pause").addEventListener('click', ()=>{
    clearInterval(intervalId);
});
document.getElementById("undo").addEventListener('click', ()=>{
    obs.changeState(state.undo);
});
document.getElementById("replay").addEventListener('click', ()=>{
    obs.attach(clock);
});
document.getElementById("undo").addEventListener('click', ()=>{
    
    
});
let gameCanvas : HTMLCanvasElement  = document.getElementById('game-canvas') as HTMLCanvasElement;
let clockCanvas : HTMLCanvasElement  = document.getElementById('clock-canvas') as HTMLCanvasElement;
let game: Game = new Game(gameCanvas);
let clock : Clock = new Clock(clockCanvas);
let ball : Ball = new Ball(gameCanvas);
let obs: Observable = new Observable();
obs.attach(game);
obs.attach(clock);
//obs.attach(ball);
// 1st method of changing state - time units
setInterval(()=>obs.changeState(gameState), 100);
// 2nd method of changing state - when mouse is held down
gameCanvas.addEventListener('mouseover', (e:MouseEvent)=>obs.changeState(gameState));
