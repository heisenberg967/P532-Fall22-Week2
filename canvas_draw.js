
function draw(){
	ball_vx = 5;
	ball_vy = 5;
	speed = 80;
	vertical = "down";
	horizontal = "right";
	bricks = computeBrickPositions(ctx, left, offset, numRows, numBricks, brick.width, brick.height);
	setInterval(()=>{
	function redraw(){
		
	    	ctx.clearRect(0, 0, canvas.width, canvas.height);
		
		drawBricks(ctx, bricks);
		paddle.draw(ctx);
		ball.draw(ctx);
		
		
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
		if(ball.y >= canvas.height) horizontal = "up";
		// collision with brick wall
		for(i = 0; i< bricks.length;i++)
		{
			if((ball.x > bricks[i].left) && 
			    ((ball.x+ball.radius/2) < (bricks[i].left+bricks[i].width)) &&
			    (ball.y - ball.radius/2) < bricks[i].top)
			{
				bricks.splice(i, 1); 
				vertical = "down";
				break;	
			}
			
		};
	}
	window.requestAnimationFrame(redraw);
	}, speed);

};
function drawBricks(ctx, bricks){
	bricks.forEach((brick)=>
	{	
		drawBorder(ctx, brick.left, brick.top, brick.width, brick.height);
		ctx.fillStyle = brick.color;
                ctx.fillRect(brick.left, brick.top, brick.width, brick.height);
               }
           )
}

function computeBrickPositions(ctx, left = 80, offset = 10, numRows = 8, numBricks = 25, brickWidth = 30, brickHeight = 10){
	let bricks = [];
	colors = ['red', 'red', 'orange', 'orange', 'green', 'green', 'yellow', 'yellow'];
	for(j=0;j<numRows;j++)
		{
		let tmp_left = left;
		    for(i=0;i<numBricks;i++)
			{
			tmp_left = tmp_left+brickWidth;
			new_brick = Object.create(brick);
			new_brick.left = tmp_left;
			new_brick.top = offset;
			new_brick.width = brickWidth;
			new_brick.height = brickHeight;
			new_brick.color = colors[j];
			bricks.push(new_brick);
			}
		    
		    offset = offset+brickHeight+2;
		 }
	return bricks;
	}
function drawBorder(ctx, xPos, yPos, width, height, thickness = 2){
	  ctx.fillStyle='#000';
	  ctx.fillRect(xPos - (thickness), yPos - (thickness), width + (thickness * 2), height + (thickness * 2));
}

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let numBricks = 25;
let numRows = 8;
brick = {
	color: 'yellow',
	left : 0,
	top : 0,
	width :30,
	height : 10
}
left = (canvas.width - (numBricks*brick.width))/2;
offset = canvas.height / (numRows*3);
const paddle = {
   x : canvas.width/2,
   y : canvas.height - (canvas.height/20),
   width : 80,
   height : 10, 
   draw(ctx){
    ctx.fillStyle = 'black';
    ctx.fillRect(this.x, this.y, this.width, this.height);
   }
}
const ball = {
  x: canvas.width/2,
  y: canvas.height/2,
  radius: 10,
  color: 'blue',
  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fillStyle = this.color;
    ctx.fill();
  }
};
draw();
window.addEventListener('keydown', (e)=>
{
    console.log(e.key);
    switch(e.key){
    	case "ArrowRight": 
    	    paddle.x += 5;
    	    break;
    	case "ArrowLeft":
    	    paddle.x -= 5;
    	    break;
    	
    }
});
