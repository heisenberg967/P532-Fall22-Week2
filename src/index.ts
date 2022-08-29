import {Game} from "./Observer/game_observer.js"
import {Clock} from "./Observer/clock_observer.js"
import {Observable} from "./Observable/observable.js"

let gameCanvas : HTMLCanvasElement  = document.getElementById('game-canvas') as HTMLCanvasElement;
let clockCanvas : HTMLCanvasElement  = document.getElementById('clock-canvas') as HTMLCanvasElement;
let game: Game = new Game(gameCanvas);
let clock : Clock = new Clock(clockCanvas);
let obs: Observable = new Observable();

window.addEventListener('keydown', (e)=>
{
    
    switch(e.key){
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
setInterval(()=>obs.changeState(), 100);
// 2nd method of changing state - when mouse is held down
//gameCanvas.addEventListener('mouseover', (e:MouseEvent)=>obs.detach(game));
document.getElementById("pauseGame").addEventListener('click', ()=>{
    obs.detach(game);
});
document.getElementById("resumeGame").addEventListener('click', ()=>{
    obs.attach(game);
});
document.getElementById("pauseClock").addEventListener('click', ()=>{
    obs.detach(clock);
});
document.getElementById("resumeClock").addEventListener('click', ()=>{
    obs.attach(clock);
});