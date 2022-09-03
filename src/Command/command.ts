import { Ball } from "../Components/ball.js";
import { Brick } from "../Components/brick.js";
import { Paddle } from "../Components/paddle.js";
import {Sprite} from "../Observer/observer.js";
export interface Command{
    execute() : void;
    undo(): void;
}
export class MoveCommand implements Command{
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
    constructor(private readonly paddle:Paddle, private readonly leftRight:number = 0, 
        private readonly ctx: CanvasRenderingContext2D){
        this.x = this.paddle.x;
        this.y = this.paddle.y;
        this.vx = this.paddle.vx;
    }
    execute():void{
        this.x = this.paddle.x;
        this.y = this.paddle.y;
        if(this.leftRight == 0){
            this.paddle.x -= this.vx;
        }
        else if(this.leftRight == 1){
            this.paddle.x += this.vx;
        }
        else {}
        this.paddle.draw();
    }
    undo():void{
        this.paddle.x = this.x;
        this.paddle.draw();
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