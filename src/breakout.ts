import { Move } from "./command/move";
import { Replay } from "./command/replay";
import { Constants } from "./helper/constants";
import { Location } from "./helper/location";
import { Ball } from "./sprite/ball";
import { Brick } from "./sprite/brick";
import { Paddle } from "./sprite/paddle";

export class Breakout {
    private canvas!: HTMLCanvasElement;
    private document!: Document;
    private ctx!: CanvasRenderingContext2D | null;

    private gameNotStopped: boolean = true;
    private isPaused: boolean = false;

    private isReplayEnabled: boolean = false;

    private paddle!: Paddle;
    private ball!: Ball;
    private bricks!: Array<Array<Brick>>;
    private index!: number;


    constructor(canvas: HTMLCanvasElement, document: Document) {
        this.canvas = canvas;
        this.document = document;
        this.ctx = this.canvas.getContext('2d');
    }

    isGameNotStopped(): boolean {
        return this.gameNotStopped;
    }

    setGameNotStopped(stop: boolean) {
        this.gameNotStopped = stop;
    }

    isGamePaused(): boolean {
        return this.isPaused;
    }

    setGamePaused(pause: boolean) {
        this.isPaused = pause;
    }

    init(): void {
        //call timekeeper -> time -- observable, sprite

        //paddle
        this.paddle = new Paddle(this.canvas);

        //ball
        this.ball = new Ball(((this.paddle.posX + (Constants.PADDLE_WIDTH/2))-(Constants.BALL_RADIUS/2)), ((this.canvas.height-30) - (Constants.BALL_RADIUS + 10)), -5, -5);

        this.index = 0; //replay stage

        //brick array

        this.bricks = new Array<Array<Brick>>();

        for(let c=0; c<Constants.BRICK_ROW_COUNT; c++) {
            let temp = new Array<Brick>();
            for(let r=0; r<Constants.BRICK_NUMBERS; r++) {
                let tempBrick = new Brick((r*Constants.BRICK_WIDTH), ((c+2)*Constants.BRICK_HEIGHT));
                temp.push(tempBrick);
            }
            this.bricks.push(temp);
        }
    }

    startGame(): void {
        this.init();
        this.setGameNotStopped(true);
    }

    stopGame(): void {
        this.setGameNotStopped(false);
    }

    checkCollisions(): void {
        if (this.paddle.hitPaddle(this.ball)) {
            this.ball.speedY = this.ball.speedX * -1;
            return;
        }

        if (this.ball.checkRightBoundaryCollisions(this.ball)){
            this.ball.speedX = this.ball.speedX * -1;
        }
        
        if (this.ball.posY > ((this.canvas.height - 30) + Constants.PADDLE_HEIGHT + 10)) {
            this.resetBall();
        }

        if (this.ball.checkLeftBoundaryCollisions(this.ball)){
            this.ball.speedY = this.ball.speedY * -1;
        }

        for(let c=0; c<Constants.BRICK_ROW_COUNT; c++) {
            for(let r=0; r<Constants.BRICK_NUMBERS; r++) {
                if (this.bricks[c][r].hitBy(this.ball)) {
                    this.bricks[c][r].hideBrick();
                }
            }
        }


    }

    resetBall(): void {
        if (this.gameOver()){
            this.stopGame();
            return;
        }
        this.ball.posX = this.canvas.width/2;
        this.ball.posY = this.canvas.height/2 + 80;
        this.paddle.setLives(this.paddle.getLives() - 1);
    }

    gameOver(): boolean {
        if (this.paddle.getLives() <= 1) {
            return true;
        }
        return false;
    }

    paintCanvas(): void {
        if (this.ctx){
            this.ctx.clearRect(0, 0, 480, 320);
            //this.ctx.fillRect(0, 0, 480, 320);

            // draw paddle
            //console.log('draw paddle');
            this.paddle.draw(this.ctx)

            // draw ball    
            //console.log('draw ball');
            this.ball.draw(this.ctx)

            // draw bricks
            for(let c=0; c<Constants.BRICK_ROW_COUNT; c++) {
                for(let r=0; r<Constants.BRICK_NUMBERS; r++) {
                    if (this.ctx){
                        //console.log('draw bricks');
                        this.bricks[c][r].draw(this.ctx);
                    }
                }
            }
        }

        // if (this.gameOver() && this.ball.posY >= this.canvas.height - 20) {
        //     alert('Game over!');
        // }

        if (this.empty()){
            alert('You won!');
        }

    }

    empty(): boolean {
        for(let c=0; c<Constants.BRICK_ROW_COUNT; c++) {
            for(let r=0; r<Constants.BRICK_NUMBERS; r++) {
                if (this.bricks[c][r].isBrickVisible()){
                    return false;
                }
            }
        }
        return true;
    }

    run(): void {
        while (this.isGameNotStopped()) {
            if (this.isGamePaused() == false) {
                this.checkCollisions();
                // tick move -- clock

                let ballMove = new Move(this.ball, null); //check loc value
                ballMove.execute();

                let loc: Location = new Location(this.paddle.posX, 0);
                let paddleMove = new Move(this.paddle, loc);
                //paddleMove.execute();

                //repaint - maybe paintcanvas
                this.paintCanvas();
            }
            else if (this.getReplayEnabled()) {
                let replayBall: Replay = new Replay(this.ball, this.index);
                replayBall.execute();

                // add replay time

                let replayPaddle: Replay = new Replay(this.paddle, this.index);
                replayPaddle.execute();

                for(let c=0; c<Constants.BRICK_ROW_COUNT; c++) {
                    for(let r=0; r<Constants.BRICK_NUMBERS; r++) {
                        let tempBrick = this.bricks[c][r];
                        let replayBrick: Replay = new Replay(tempBrick, this.index);
                        replayBrick.execute();
                    }
                }

                this.index += 1;

                // repaint - maybe paintcanvas
                this.ctx?.clearRect(0, 0, 480, 320);
                this.paintCanvas();
            }

            // if (this.isGamePaused()) {
            //     // pause time
            // }

        }
    }

    getReplayEnabled(): boolean {
        return this.isReplayEnabled;
    }

    setReplayEnabled(replay: boolean): void {
        this.isReplayEnabled = replay;
    }

    getElementFromDoc = (elementId: string): HTMLElement | null => {
        return this.document.getElementById(elementId);
    }

    listenForKeyPressed(): void {
        // handle paddle keys
    }

    
    //move draw functions -> paintComponent (js)

    //remaining game functions -
    //start game
    //collision det
    //replay
    //keypressed
    //....
}