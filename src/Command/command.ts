import { Ball } from "../Components/ball.js";
import { Brick } from "../Components/brick.js";
import { Paddle } from "../Components/paddle.js";
import {Sprite} from "../Observer/observer.js";
import { leftRight } from "../Components/paddle.js";
export interface Command{
    execute() : void;
    undo(): void;
}
export class MoveBallCommand implements Command{
    private x:number;
    private y:number;
    private vx:number;
    private vy:number;
    constructor(private readonly ball : Ball){
        this.x = this.ball.x;
        this.y = this.ball.y;
        this.vx = this.ball.vx;
        this.vy = this.ball.vy;
    }
    execute():void{
        console.log(this.ball.x+" "+this.ball.y);
        this.x = this.ball.x;
        this.y = this.ball.y;
        this.ball.draw();
    }
    undo():void{
        
        this.ball.x = this.x;
        this.ball.y = this.y;
        this.ball.draw();
    }
}
export class CommandList implements Command{
    constructor(){
        this.commands = [];
    }
    commands : Array<Command>;
    speed : number;
    execute(): void {
        setInterval(()=>this.commands.forEach(command=>command.execute()), this.speed);
    }
    undo(): void {
        this.commands.pop().execute();
    }
}
export class MovePaddle{
    private x:number;
    private y:number;
    private vx:number;
    constructor(private readonly paddle:Paddle){
        this.x = this.paddle.x;
        this.vx = this.paddle.vx;
    }
    execute():void{
        
        this.x = this.paddle.x;
        
    }
    undo():void{
        this.paddle.x = this.x;
        
    }
}
export class BlowBrickCommand{
    private blownBrick : Brick;
    constructor(private bricks:Array<Brick>, private readonly i:number){

    }

    execute():void{
        this.blownBrick = this.bricks[this.i];
        this.bricks.splice(this.i, 1);
        this.bricks.forEach(brick => brick.draw());
        
    }
    undo():void{
        
        this.bricks.splice(this.i, 0, this.blownBrick);
        this.bricks.forEach(brick => brick.draw());
    }
}