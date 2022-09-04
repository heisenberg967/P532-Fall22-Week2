"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BrickBlowCommand {
    execute(brick) {
        brick.isalive = false;
        // undohistory.append(brick)
    }
    undo(brick) {
        brick.isalive = !brick.isalive;
    }
}
//# sourceMappingURL=brickblowcommand.js.map