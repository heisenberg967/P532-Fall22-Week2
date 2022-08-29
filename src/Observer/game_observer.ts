import {Ball} from "../Components/ball.js";
import {Paddle} from "../Components/paddle.js";
import {Brick} from "../Components/brick.js";
import {Points} from "../Components/points.js";

function drawBorder(ctx : CanvasRenderingContext2D, xPos:number, yPos:number, width:number, height:number, thickness : number = 2){
    ctx.fillStyle='#000';
    ctx.fillRect(xPos - (thickness), yPos - (thickness), width + (thickness * 2), height + (thickness * 2));
}

function drawBricks(ctx : CanvasRenderingContext2D, bricks : Array<Brick>){
	bricks.forEach((brick)=>
	{	
		drawBorder(ctx, brick.left, brick.top, brick.width, brick.height);
		ctx.fillStyle = brick.color;
                ctx.fillRect(brick.left, brick.top, brick.width, brick.height);
               }
           )
}

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
    };
    private canvas : HTMLCanvasElement;
    private numBricks : number;
    private numRows : number;
    paddle: Paddle;
    private ball : Ball;
    private bricks : Array<Brick>;
    private points : Points;
    private ball_vx:number = 3;
	private ball_vy:number = 3;
	private speed:number = 50;
	private vertical:string = "down";
	private horizontal:string = "right";
    update():void {
        
        this.draw(this.canvas.getContext('2d'));
    }
    draw(ctx:CanvasRenderingContext2D){
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		drawBricks(ctx, this.bricks);
		this.paddle.draw(ctx);
		this.ball.draw(ctx);
		this.points.draw(ctx);
		
		if(this.vertical == "down")
			this.ball.y += this.ball_vy;
		else if(this.vertical == "up")
			this.ball.y -= this.ball_vy;
				
		if(this.horizontal == "left")
			this.ball.x -= this.ball_vx;
		else if(this.horizontal == "right")
			this.ball.x += this.ball_vx;
		// collisions
		// collision with paddle
		if(((this.ball.x + this.ball.radius/2) > this.paddle.x && ((this.ball.x-this.ball.radius/2) < (this.paddle.x+this.paddle.width)) 
			&& (this.ball.y + this.ball.radius/2 > this.paddle.y)))
		{
            this.ball_vx *= (1+(Math.abs((this.paddle.x+this.paddle.width/2) - this.ball.x) / 
                            this.paddle.width));
			console.log("collision");
			this.vertical ="up";
		}
		// collision with boundaries
		if((this.ball.x - this.ball.radius)<= 0) this.horizontal = "right";
		if(this.ball.x >= this.canvas.width) this.horizontal = "left";
		if(this.ball.y <= 0) this.vertical = "down";
		if(this.ball.y >= this.canvas.height) status = "over";
		console.log(this.ball.x+","+this.ball.y +":")
		// collision with brick wall
		for(let i = 0; i< this.bricks.length;i++)
		{
            
            console.log(
                " "+this.bricks[i].left+" "+
            (this.bricks[i].left+this.bricks[i].width)+
            " "+this.bricks[i].top+" "+
            (this.bricks[i].top+this.bricks[i].height)
            )
            if(this.ball.x >= this.bricks[i].left 
                && (this.ball.x <= (this.bricks[i].left+this.bricks[i].width))
                && this.ball.y >= this.bricks[i].top
                && this.ball.y <= (this.bricks[i].top+this.bricks[i].height)
            // && (this.ball.y >= this.bricks[i].left 
            //     && this.ball.y <= (this.bricks[i].left+this.bricks[i].width)
            //     && this.ball.y >= this.bricks[i].top
            //     && this.ball.y <= (this.bricks[i].top+this.bricks[i].height))
            )
            {
            	this.bricks.splice(i, 1); 
                console.log(this.ball.x + " "+this.ball.y+" "+this.bricks[i].top)
				if(this.vertical == "down") this.vertical = "up";
				else this.vertical = "down";
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
	}
}