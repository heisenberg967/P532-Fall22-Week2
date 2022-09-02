"use strict";
const GAME_SCREEN = document.querySelector(".grid");
const SCORE_DISPLAY = document.querySelector("#score");
const BRICK_WIDTH = 100;
const BRICK_HEIGHT = 20;
const SCREEN_WIDTH = 780;
const SCREEN_HEIGHT = 500;
const BALL_DIAMETER = 25;
let time = 60;
let timerId;
let xDirection = 2;
let yDirection = 2;
let score = 0;
const PADDLE_START = [340, 10];
let paddlePosition = PADDLE_START;
const BALL_START = [370, 40];
let ballPosition = BALL_START;
// create Brick 
class Brick {
    constructor(xAxis, yAxis) {
        this.bottomLeft = [xAxis, yAxis];
        this.bottomRight = [xAxis + BRICK_WIDTH, yAxis];
        this.topLeft = [xAxis, yAxis + BRICK_HEIGHT];
        this.topRight = [xAxis + BRICK_WIDTH, yAxis];
    }
}
//all bricks
const bricks = [
    new Brick(10, 370),
    new Brick(120, 370),
    new Brick(230, 370),
    new Brick(340, 370),
    new Brick(450, 370),
    new Brick(560, 370),
    new Brick(670, 370),
    new Brick(10, 340),
    new Brick(120, 340),
    new Brick(230, 340),
    new Brick(340, 340),
    new Brick(450, 340),
    new Brick(560, 340),
    new Brick(670, 340),
    new Brick(10, 310),
    new Brick(120, 310),
    new Brick(230, 310),
    new Brick(340, 310),
    new Brick(450, 310),
    new Brick(560, 310),
    new Brick(670, 310),
    new Brick(10, 280),
    new Brick(120, 280),
    new Brick(230, 280),
    new Brick(340, 280),
    new Brick(450, 280),
    new Brick(560, 280),
    new Brick(670, 280)
];
//display Brick 
function addBricks() {
    for (let i = 0; i < bricks.length; i++) {
        const brick = document.createElement('div');
        brick.classList.add('brick');
        brick.style.left = bricks[i].bottomLeft[0] + 'px';
        brick.style.bottom = bricks[i].bottomLeft[1] + 'px';
        GAME_SCREEN.appendChild(brick);
    }
}
//draw the paddle
class Paddle {
    paddleDisplay() {
        paddle.style.left = paddlePosition[0] + 'px';
        paddle.style.bottom = paddlePosition[1] + 'px';
    }
    //move paddle 
    movePaddle(e) {
        switch (e.key) {
            case 'ArrowLeft':
            case 'A':
            case 'a':
                if (paddlePosition[0] > 0) {
                    paddlePosition[0] -= 10;
                    paddle1.paddleDisplay();
                }
                break;
            case 'ArrowRight':
            case 'D':
            case 'd':
                if (paddlePosition[0] < SCREEN_WIDTH - BRICK_WIDTH) {
                    paddlePosition[0] += 10;
                    paddle1.paddleDisplay();
                }
                break;
        }
    }
}
class BallClass {
    //display the ball
    ballDisplay() {
        ball.style.left = ballPosition[0] + 'px';
        ball.style.bottom = ballPosition[1] + 'px';
    }
    changeDirection() {
        if (xDirection === 2 && yDirection === 2) {
            yDirection = -2;
            return;
        }
        if (xDirection === 2 && yDirection === -2) {
            xDirection = -2;
            return;
        }
        if (xDirection === -2 && yDirection === -2) {
            yDirection = 2;
            return;
        }
        if (xDirection === -2 && yDirection === 2) {
            xDirection = 2;
            return;
        }
    }
    checkForCollisions() {
        //check for brick collisons 
        for (let i = 0; i < bricks.length; i++) {
            if ((ballPosition[0] > bricks[i].bottomLeft[0] && ballPosition[0] < bricks[i].bottomRight[0]) &&
                ((ballPosition[1] + BALL_DIAMETER) > bricks[i].bottomLeft[1] && ballPosition[1] < bricks[i].topLeft[1])) {
                const allBricks = Array.from(document.querySelectorAll('.brick'));
                allBricks[i].classList.remove('brick');
                bricks.splice(i, 1);
                this.changeDirection();
                score++;
                SCORE_DISPLAY.innerHTML = "Score: " + score;
                //check for win
                if (bricks.length === 0) {
                    SCORE_DISPLAY.innerHTML = "You Win!!!";
                    clearInterval(timerId);
                    document.removeEventListener('keydown', paddle1.movePaddle);
                }
            }
        }
        //check for paddle collisions 
        if ((ballPosition[0] > paddlePosition[0] && ballPosition[0] < paddlePosition[0] + BRICK_WIDTH) &&
            (ballPosition[1] > paddlePosition[1] && ballPosition[1] < paddlePosition[1] + BRICK_HEIGHT)) {
            this.changeDirection();
        }
        //check for wall collisons 
        if (ballPosition[1] >= (SCREEN_HEIGHT - BALL_DIAMETER)) {
            this.changeDirection();
        }
        if (ballPosition[0] >= (SCREEN_WIDTH - BALL_DIAMETER) ||
            ballPosition[0] <= 0) {
            this.changeDirection();
        }
        if (ballPosition[1] <= 0) {
            clearInterval(timerId);
            clearInterval(clockTimer);
            SCORE_DISPLAY.innerHTML = "You Lose! You scored " + score + " point(s)";
            document.removeEventListener('keydown', paddle1.movePaddle);
        }
    }
    //move ball
    moveBall() {
        ballPosition[0] += xDirection;
        ballPosition[1] += yDirection;
        ballObj.ballDisplay();
        ballObj.checkForCollisions();
    }
}
addBricks();
// display paddle 
const paddle = document.createElement('div');
const paddle1 = new Paddle();
paddle.classList.add('user');
paddle1.paddleDisplay();
GAME_SCREEN.appendChild(paddle);
document.addEventListener('keydown', paddle1.movePaddle);
//add ball
const ball = document.createElement('div');
const ballObj = new BallClass();
ball.classList.add('ball');
ballObj.ballDisplay();
GAME_SCREEN.appendChild(ball);
timerId = setInterval(ballObj.moveBall, 30);
//Timer - clock
const CLOCK_DISP = document.getElementById("clock");
let clockTimer = setInterval(timer, 1000);
function toDoubleDigits(x) {
    if (x < 10)
        return "0" + x;
    return x;
}
function timer() {
    CLOCK_DISP.innerHTML = "Time left: " + "00:" + toDoubleDigits(time);
    time -= 1;
    if (time == -1) {
        clearInterval(clockTimer);
        clearInterval(timerId);
        SCORE_DISPLAY.innerHTML = "Time out! You scored " + score + " point(s)";
        document.removeEventListener('keydown', paddle1.movePaddle);
    }
}
/*
if (ballCurrentPosition[1] <=0){
        clearInterval(timerId)
        scoreDisplay!.innerHTML="You Lose"
        document.removeEventListener('keydown',paddle1.moveUser)
    }
*/
//# sourceMappingURL=index.js.map