import { Ball } from "../Components/ball.js";
import { Brick } from "../Components/brick.js";
import { Paddle } from "../Components/paddle.js";
import {Sprite} from "../Observer/observer.js";
import { leftRight } from "../Components/paddle.js";
import { Clock } from "../Observer/clock_observer.js";

// export enum commandTypes {
//     Ball,
//     Paddle,
//     Brick,
//     Clock
// }

export interface Command{
    execute() : void;
    undo(): void;
    
}


export class ClockTick implements Command{
    private time: number;
    
    constructor(private clock:Clock){
        this.time = 0;
    
    }
    execute():void{
        
        this.time = this.clock.time;
        this.clock.draw();
    }
    undo():void{
        this.clock.time = this.time;
        this.clock.draw();
    }

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

   
}
export class CommandList implements Command{
    constructor(private canvas:HTMLCanvasElement){
        this.commands = [];
        this.speed = 80;
    }
    
    commands : Array<Command>;
    speed : number;
    // replays the uploaded commands
    execute(): void {
        setInterval(()=>this.commands.forEach(command=>command.execute()), this.speed);
    }
    undo(): void {
        this.commands.forEach(cmd=>cmd.undo());
    }
}
export class MovePaddle{
    private x:number;
    private y:number;
    private vx:number;
    

    constructor(private paddle:Paddle){
        this.x = this.paddle.x;
        this.vx = this.paddle.vx;
        
    }
    execute():void{
        
        this.x = this.paddle.x;
        this.paddle.draw();
        
    }
    undo():void{
        this.paddle.x = this.x;
        this.paddle.draw();
    }

  
}
export class BlowBrickCommand{
    
    private savedBricks : Array<Brick>;
    private blownBrick:Brick;
    constructor(private bricks:Array<Brick>, private readonly brickBlownIndex:number){
        
        
    }
    // setNewBricks(bricks:Array<Brick>):void{
    //     this.newBricks = [];
    //     bricks.forEach(brick => this.newBricks.push(brick));
    //     console.log("num Bricks inside:");
    //     console.log(this.oldBricks.length);
    //     console.log(this.newBricks.length);
    // }
    execute():void{
        this.savedBricks = [...this.bricks];
        if(this.brickBlownIndex != -1){
            this.bricks.splice(this.brickBlownIndex, 1);
        }
        this.bricks.forEach(brick => brick.draw());
    }
    undo():void{
        
        this.savedBricks.forEach(brick => brick.draw());
    }

    
}