import { leftRight } from "../Components/paddle.js";
export class MoveBallCommand {
    constructor(ball) {
        this.ball = ball;
        this.x = this.ball.x;
        this.y = this.ball.y;
        this.vx = this.ball.vx;
        this.vy = this.ball.vy;
    }
    execute() {
        this.x = this.ball.x;
        this.y = this.ball.y;
        this.ball.draw();
    }
    undo() {
        this.ball.x = this.x;
        this.ball.y = this.y;
        this.ball.draw();
    }
}
export class CommandList {
    constructor() {
        this.commands = [];
    }
    execute() {
        setInterval(() => this.commands.forEach(command => command.execute()), this.speed);
    }
    undo() {
        this.commands.pop().execute();
    }
}
export class MovePaddle {
    constructor(paddle, leftRightActon) {
        this.paddle = paddle;
        this.leftRightActon = leftRightActon;
        this.x = this.paddle.x;
        this.vx = this.paddle.vx;
    }
    execute() {
        console.log(this.leftRightActon);
        this.x = this.paddle.x;
        if (this.leftRightActon == leftRight.left) {
            this.paddle.x -= this.vx;
        }
        else if (this.leftRightActon == leftRight.right) {
            this.paddle.x += this.vx;
        }
        else { }
        this.paddle.update();
        this.paddle.draw();
    }
    undo() {
        this.paddle.x = this.x;
        this.paddle.draw();
    }
}
export class BlowBrickCommand {
    constructor(brick, ctx) {
        this.brick = brick;
        this.ctx = ctx;
    }
    execute() {
    }
    undo() {
    }
}
