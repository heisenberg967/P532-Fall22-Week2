export class ClockTick {
    constructor(clock) {
        this.clock = clock;
        this.time = 0;
    }
    execute() {
        this.time = this.clock.time;
        this.clock.draw();
    }
    undo() {
        this.clock.time = this.time;
        this.clock.draw();
    }
    getTime() {
        return this.clock;
    }
}
export class MoveBallCommand {
    constructor(ball) {
        this.ball = ball;
        this.x = this.ball.x;
        this.y = this.ball.y;
        this.vx = this.ball.vx;
        this.vy = this.ball.vy;
    }
    execute() {
        //console.log(this.ball.x+" "+this.ball.y);
        this.x = this.ball.x;
        this.y = this.ball.y;
        // console.log('moveballcmd execute');
        // console.log(this.x);
        this.ball.draw();
    }
    undo() {
        this.ball.x = this.x;
        this.ball.y = this.y;
        this.ball.draw();
    }
    getBall() {
        return this.ball;
    }
}
export class CommandList {
    constructor(canvas) {
        this.canvas = canvas;
        this.commands = [];
        this.speed = 80;
    }
    // replays the uploaded commands
    execute() {
        setInterval(() => this.commands.forEach(command => command.execute()), this.speed);
    }
    undo() {
        this.commands.forEach(command => command.undo());
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
        this.paddle.draw();
    }
    undo() {
        this.paddle.x = this.x;
        this.paddle.draw();
    }
    getPaddle() {
        return this.paddle;
    }
}
export class BlowBrickCommand {
    constructor(oldBricks) {
        this.oldBricks = oldBricks;
        this.newBricks = oldBricks;
    }
    setNewBricks(bricks) {
        this.newBricks = bricks;
    }
    execute() {
        this.newBricks.forEach(brick => brick.draw());
    }
    undo() {
        this.oldBricks.forEach(brick => brick.draw());
    }
    getBricks() {
        return this.oldBricks;
    }
}
