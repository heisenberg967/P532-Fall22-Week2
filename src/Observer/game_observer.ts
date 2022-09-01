import {Ball} from "../Components/ball.js";
import {Paddle} from "../Components/paddle.js";
import {Brick} from "../Components/brick.js";
import {Points} from "../Components/points.js"
import {Sprite} from "observer";
import { MoveCommand } from "../Command/command.js";
import {state} from "../Observable/observable.js";

function computeBrickPositions(canvas:HTMLCanvasElement, left :number = 80, offset:number = 10, numRows :number = 8, numBricks:number = 25){
	let bricks  : Array<Brick>= [];
	let colors : string[] = ['red', 'red', 'orange', 'orange', 'green', 'green', 'yellow', 'yellow'];
	for(let j:number =0;j<numRows;j++)
		{
		let tmp_left = left;
            
		    for(let i=0;i<numBricks;i++)
			{
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
export class Game implements Sprite{
    constructor(canvas:HTMLCanvasElement){
        this.canvas = canvas;
        this.numBricks = 25;
        this.numRows = 8;
        let left : number = (this.canvas.width - (this.numBricks*((new Brick(this.canvas)).width)))/2;
        
        let offset : number = this.canvas.height / (this.numRows*3);
        this.paddle = new Paddle(this.canvas);
        this.ball = new Ball(this.canvas);
        this.bricks = computeBrickPositions(this.canvas, left, offset, this.numRows, this.numBricks);
        this.points = new Points(this.canvas);
		this.commands = [];
		
    };
	private drawBricks(ctx: CanvasRenderingContext2D):void{
		this.bricks.forEach((brick)=>brick.draw(ctx));
	}
	
    private canvas : HTMLCanvasElement;
    private numBricks : number;
    private numRows : number;
    private paddle: Paddle;
    private ball : Ball;
    private bricks : Array<Brick>;
    private points : Points;
	commands : Array<MoveCommand>;
    private gameState : state;

	private speed:number = 50;
    update(gameState: state):void {
			this.gameState = gameState;
			
			this.draw(this.canvas.getContext('2d'));
    }
    movePaddleLeft(amt:number){
        this.paddle.moveLeft(amt);
    }
    movePaddleRight(amt:number){
        this.paddle.moveRight(amt);
    }
    draw(ctx:CanvasRenderingContext2D){
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		this.drawBricks(ctx);
		this.paddle.update();
		this.points.update();
		
	if(this.gameState == state.do)
	{
		/** collisions*/
		/** collision with paddle*/ 
		if(((this.ball.x + this.ball.radius) > this.paddle.x 
		&& ((this.ball.x-this.ball.radius/2) < (this.paddle.x+this.paddle.width)) 
			&& (this.ball.y + this.ball.radius/2 > this.paddle.y)))
		{
           this.ball.vy = -this.ball.vy;
		}
	
		/** collision with boundaries*/
		if((this.ball.x - this.ball.radius<=0) || this.ball.x >= this.canvas.width)
			 this.ball.vx = -this.ball.vx;
		
		if((this.ball.y <= 0) || this.ball.y >= this.canvas.height) this.ball.vy = -this.ball.vy;
		
		
		/** collision with brick wall*/
		for(let i = 0; i< this.bricks.length;i++)
		{
            
            if(this.ball.x >= this.bricks[i].left 
                && (this.ball.x <= (this.bricks[i].left+this.bricks[i].width))
                && this.ball.y >= this.bricks[i].top
                && this.ball.y <= (this.bricks[i].top+this.bricks[i].height)
            )
            {
            	this.bricks.splice(i, 1); 
                console.log(this.ball.x + " "+this.ball.y+" "+this.bricks[i].top)
				
				this.ball.vy = -this.ball.vy;
				switch(this.bricks[i].color)
				{
				case "yellow":
					this.points.add(1);
					break;	
				case "green":
					this.points.add(3);
					break;
				case "orange":
					this.points.add(5);
					break;
				case "red":
					this.points.add(7);
					break;
                default:
                    this.points.add(1);
                    break;
				}
			}
           
			
		};
		this.commands.push(new MoveCommand(this.ball));
		this.commands[this.commands.length - 1].execute();
	}
	else if(this.gameState == state.undo){
		
		if(this.commands.length  > 0)
			this.commands.pop().undo();
		}
	

	}
}