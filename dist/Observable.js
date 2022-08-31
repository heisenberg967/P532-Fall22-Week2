"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Observable = void 0;
class Observable {
    constructor() {
        this.sprites = [];
    }
    attach(sprite) {
        if (!this.sprites.some((e) => e == sprite))
            this.sprites.push(sprite);
    }
    detach(sprite) {
        for (let i = 0; i < this.sprites.length; i++) {
            if (this.sprites[i] == sprite) {
                this.sprites.splice(this.sprites.indexOf(this.sprites[i]), 1);
            }
        }
    }
    changeState() {
        this.sprites.forEach(element => {
            element.update();
        });
    }
}
exports.Observable = Observable;
