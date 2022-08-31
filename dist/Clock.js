"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Clock = void 0;
class Clock {
    constructor(document) {
        this.totalSeconds = 0;
        this.setTime = () => {
            ++this.totalSeconds;
            //test
            //console.log(this.secondsLabel);
            //console.log(this.totalSeconds)
            if (this.secondsLabel) {
                this.secondsLabel.innerHTML = this.updateTimeVal(this.totalSeconds % 60);
            }
            if (this.minutesLabel) {
                if (this.totalSeconds > 59) {
                    this.minutesLabel.innerHTML = "0" + parseInt(this.updateTimeVal(this.totalSeconds / 60)).toString();
                }
            }
        };
        this.updateTimeVal = (val) => {
            let valString = val + "";
            if (valString.length < 2) {
                return "0" + valString;
            }
            else {
                return valString;
            }
        };
        this.runClock = () => {
            //setInterval(this.setTime, 1000);
            this.setTime();
        };
        this.document = document;
        if (this.document) {
            this.minutesLabel = this.document.getElementById("minutes");
            this.secondsLabel = this.document.getElementById("seconds");
        }
    }
    update() {
        this.runClock();
    }
}
exports.Clock = Clock;
