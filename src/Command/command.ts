import { Ball } from "../Components/ball.js";
import { Brick } from "../Components/brick.js";
import { Paddle } from "../Components/paddle.js";
import {Sprite} from "../Observer/observer.js";
interface Command{
    execute() : void;
    undo(): void;
}
export class MoveCommand implements Command{
    private x:number;
    private y:number;
    private vx:number;
    private vy:number;
    constructor(private readonly ball : Ball){
    }
    execute():void{
        this.x = this.ball.x;
        this.y = this.ball.y;
        this.vx = this.ball.vx;
        this.vy = this.ball.vy;
        this.ball.x += this.ball.vx;
        this.ball.y += this.ball.vy;
        this.ball.draw();
    }
    undo():void{
        
        this.ball.x = this.x;
        this.ball.y = this.y;
        this.ball.vx = this.vx;
        this.ball.vy = this.vy;
        console.log(this.ball.x+":"+this.ball.y+":"+this.ball.vx+":"+this.ball.vy);
        this.ball.draw();
    }
}


export class MovePaddleCommand{
    constructor(private readonly paddle:Paddle, private readonly ctx: CanvasRenderingContext2D){

    }
    execute():void{
        this.paddle.draw(this.ctx);
    }
    undo():void{

    }
}
export class BlowBrickCommand{
    constructor(private readonly brick:Brick, private readonly ctx: CanvasRenderingContext2D){

    }
    execute():void{

    }
    undo():void{

    }
}