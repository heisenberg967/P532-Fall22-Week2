interface IClock {
    runClock: () => void;
    setTime: () => void;
    updateTimeVal: (val: number) => string;
}