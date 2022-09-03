import {Game} from "./Observer/game_observer.js"
import {Clock} from "./Observer/clock_observer.js"
import {Observable, state} from "./Observable/observable.js"
import { Ball } from "./Components/ball.js";
import { Command, MoveBallCommand, MovePaddle } from "./Command/command.js";
import {Paddle, leftRight} from "./Components/paddle.js";
import { Brick } from "./Components/brick.js";

var intervalId : any;
var wait = (ms: number) => {
    const start = Date.now();
    let now = start;
    while (now - start < ms) {
      now = Date.now();
    }
}
function resume() {
    intervalId = setInterval(()=>{
        obs.changeState(); // the ball and paddle positions get updated
        gameCanvas.getContext('2d').clearRect(0, 0, gameCanvas.width, gameCanvas.height);
        let move = new MoveBallCommand(new Ball(gameCanvas, ball.x, ball.y));
        move.execute();
        commands.push(move);
        	/** collisions*/
		/** collision with paddle*/ 
		if(((ball.x + ball.radius) > paddle.x 
		&& ((ball.x-ball.radius/2) < (paddle.x+paddle.width)) 
			&& (ball.y + ball.radius/2 > paddle.y)))
		{
           ball.vy = -ball.vy;
		}
	
		/** collision with boundaries*/
		if((ball.x - ball.radius<=0) || ball.x >= gameCanvas.width)
			 ball.vx = -ball.vx;
		
		if((ball.y <= 0) || ball.y >= gameCanvas.height) ball.vy = -ball.vy;
		
		
		/** collision with brick wall*/
		for(let i = 0; i< bricks.length;i++)
		{
            
            if(ball.x >= this.bricks[i].left 
                && (this.ball.x <= (this.bricks[i].left+this.bricks[i].width))
                && this.ball.y >= this.bricks[i].top
                && this.ball.y <= (this.bricks[i].top+this.bricks[i].height)
            )
            {
            	this.bricks.splice(i, 1); 
                console.log(this.ball.x + " "+this.ball.y+" "+this.bricks[i].top)
				
				this.ball.vy = -this.ball.vy;
			
                default:
                    
                    break;
				}
			}
           
			
		};

        if(leftRightActions.length > 0){
            if(leftRightActions.pop()==leftRight.right){
                paddle.x += paddle.vx;
            }
            else{
                paddle.x -= paddle.vx;
            }
                
        }
        let paddleMove = new MovePaddle(new Paddle(gameCanvas,paddle.x));
        paddleMove.execute();
        commands.push(paddleMove);
    }, 100);
}
function computeBrickPositions(canvas:HTMLCanvasElement,
    left :number = 80, offset:number = 10,
     numRows :number = 8,
      numBricks:number = 25) :Array<Brick>{
   let bricks  : Array<Brick>= [];
   let colors : string[] = ['red', 'red', 'orange', 'orange', 'green', 'green', 'yellow', 'yellow'];
   for(let j:number =0;j<numRows;j++){
       let tmp_left = left;
       for(let i=0;i<numBricks;i++){
           let new_brick : Brick = new Brick(canvas);
           tmp_left = tmp_left+new_brick.width;
           
           new_brick.left = tmp_left;
           new_brick.top = offset;
           new_brick.color = colors[j];
           bricks.push(new_brick);
           }
           let tmp_brick = new Brick(canvas);
           offset = offset+tmp_brick.height+2;
       }
   return bricks;
   }
function drawBricks(bricks : Array<Brick>):void{
    bricks.forEach((brick)=>brick.draw());
}
let leftRightActions:Array<leftRight> = [];
window.addEventListener('keydown', (e)=>
{
    switch(e.key){
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


document.getElementById("start").addEventListener('click', ()=>{
    clearInterval(intervalId);
    obs.detach(ball);
    obs.detach(paddle);
    ball = new Ball(gameCanvas, gameCanvas.width/2, gameCanvas.height/2);
    paddle = new Paddle(gameCanvas, gameCanvas.width/2);
    bricks = computeBrickPositions(gameCanvas);
    drawBricks(bricks);
    
    obs.attach(ball);
    obs.attach(paddle);
    resume();
   
    
});
document.getElementById("pause").addEventListener('click', ()=>{
    if (intervalId) {
        console.log("pause clicked");
        clearInterval(intervalId);
    }
});
document.getElementById("resume").addEventListener('click', ()=>{
   resume();
});
document.getElementById("undo").addEventListener('click', ()=>{
    
    commands.pop().undo();
});
document.getElementById("replay").addEventListener('click', ()=>{
    
    for(let i=0;i<commands.length;i++)
    {
        
        //gameCanvas.getContext('2d').clearRect(0, 0, gameCanvas.width, gameCanvas.height);
        commands[i].execute();
        // paddleMove.execute(); 
        
    }
    
});

let gameCanvas : HTMLCanvasElement  = document.getElementById('game-canvas') as HTMLCanvasElement;
let clockCanvas : HTMLCanvasElement  = document.getElementById('clock-canvas') as HTMLCanvasElement;
let clock : Clock = new Clock(clockCanvas);

let ball : Ball = new Ball(gameCanvas, gameCanvas.width/2, gameCanvas.height/2);
let commands : Array<Command> = [];
let paddle : Paddle = new Paddle(gameCanvas, gameCanvas.width/2);

let obs: Observable = new Observable();
ball.draw();
paddle.draw();


let bricks:Array<Brick> = computeBrickPositions(gameCanvas);
drawBricks(bricks);

clock.update();
//obs.changeState(); // initial drawing


//obs.attach(ball);
// 1st method of changing state - time units
//setInterval(()=>obs.changeState(gameState), 100);
// 2nd method of changing state - when mouse is held down
//gameCanvas.addEventListener('mouseover', (e:MouseEvent)=>obs.changeState(gameState));
