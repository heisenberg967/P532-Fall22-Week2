export class MoveBallCommand {
    constructor(ball) {
        this.ball = ball;
        this.x = this.ball.x;
        this.y = this.ball.y;
        this.vx = this.ball.vx;
        this.vy = this.ball.vy;
    }
    execute() {
        console.log(this.ball.x + " " + this.ball.y);
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
    constructor(paddle) {
        this.paddle = paddle;
        this.x = this.paddle.x;
        this.vx = this.paddle.vx;
    }
    execute() {
        this.x = this.paddle.x;
    }
    undo() {
        this.paddle.x = this.x;
    }
}
export class BlowBrickCommand {
    constructor(bricks, i) {
        this.bricks = bricks;
        this.i = i;
    }
    execute() {
        this.blownBrick = this.bricks[this.i];
        this.bricks.splice(this.i, 1);
        this.bricks.forEach(brick => brick.draw());
    }
    undo() {
        this.bricks.splice(this.i, 0, this.blownBrick);
        this.bricks.forEach(brick => brick.draw());
    }
}
