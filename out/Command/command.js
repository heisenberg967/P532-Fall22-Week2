export class MoveCommand {
    constructor(ball) {
        this.ball = ball;
    }
    execute() {
        this.x = this.ball.x;
        this.y = this.ball.y;
        this.vx = this.ball.vx;
        this.vy = this.ball.vy;
        this.ball.x += this.ball.vx;
        this.ball.y += this.ball.vy;
        this.ball.draw();
    }
}
export class UndoCommand {
    constructor(ball) {
        this.ball = ball;
    }
    execute() {
        this.x = this.ball.x;
        this.y = this.ball.y;
        this.vx = this.ball.vx;
        this.vy = this.ball.vy;
        this.ball.x -= this.ball.vx;
        this.ball.y -= this.ball.vy;
        this.ball.draw();
    }
}
export class PauseCommand {
    constructor(ball) {
        this.ball = ball;
    }
    execute() {
        this.ball.draw();
    }
}
export class MovePaddleCommand {
    constructor(paddle, ctx) {
        this.paddle = paddle;
        this.ctx = ctx;
    }
    execute() {
        this.paddle.draw(this.ctx);
    }
    undo() {
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
