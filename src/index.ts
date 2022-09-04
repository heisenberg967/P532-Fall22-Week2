import {Clock} from "./Observer/clock.js"
import {Observable, state} from "./Observable/observable.js"
import { Ball } from "./Observer/ball.js";
import { BlowBrickCommand, Command, MoveBallCommand, MovePaddle } from "./Command/command.js";
import {Paddle, leftRight} from "./Observer/paddle.js";
import { Brick } from "./Observer/brick.js";
import { commandTypes, ClockTick } from "./Command/command.js";


var intervalId : any;
var wait = (ms: number) => {
    const start = Date.now();
    let now = start;
    while (now - start < ms) {
      now = Date.now();
    }
}

function gameOver(){
    alert('Game over!');
    clearInterval(intervalId);
}

function collisionDetection() {
		/** collision with paddle*/ 
		if(((ball.x + ball.radius) > paddle.x 
		&& ((ball.x-ball.radius) < (paddle.x+paddle.width)) 
			&& (ball.y + ball.radius > paddle.y)))
		{
           ball.vy = -ball.vy;
		}
	
		/** collision with boundaries*/
		if((ball.x - ball.radius<=0) || (ball.x + ball.radius) >= gameCanvas.width)
			 ball.vx = -ball.vx;
		
		if((ball.y <= 0)) ball.vy = -ball.vy;

        if (ball.y >= gameCanvas.height){
            gameOver();
        }
		
		
		/** collision with brick wall*/
		for(let i = 0; i< bricks.length;i++)
		{
            
            if(ball.x >= bricks[i].left 
                && (ball.x <= (bricks[i].left+bricks[i].width))
                && ball.y >= bricks[i].top
                && ball.y <= (bricks[i].top+bricks[i].height)
            )
            {
                let blowBrick = new BlowBrickCommand(bricks, i);
                blowBrick.execute();  // draws the leftover bricks
            	commands.push(blowBrick); 
                blowBrick.getBricks().forEach(brick => brick.draw());
                //bricks.splice(i, 1);
                //console.log(ball.x + " "+ball.y+" "+bricks[i].top)
				
				ball.vy = -ball.vy;
			
                
				}
            // else{
            //     let blowBrick = new BlowBrickCommand(bricks, -1);
            //     blowBrick.execute();  // draws the leftover bricks
            // 	commands.push(blowBrick);
            // }
		}
}

function paddleMovements() {
    if(leftRightActions.length > 0){
        //console.log(leftRightActions);
        for (let c=0; c<leftRightActions.length; c++){
            if(leftRightActions[c]==leftRight.right && (paddle.x + paddle.width < gameCanvas.width))
            {
                // console.log('right cmd');
                paddle.x += paddle.vx;
            }
            else if(leftRightActions[c]==leftRight.left && (paddle.x >0)){
                // console.log('left cmd');
                paddle.x -= paddle.vx;
            }
            let paddleMove = new MovePaddle(paddle);
            paddleMove.execute();
            commands.push(paddleMove);
        }
        leftRightActions = [];
    }
}

function resume() {
    intervalId = setInterval(()=>{
        gameCanvas.getContext('2d').clearRect(0, 0, gameCanvas.width, gameCanvas.height);
        obs.changeState(); // the ball position gets updated and it's redrawn
        bricks.forEach(brick => brick.draw());
        
        // check for collisions
        collisionDetection();
        
        console.log('index ball x y')
        console.log(ball.x);
        console.log(ball.y);
        
        let move = new MoveBallCommand(ball);
        move.execute();
        commands.push(move);

        let ticker = new ClockTick(clock);
        ticker.execute();
        commands.push(ticker)

        paddleMovements();

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
            //console.log("move right");
            leftRightActions.push(leftRight.right);
    	    break;
    	case "ArrowLeft":
            //console.log("move left");
    	    leftRightActions.push(leftRight.left);
    	    break;
        }
});


document.getElementById("start").addEventListener('click', ()=>{
    clearInterval(intervalId);
    obs.detach(ball);
    obs.detach(paddle);
    obs.detach(clock)

    ball = new Ball(gameCanvas, gameCanvas.width/2, gameCanvas.height/2);
    paddle = new Paddle(gameCanvas, gameCanvas.width/2);
    clock = new Clock(clockCanvas);
    bricks = computeBrickPositions(gameCanvas);
    bricks.forEach(brick => brick.draw());
    obs.attach(clock)
    obs.attach(ball);
    obs.attach(paddle);
    resume();
   
    
});
document.getElementById("pause").addEventListener('click', ()=>{
    if (intervalId) {
        console.log("pause clicked");
        clearInterval(intervalId);
    }
    // console.log('in pause')
    // document.getElementById("pause").innerHTML = "Resume";
    // document.getElementById("pause").setAttribute("id", "resume");
});
document.getElementById("resume").addEventListener('click', ()=>{
    clearInterval(intervalId);
    // console.log('in resume');
    // document.getElementById("resume").innerHTML = "Pause";
    // document.getElementById("resume").setAttribute("id", "pause");
    resume();
});
document.getElementById("undo").addEventListener('click', ()=>{
    gameCanvas.getContext('2d').clearRect(0, 0, gameCanvas.width, gameCanvas.height);
    //paddle.draw();
    // let tempBall: Ball = Object.create(ball);
    // let tempBricks: Array<Brick> = Object.create(bricks);
    // let tempPaddle: Paddle = Object.create(paddle);
    // let tempClock: Clock = Object.create(clock);
    
    console.log('command type:');
    console.log(commands[commands.length-1].commandType);

    switch(commands[commands.length-1].commandType){
        case commandTypes.Ball:

            let ballCmd = commands[commands.length-1] as MoveBallCommand;
            // tempBall = ballCmd.getBall();

            // tempPaddle.draw();
            // tempBricks.forEach(brick => brick.draw());
            // tempClock.draw();
            ball = ballCmd.getBall();

            paddle.draw();
            bricks.forEach(brick => brick.draw());
            clock.draw();
            break;

        case commandTypes.Brick:
            let brickCmd = commands[commands.length-1] as BlowBrickCommand;
            // tempBricks = brickCmd.getBricks();

            // tempBall.draw();
            // tempPaddle.draw();
            // tempClock.draw();
            bricks = brickCmd.getBricks();

            ball.draw();
            paddle.draw();
            clock.draw();
            break;

        case commandTypes.Paddle:
            let paddleCmd = commands[commands.length-1] as MovePaddle;
            // tempPaddle = paddleCmd.getPaddle();
            // //console.log('temp x:');
            // //console.log(tempPaddle.x);

            // tempBall.draw();
            // tempBricks.forEach(brick => brick.draw());
            // tempClock.draw();

            paddle = paddleCmd.getPaddle();
            //console.log('temp x:');
            //console.log(tempPaddle.x);

            ball.draw();
            bricks.forEach(brick => brick.draw());
            clock.draw();
            break;

        case commandTypes.Clock:
            let clockCmd = commands[commands.length-1] as ClockTick;
            // tempClock = clockCmd.getTime();

            // tempBall.draw();
            // tempPaddle.draw();
            // tempBricks.forEach(brick => brick.draw());

            clock = clockCmd.getTime();

            ball.draw();
            paddle.draw();
            bricks.forEach(brick => brick.draw());
            break;
    }
    commands.pop().undo();
});
document.getElementById("replay").addEventListener('click', ()=>{
    // console.log('commands:');
    // console.log(commands);
    
    for(let i=0;i<commands.length;i++)
    {
        
        gameCanvas.getContext('2d').clearRect(0, 0, gameCanvas.width, gameCanvas.height);
        commands[i].execute();
        wait(1000);
    }
    
});

let gameCanvas : HTMLCanvasElement  = document.getElementById('game-canvas') as HTMLCanvasElement;
let clockCanvas : HTMLCanvasElement  = document.getElementById('clock-canvas') as HTMLCanvasElement;
let clock : Clock = new Clock(clockCanvas);

let ball : Ball = new Ball(gameCanvas, gameCanvas.width/2, gameCanvas.height/2);
let paddle : Paddle = new Paddle(gameCanvas, gameCanvas.width/2);

let bricks:Array<Brick> = computeBrickPositions(gameCanvas);
bricks.forEach(brick => brick.draw());


let commands: Array<Command> = [];
//let ballCommands : Array<Command> = [];
//let paddleCommands :Array<Command> = [];

let obs: Observable = new Observable();
ball.draw();
paddle.draw();
//let blowBrickCommands : Array<Command> = [];

clock.draw();
//obs.changeState(); // initial drawing


//obs.attach(ball);
// 1st method of changing state - time units
//setInterval(()=>obs.changeState(gameState), 100);
// 2nd method of changing state - when mouse is held down
//gameCanvas.addEventListener('mouseover', (e:MouseEvent)=>obs.changeState(gameState));
