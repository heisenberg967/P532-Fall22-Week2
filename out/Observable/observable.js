export var state;
(function (state) {
    state[state["do"] = 0] = "do";
    state[state["replay"] = 1] = "replay";
    state[state["undo"] = 2] = "undo";
})(state || (state = {}));
export class Observable {
    constructor() {
        this.sprites = [];
    }
    changeState() {
        this.sprites.forEach(spr => spr.update());
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
}
