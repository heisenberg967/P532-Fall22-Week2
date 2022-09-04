"use strict";
var canvas = document.getElementById("game-canvas");
var ctx = canvas.getContext("2d");
ctx.beginPath();
ctx.arc(95, 50, 40, 0, 2 * Math.PI);
ctx.stroke();
// check for  collision when ball reaches the brick area loop. if ball intersects with any co-ordinates, call BrickBreakCommand
//# sourceMappingURL=index.js.map