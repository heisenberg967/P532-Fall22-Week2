import { Ball } from "../Components/ball.js";
import { Brick } from "../Components/brick.js";
import { Paddle } from "../Components/paddle.js";
import {Sprite} from "../Observer/observer.js";
import { leftRight } from "../Components/paddle.js";
import { Clock } from "../Observer/clock_observer.js";

export enum commandTypes {
    Ball,
    Paddle,
    Brick,
    Clock
}

export interface Command{
    execute() : void;
    undo(): void;
    commandType: commandTypes;
}


export class ClockTick implements Command{
    private time: number;
    commandType!: commandTypes;
    constructor(private clock:Clock){
        this.time = 0;
        this.commandType = commandTypes.Clock;
    }
    execute():void{
        
        this.time = this.clock.time;
        this.clock.draw();
    }
    undo():void{
        this.clock.time = this.time;
        this.clock.draw();
    }

    getTime(): Clock {
        return this.clock;
    }
}
export class MoveBallCommand implements Command{
    private x:number;
    private y:number;
    private vx:number;
    private vy:number;
    commandType!: commandTypes;

    constructor(private readonly ball : Ball){
        this.x = this.ball.x;
        this.y = this.ball.y;
        this.vx = this.ball.vx;
        this.vy = this.ball.vy;
        this.commandType = commandTypes.Ball;
    }
    execute():void{
        
        //console.log(this.ball.x+" "+this.ball.y);
        this.x = this.ball.x;
        this.y = this.ball.y;
        // console.log('moveballcmd execute');
        // console.log(this.x);
        this.ball.draw();
    }
    undo():void{
        
        this.ball.x = this.x;
        this.ball.y = this.y;
        this.ball.draw();
    }

    getBall(): Ball {
        return this.ball;
    }
}
export class CommandList implements Command{
    constructor(){
        this.commands = [];
    }
    commandType: commandTypes;
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
    commandType!: commandTypes;

    constructor(private paddle:Paddle){
        this.x = this.paddle.x;
        this.vx = this.paddle.vx;
        this.commandType = commandTypes.Paddle;
    }
    execute():void{
        
        this.x = this.paddle.x;
        this.paddle.draw();
        
    }
    undo():void{
        this.paddle.x = this.x;
        this.paddle.draw();
    }

    getPaddle(): Paddle {
        return this.paddle;
    }
}
export class BlowBrickCommand{
    private blownBrick : Brick;
    commandType!: commandTypes;

    constructor(private bricks:Array<Brick>, private readonly i:number){
        this.commandType = commandTypes.Brick;
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

    getBricks(): Array<Brick> {
        return this.bricks;
    }
}