"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BreakoutGame_1 = require("./BreakoutGame");
const CanvasPath_1 = require("./CanvasPath");
const Clock_1 = require("./Clock");
require("../styles.css");
const Observable_1 = require("./Observable");
let obs = new Observable_1.Observable();
const createCanvas = () => {
    const clock = document.createElement("div");
    clock.className = "clock";
    const minutes = document.createElement("label");
    minutes.id = "minutes";
    minutes.innerHTML = "00";
    const colon = document.createElement("label");
    colon.id = "colon";
    colon.innerHTML = ":";
    const seconds = document.createElement("label");
    seconds.id = "seconds";
    seconds.innerHTML = "00";
    const canvas = document.createElement("canvas");
    canvas.id = "gameSpace";
    canvas.width = 480;
    canvas.height = 320;
    const body = document.body;
    body.prepend(canvas);
    body.prepend(seconds);
    body.prepend(colon);
    body.prepend(minutes);
    body.prepend(clock);
    return canvas;
};
const getContext = (canvas) => {
    return new CanvasPath_1.CanvasPath(canvas.getContext("2d"));
};
let canvas = createCanvas();
let ctx = getContext(canvas);
const breakoutGameArgs = {
    ctx: ctx,
    canvas: canvas,
    document: document
};
// start game
const breakoutGame = new BreakoutGame_1.BreakoutGame(breakoutGameArgs);
//breakoutGame.run();
// start clock
const clock = new Clock_1.Clock(document);
//clock.runClock();
obs.attach(breakoutGame);
obs.attach(clock);
setInterval(() => obs.changeState(), 10);
