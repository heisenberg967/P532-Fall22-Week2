import { Breakout } from "./breakout";
import "../styles.css";
import { Constants } from "./helper/constants";


//const buttonElement = (elementId:)
const createButton = (buttonName: string): HTMLButtonElement => {
    const button: HTMLButtonElement = document.createElement("button");
    button.id = buttonName;
    button.className = "button";
    button.innerHTML = buttonName;
    return button
}

const createCanvas = (): HTMLCanvasElement => {
    const clock: HTMLDivElement = document.createElement("div");
    clock.className = "clock";
    const minutes: HTMLLabelElement = document.createElement("label");
    minutes.id = "minutes";
    minutes.innerHTML = "00";
    const colon: HTMLLabelElement = document.createElement("label");
    colon.id = "colon";
    colon.innerHTML = ":"
    const seconds: HTMLLabelElement = document.createElement("label");
    seconds.id = "seconds";
    seconds.innerHTML = "00";

    const startButton = createButton(Constants.START_BUTTON_TEXT);
    const pauseButton = createButton(Constants.PAUSE_BUTTON_TEXT);
    const undoButton = createButton(Constants.UNDO_BUTTON_TEXT);
    const replayButton = createButton(Constants.REPLAY_BUTTON_TEXT);

    const canvas: HTMLCanvasElement = document.createElement("canvas");
    canvas.id = "gameSpace";
    canvas.width = 480;
    canvas.height = 320;
    const body: HTMLElement = document.body;
    body.prepend(canvas);
    body.prepend(seconds);
    body.prepend(colon);
    body.prepend(minutes);
    body.prepend(replayButton);
    body.prepend(undoButton);
    body.prepend(pauseButton);
    body.prepend(startButton);
    body.prepend(clock);

    return canvas;
}

//add as parameter to draw func
// const getContext = (canvas: HTMLCanvasElement): ICanvasPath => {
//     return new CanvasPath(canvas.getContext("2d"));
//}

let canvas = createCanvas();

// setup breakout
const breakout = new Breakout(canvas, document);

//listen to buttons
let startButton = document.getElementById('Start');

startButton?.addEventListener('click', ()=>{
    breakout.init();
    breakout.setGameNotStopped(true);
    breakout.run();
    if (startButton) {
        startButton.innerHTML = "Restart"
    }
})


document.getElementById('Pause')?.addEventListener('click', ()=>{
    breakout.setGamePaused(true);
    breakout.run();
})

document.getElementById('Replay')?.addEventListener('click', ()=>{
    breakout.setReplayEnabled(true);
    breakout.run();
})



