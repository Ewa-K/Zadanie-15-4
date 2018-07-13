
class App extends React.Component {
    constructor(display) {
        super(display);
        this.state = {
            running: false,
            display: display,
            times: {
                minutes: 0,
                seconds: 0,
                miliseconds: 0
            }
        }

        this.reset = this.reset.bind(this)
        this.print = this.print.bind(this)
        this.format = this.format.bind(this)
        this.start = this.start.bind(this)
        this.step = this.step.bind(this)
        this.calculate = this.calculate.bind(this)
        this.stop = this.stop.bind(this)
    }

    reset() {
        let times = {
            minutes: 0,
            seconds: 0,
            miliseconds: 0
        }
        this.setState({times})
    }

   print() {
        this.props.display.innerText = this.format(this.state.times);
    }

    format(times) {
        return `${pad0(this.state.times.minutes)}:${pad0(this.state.times.seconds)}:${pad0(Math.floor(this.state.times.miliseconds))}`;
    }

    start() {
        if (!this.running) {
            this.running = true;
            this.watch = setInterval(() => this.step(), 10);
        }
    }

    step() {
        if (!this.running) return;
        this.calculate();
        this.print();
    }

    calculate() {
        this.state.times.miliseconds += 1;
        if (this.state.times.miliseconds >= 100) {
            this.state.times.seconds += 1;
            this.state.times.miliseconds = 0;
        }
        if (this.state.times.seconds >= 60) {
            this.state.times.minutes += 1;
            this.state.times.seconds = 0;
        }
    }

    stop() {
        this.running = false;
        clearInterval(this.watch);
    }

    render() {

        return (
            <div>
                <nav className="controls">
                    <a 
                        href="#" 
                        className="button" 
                        id="start"
                        onClick={this.start}>
                        Start
                    </a>
                    <a 
                        href="#" className="button" 
                        id="stop"
                        onClick={this.stop}>
                        Stop
                    </a>
                    <a 
                        href="#" className="button" 
                        id="stop"
                        onClick={this.reset}>
                        Reset
                    </a>
                </nav>
                <div className="stopwatch"> {} </div>
                <ul className="results"></ul>
            </div>
        );
    }
}

function pad0(value) {
    let result = value.toString();
    if (result.length < 2) {
        result = '0' + result;
    }
    return result;
}

