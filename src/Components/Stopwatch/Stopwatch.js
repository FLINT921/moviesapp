import React, { Component } from "react";

export default class Stopwatch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            elapsedTime: 0,
            running: false,
        };
        this.stopwatchInterval = null;
    }

    startStopwatch = () => {
        if (this.state.running) return;

        this.setState({ running: true });
        const startTime = Date.now() - this.state.elapsedTime;
        this.stopwatchInterval = setInterval(() => {
            this.setState({ elapsedTime: Date.now() - startTime });
        }, 1000);
    };

    stopStopwatch = () => {
        clearInterval(this.stopwatchInterval);
        this.setState({ running: false });
    };

    resetStopwatch = () => {
        clearInterval(this.stopwatchInterval);
        this.setState({ elapsedTime: 0, running: false });
    };

    updateStopwatchDisplay = () => {
        const totalSeconds = Math.floor(this.state.elapsedTime / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        const format = (num) => (num < 10 ? `0${num}` : num);
        return `${format(hours)}:${format(minutes)}:${format(seconds)}`;
    };

    render() {
        return (
            <div>
                <button onClick={this.startStopwatch}>Старт</button>
                <button onClick={this.stopStopwatch}>Стоп</button>
                <button onClick={this.resetStopwatch}>Сброс</button>
                <h1>{this.updateStopwatchDisplay()}</h1>
            </div>
        );
    }
}
