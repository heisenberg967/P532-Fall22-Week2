import { BreakoutGame } from './BreakoutGame';
import { CanvasPath } from './CanvasPath';
import { Clock } from './Clock';
import "../styles.css";

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

    const canvas: HTMLCanvasElement = document.createElement("canvas");
    canvas.id = "gameSpace";
    canvas.width = 480;
    canvas.height = 320;
    const body: HTMLElement = document.body;
    body.prepend(canvas);
    body.prepend(seconds);
    body.prepend(colon);
    body.prepend(minutes);
    body.prepend(clock);

    return canvas;
}

const getContext = (canvas: HTMLCanvasElement): ICanvasPath => {
    return new CanvasPath(canvas.getContext("2d"));
}

let canvas = createCanvas();
let ctx = getContext(canvas);

const breakoutGameArgs: IBreakoutGameArgs = {
    ctx: ctx,
    canvas: canvas,
    document: document
} as IBreakoutGameArgs;


// start game
const breakoutGame = new BreakoutGame(breakoutGameArgs);
breakoutGame.run();

// start clock
const clock = new Clock(document);
clock.runClock();