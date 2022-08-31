"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CanvasPath = void 0;
class CanvasPath {
    constructor(ctx) {
        this.beginPath = () => {
            var _a;
            (_a = this.ctx) === null || _a === void 0 ? void 0 : _a.beginPath();
            return this;
        };
        this.clearRect = (x, y, width, height) => {
            var _a;
            (_a = this.ctx) === null || _a === void 0 ? void 0 : _a.clearRect(x, y, width, height);
            return this;
        };
        this.rect = (x, y, width, height) => {
            var _a;
            (_a = this.ctx) === null || _a === void 0 ? void 0 : _a.rect(x, y, width, height);
            return this;
        };
        this.fillStyle = (color) => {
            if (this.ctx) {
                this.ctx.fillStyle = color;
            }
            return this;
        };
        this.fill = () => {
            var _a;
            (_a = this.ctx) === null || _a === void 0 ? void 0 : _a.fill();
            return this;
        };
        this.closePath = () => {
            var _a;
            (_a = this.ctx) === null || _a === void 0 ? void 0 : _a.closePath();
            return this;
        };
        this.arc = (x, y, radius, startAngle, endAngle, antiClockwise) => {
            var _a;
            (_a = this.ctx) === null || _a === void 0 ? void 0 : _a.arc(x, y, radius, startAngle, endAngle, antiClockwise);
            return this;
        };
        this.stroke = () => {
            var _a;
            (_a = this.ctx) === null || _a === void 0 ? void 0 : _a.stroke();
            return this;
        };
        this.font = (fontStyle) => {
            if (this.ctx) {
                this.ctx.font = fontStyle;
            }
            return this;
        };
        this.fillText = (text, x, y) => {
            var _a;
            (_a = this.ctx) === null || _a === void 0 ? void 0 : _a.fillText(text, x, y);
            return this;
        };
        this.ctx = ctx;
    }
}
exports.CanvasPath = CanvasPath;
