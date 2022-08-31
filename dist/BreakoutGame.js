"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BreakoutGame = void 0;
const BALLMOVEX = 2;
const BALLMOVEY = -2;
const LIVES = 3;
// x y dx dy paddleX bricks[] leftPressed rightPressed score lives
const BALLRADIUS = 10;
const BRICKSIZE = 20;
const PADDLEHEIGHT = 10;
const PADDLEWIDTH = 90;
const BRICKROWCOUNT = 3;
const BRICKCOLUMNCOUNT = 5;
const BRICKWIDTH = 75;
const BRICKHEIGHT = 20;
const BRICKPADDING = 10;
const BRICKOFFSETTOP = 30;
const BRICKOFFSETLEFT = 30;
class BreakoutGame {
    constructor(breakoutVars) {
        this.ballPosition = {};
        this.ballChange = { x: BALLMOVEX, y: BALLMOVEY };
        this.ballRadius = 10;
        this.bricks = [];
        this.lives = LIVES;
        this.rightPressed = false;
        this.leftPressed = false;
        // Function for ball
        this.drawBall = () => {
            this.ctx
                .beginPath()
                .arc(this.ballPosition.x, this.ballPosition.y, this.ballRadius, 0, Math.PI * 2)
                .fillStyle("#011115")
                .fill()
                .closePath();
        };
        // Functions for bricks
        this.createBricks = () => {
            for (let c = 0; c < BRICKCOLUMNCOUNT; c++) {
                this.bricks[c] = [];
                for (let r = 0; r < BRICKROWCOUNT; r++) {
                    this.bricks[c][r] = { x: 0, y: 0, status: true };
                }
            }
        };
        this.drawBricks = () => {
            for (let c = 0; c < BRICKCOLUMNCOUNT; c++) {
                for (let r = 0; r < BRICKROWCOUNT; r++) {
                    if (this.bricks[c][r].status) {
                        this.bricks[c][r].x = (c * (BRICKWIDTH + BRICKPADDING)) + BRICKOFFSETLEFT;
                        this.bricks[c][r].y = (r * (BRICKHEIGHT + BRICKPADDING)) + BRICKOFFSETTOP;
                        this.ctx
                            .beginPath()
                            .rect(this.bricks[c][r].x, this.bricks[c][r].y, BRICKWIDTH, BRICKHEIGHT)
                            .fillStyle("linear-gradient(rgb(122, 74, 14), rgb(245, 62, 113), rgb(162, 27, 27))")
                            .fill()
                            .closePath();
                    }
                }
            }
        };
        //Function for paddle
        this.drawPaddle = () => {
            this.ctx
                .beginPath()
                .rect(this.paddle.x, this.canvas.height - this.paddle.height, this.paddle.width, this.paddle.height)
                .fillStyle("#950000")
                .fill()
                .closePath();
        };
        //Function for lives
        this.drawLives = () => {
            this.ctx
                .font("19px Sans-Serif")
                .fillStyle("#00554D")
                .fillText("Lives: " + this.lives, this.canvas.width - 75, 20);
        };
        this.draw = () => {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.checkGameState();
            this.drawBricks();
            this.drawBall();
            this.drawPaddle();
            this.drawScore();
            this.drawLives();
            this.collisionDetection();
            // move ball
            this.ballPosition.x += this.ballChange.x;
            this.ballPosition.y += this.ballChange.y;
            // restrict ball within boundary
            if (this.ballPosition.x + this.ballChange.x > this.canvas.width - this.ballRadius || this.ballPosition.x + this.ballChange.x < this.ballRadius) {
                this.ballChange.x = -this.ballChange.x;
            }
            if (this.ballPosition.y + this.ballChange.y < this.ballRadius) {
                this.ballChange.y = -this.ballChange.y;
            }
            else if (this.ballPosition.y + this.ballChange.y > this.canvas.height - this.ballRadius) {
                if (this.ballPosition.x > this.paddle.x && this.ballPosition.x < this.paddle.x + this.paddle.width) {
                    this.ballChange.y = -this.ballChange.y;
                }
                else {
                    this.lives--;
                    if (!this.lives) {
                        alert("Game Over");
                        document.location.reload();
                    }
                    else {
                        this.ballPosition.x = this.canvas.width / 2;
                        this.ballPosition.y = this.canvas.height - 30;
                        this.ballChange.x = 2;
                        this.ballChange.y = -2;
                        this.paddle.x = (this.canvas.width - this.paddle.width) / 2;
                    }
                }
            }
            //check if key pressed -> move paddle left/right, limit to canvas boundary
            if (this.rightPressed) {
                this.paddle.x = Math.min(this.paddle.x + 7, this.canvas.width - PADDLEWIDTH);
            }
            else if (this.leftPressed) {
                this.paddle.x = Math.max(this.paddle.x - 7, 0);
            }
        };
        this.setupHandlers = (document) => {
            document.addEventListener("keydown", this.keyDown, false);
            document.addEventListener("keyup", this.keyUp, false);
            document.addEventListener("mousemove", this.mouseMoveHandler, false);
        };
        this.mouseMoveHandler = (event) => {
            const relativeX = event.clientX - this.canvas.offsetLeft;
            if (relativeX < this.paddle.width / 2) {
                this.paddle.x = 0;
                return;
            }
            if (relativeX > this.canvas.width - this.paddle.width / 2) {
                this.paddle.x = this.canvas.width - this.paddle.width;
                return;
            }
            if (relativeX > 0 && relativeX < this.canvas.width) {
                this.paddle.x = relativeX - this.paddle.width / 2;
            }
        };
        this.keyDown = (event) => {
            if (event.key == "Right" || event.key == "ArrowRight") {
                this.rightPressed = true;
            }
            else if (event.key == "Left" || event.key == "ArrowLeft") {
                this.leftPressed = true;
            }
        };
        this.keyUp = (event) => {
            if (event.key == "Right" || event.key == "ArrowRight") {
                this.rightPressed = false;
            }
            else if (event.key == "Left" || event.key == "ArrowLeft") {
                this.leftPressed = false;
            }
        };
        //Function to detect ball-brick collision
        this.collisionDetection = () => {
            for (let c = 0; c < BRICKCOLUMNCOUNT; c++) {
                for (let r = 0; r < BRICKROWCOUNT; r++) {
                    const currentBrick = this.bricks[c][r];
                    if (currentBrick.status) {
                        if (this.ballPosition.x > currentBrick.x
                            && this.ballPosition.x < currentBrick.x + BRICKWIDTH
                            && this.ballPosition.y > currentBrick.y
                            && this.ballPosition.y < currentBrick.y + BRICKHEIGHT) {
                            this.ballChange.y = -this.ballChange.y;
                            currentBrick.status = false;
                        }
                    }
                }
            }
        };
        this.getScore = () => {
            const flatBricks = this.bricks.flat();
            return flatBricks.filter(f => !f.status).length;
        };
        this.drawScore = () => {
            this.ctx
                .font("16px Arial")
                .fillStyle("#0095DD")
                .fillText(`Score: ${this.getScore()}`, 8, 20);
        };
        this.checkGameState = () => {
            const score = this.getScore();
            if (score === BRICKCOLUMNCOUNT * BRICKROWCOUNT) {
                alert("Congratulations, you have won");
                document.location.reload();
            }
        };
        this.run = () => {
            this.draw();
            //  window.requestAnimationFrame(this.run);
        };
        this.ctx = breakoutVars.ctx;
        this.canvas = breakoutVars.canvas;
        this.ballPosition.x = this.canvas.width / 2;
        this.ballPosition.y = this.canvas.height / 2;
        this.paddle = {
            height: PADDLEHEIGHT,
            width: PADDLEWIDTH,
            x: (this.canvas.width - PADDLEWIDTH) / 2
        };
        if (breakoutVars.ballPosition) {
            this.ballPosition = breakoutVars.ballPosition;
        }
        if (breakoutVars.ballChange) {
            this.ballChange = breakoutVars.ballChange;
        }
        if (breakoutVars.ballRadius) {
            this.ballRadius = breakoutVars.ballRadius;
        }
        if (breakoutVars.bricks) {
            this.bricks = breakoutVars.bricks;
        }
        else {
            this.createBricks();
        }
        this.setupHandlers(breakoutVars.document);
    }
    update() {
        this.run();
    }
}
exports.BreakoutGame = BreakoutGame;
