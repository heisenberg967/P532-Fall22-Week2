export var state;
(function (state) {
    state[state["do"] = 0] = "do";
    state[state["pause"] = 1] = "pause";
    state[state["undo"] = 2] = "undo";
})(state || (state = {}));
export class Observable {
    constructor() {
        this.sprites = [];
    }
    changeState(state) {
        this.sprites.forEach(spr => spr.update(state));
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
