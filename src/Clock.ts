import { IClock } from "./Interfaces/IClock";
export class Clock implements IClock {
    
    private document: Document | undefined;
    private minutesLabel: HTMLElement | null | undefined;
    private secondsLabel: HTMLElement | null | undefined;
    private totalSeconds: number = 0;

    constructor(document?: Document | undefined) {
        this.document = document;

        if (this.document){
            this.minutesLabel = this.document.getElementById("minutes");
            this.secondsLabel = this.document.getElementById("seconds");
        }
    }

    setTime = () => {
        ++this.totalSeconds;

        //test
        //console.log(this.secondsLabel);
        //console.log(this.totalSeconds)
        
        if (this.secondsLabel){
          this.secondsLabel.innerHTML = this.updateTimeVal(this.totalSeconds%60);
        }
        if (this.minutesLabel){
            if (this.totalSeconds > 59){
                this.minutesLabel.innerHTML = "0"+parseInt(this.updateTimeVal(this.totalSeconds/60)).toString();
            }
        }
      }
    
    updateTimeVal = (val: number) => {
    let valString = val + "";
    if (valString.length < 2) {
        return "0" + valString;
    }
    else {
        return valString;
    }
    }
    update(): void {
        this.runClock();
    }
    runClock = () => {
        //setInterval(this.setTime, 1000);
        this.setTime();
    }

}