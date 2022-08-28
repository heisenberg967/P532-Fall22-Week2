interface Sprite{
    update():void;
}
interface Context{

}
class Observable{
    private sprites:Array<Sprite> = [];
    private intervalId:any;
    private speed = 80;
    changeState():void{
        
        this.sprites.forEach(spr => spr.update())
    }
    attach(sprite:Sprite){
    if(!this.sprites.some((e)=> e==sprite))
        this.sprites.push(sprite);
    }
    detach(sprite:Sprite){
        for(let i = 0; i < this.sprites.length; i++){
            if(this.sprites[i] == sprite){
                this.sprites.splice(this.sprites.indexOf(this.sprites[i]), 1);
            }
        }
    }
}

/*function draw(canvas: HTMLCanvasElement, ball : Ball, paddle : Paddle, bricks: Array<Brick>, 
    points:Points){
	let ball_vx = 3;
	let ball_vy = 3;
	let speed = 50;
	let vertical = "down";
	let horizontal = "right";
	let ctx : CanvasRenderingContext2D = canvas.getContext('2d');
	
	let intervalId = setInterval(()=>{
	function redraw(){
		
	    	ctx.clearRect(0, 0, canvas.width, canvas.height);
		
		drawBricks(ctx, bricks);
		paddle.draw(ctx);
		ball.draw(ctx);
		points.draw(ctx);
		
		if(vertical == "down")
			ball.y += ball_vy;
		else if(vertical == "up")
			ball.y -= ball_vy;
				
		if(horizontal == "left")
			ball.x -= ball_vx;
		else if(horizontal == "right")
			ball.x += ball_vx;
		// collisions
		// collision with paddle
		if(((ball.x + ball.radius/2) > paddle.x && ((ball.x-ball.radius/2) < (paddle.x+paddle.width)) 
			&& (ball.y + ball.radius/2 > paddle.y)))
		{
			console.log("collision");
			vertical ="up";
		}
		// collision with boundaries
		if(ball.x <= 0) horizontal = "right";
		if(ball.x >= canvas.width) horizontal = "left";
		if(ball.y <= 0) vertical = "down";
		if(ball.y >= canvas.height) status = "over";
		
		// collision with brick wall
		for(let i = 0; i< bricks.length;i++)
		{
			if(((ball.x+ball.radius) > bricks[i].left) && 
			    ((ball.x+ball.radius/2) < (bricks[i].left+bricks[i].width)) &&
			    (ball.y - ball.radius/2) < bricks[i].top)
			{
				bricks.splice(i, 1); 
				if(vertical == "down") vertical = "up";
				else vertical = "down";
				switch(bricks[i].color)
				{
				case "yellow":
					points.add(1);
					break;	
				case "green":
					points.add(3);
					break;
				case "orange":
					points.add(5);
					break;
				case "red":
					points.add(7);
					break;
				}
			}
			
		};
	}
	redraw();
	}, speed);
	return intervalId;
};
*/
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
function drawBorder(ctx : CanvasRenderingContext2D, xPos:number, yPos:number, width:number, height:number, thickness : number = 2){
	  ctx.fillStyle='#000';
	  ctx.fillRect(xPos - (thickness), yPos - (thickness), width + (thickness * 2), height + (thickness * 2));
}
class Brick {
	constructor(canvas:HTMLCanvasElement){
        this.color = 'yellow';
        this.left = 0;
        this.top = 0;
        this.width = 30;
        this.height = 10;
    }
    color: string;
	left : number;
	top : number;
	width :number;
	height : number;
}

class Paddle {
    constructor(canvas : HTMLCanvasElement)
    {
        this.canvas = canvas;
        this.x = canvas.width/2;
        this.y = canvas.height - (canvas.height/20);
        this.width = 80;
        this.height = 10;
    };
   canvas : HTMLCanvasElement;
   x : number;
   y : number;
   width : number;
   height : number; 
   moveLeft(x:number){
    if(this.x > 0)   
        this.x -= x;
   }
   moveRight(x:number){
    if((this.x + this.width) < this.canvas.width)
        this.x += x;
}
   draw(ctx: CanvasRenderingContext2D){
    
    ctx.fillStyle = 'black';
    ctx.fillRect(this.x, this.y, this.width, this.height);
   }
}
class Ball {
    constructor(canvas:HTMLCanvasElement){
        this.x =  canvas.width/2;
        this.y = canvas.height/2;
        this.radius = 10;
        this.color = 'blue';
    }
  x:number;
  y:number; 
  radius: number;
  color: string;
  draw(ctx:CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fillStyle = this.color;
    ctx.fill();
  }
};
class Points {
	constructor(canvas:HTMLCanvasElement){
        this.value = "0";
    };
    value : string;
	add(x : number){
		this.value =  (parseInt(this.value) + x).toString();
	};
	draw(ctx: CanvasRenderingContext2D){
		ctx.font = "30px Arial";
		ctx.fillText(this.value, 30, 30);
	}	
}
class Game implements Sprite{
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
		
		// collision with brick wall
		for(let i = 0; i< this.bricks.length;i++)
		{
			if (
                ((this.ball.x + this.ball.radius) >= this.bricks[i].left 
                    && (this.ball.x < this.bricks[i].left+this.bricks[i].width)
                    && this.ball.y <= (this.bricks[i].top + this.bricks[i].height)
                && (this.ball.y+this.ball.radius) >= this.bricks[i].top)
            // ||  (this.ball.x >= this.bricks[i].left && this.ball.y >= this.bricks[i].top)
            // ||  (this.ball.x <= (this.bricks[i].left+this.bricks[i].width) && this.ball.y <= (this.bricks[i].top + this.bricks[i].height))
            // ||  (this.ball.x <= (this.bricks[i].left+this.bricks[i].width) && this.ball.y >= this.bricks[i].top)
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
				}
			}
            break;
			
		};
	}
}
class Clock implements Sprite{
    constructor(canvas:HTMLCanvasElement){
        this.canvas = canvas;
        this.time = 0;
    };
    time : number;
    canvas : HTMLCanvasElement;
	// add(x : number){
	// 	this.value =  (parseInt(this.value) + x).toString();
	// };
	update(): void {
    this.time+=1;
    let secs = (this.time/10);
    
   
    let ctx: CanvasRenderingContext2D = this.canvas.getContext('2d');
    
    let h = Math.floor(secs / 3600);
    let m = Math.floor(secs % 3600 / 60);
    let s = Math.floor(secs % 3600 % 60);

    // let hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
    // let mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
    // let sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
    
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    ctx.font = "20px Arial";
	ctx.fillText(h+":"+m+":"+s, 0, this.canvas.height / 2);
	}
}

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
document.getElementById("restartGame").addEventListener('click', ()=>{
    obs.attach(game);
});
document.getElementById("pauseClock").addEventListener('click', ()=>{
    obs.detach(clock);
});
document.getElementById("restartClock").addEventListener('click', ()=>{
    obs.attach(clock);
});