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
    constructor(private readonly paddle:Paddle, private readonly leftRightActon : leftRight){
        this.x = this.paddle.x;
        this.vx = this.paddle.vx;
    }
    execute():void{
        console.log(this.leftRightActon);
        this.x = this.paddle.x;
        if(this.leftRightActon == leftRight.left){
            this.paddle.x -= this.vx;
        }
        else if(this.leftRightActon == leftRight.right){
            this.paddle.x += this.vx;
        }
        else{}
        this.paddle.update();
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