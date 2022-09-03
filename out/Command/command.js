export class MoveCommand {
    constructor(ball) {
        this.ball = ball;
        this.x = this.ball.x;
        this.y = this.ball.y;
        this.vx = this.ball.vx;
        this.vy = this.ball.vy;
    }
    execute() {
        this.ball.x += this.ball.vx;
        this.ball.y += this.ball.vy;
        this.ball.draw();
    }
    undo() {
        this.ball.x = this.x;
        this.ball.y = this.y;
        this.ball.vx = this.vx;
        this.ball.vy = this.vy;
        console.log(this.ball.x + ":" + this.ball.y + ":" + this.ball.vx + ":" + this.ball.vy);
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
    constructor(paddle, leftRight = 0, ctx) {
        this.paddle = paddle;
        this.leftRight = leftRight;
        this.ctx = ctx;
        this.x = this.paddle.x;
        this.y = this.paddle.y;
        this.vx = this.paddle.vx;
    }
    execute() {
        this.x = this.paddle.x;
        this.y = this.paddle.y;
        if (this.leftRight == 0) {
            this.paddle.x -= this.vx;
        }
        else if (this.leftRight == 1) {
            this.paddle.x += this.vx;
        }
        else { }
        this.paddle.draw(this.ctx);
    }
    undo() {
        this.paddle.x = this.x;
        this.paddle.draw(this.ctx);
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
