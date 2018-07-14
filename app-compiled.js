"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var App = function (_React$Component) {
    _inherits(App, _React$Component);

    function App(props) {
        _classCallCheck(this, App);

        var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

        _this.state = {
            running: false,
            times: {
                minutes: 0,
                seconds: 0,
                miliseconds: 0
            }
        };

        _this.reset = _this.reset.bind(_this);
        _this.format = _this.format.bind(_this);
        _this.start = _this.start.bind(_this);
        _this.step = _this.step.bind(_this);
        _this.calculate = _this.calculate.bind(_this);
        _this.stop = _this.stop.bind(_this);
        return _this;
    }

    _createClass(App, [{
        key: "reset",
        value: function reset() {
            var times = {
                minutes: 0,
                seconds: 0,
                miliseconds: 0
            };
            this.setState({ times: times });
        }
    }, {
        key: "format",
        value: function format() {
            return pad0(this.state.times.minutes) + ":" + pad0(this.state.times.seconds) + ":" + pad0(Math.floor(this.state.times.miliseconds));
        }
    }, {
        key: "start",
        value: function start() {
            var _this2 = this;

            if (!this.state.running) {
                var running = true;
                this.setState({ running: running });
                this.watch = setInterval(function () {
                    return _this2.step();
                }, 10);
            }
        }
    }, {
        key: "step",
        value: function step() {
            if (this.state.running) {
                this.calculate();
            }
        }
    }, {
        key: "calculate",
        value: function calculate() {
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
    }, {
        key: "stop",
        value: function stop() {
            var running = false;
            this.setState({ running: running });
            clearInterval(this.watch);
        }
    }, {
        key: "render",
        value: function render() {

            return React.createElement(
                "div",
                null,
                React.createElement(
                    "nav",
                    { className: "controls" },
                    React.createElement(
                        "a",
                        {
                            href: "#",
                            className: "button",
                            id: "start",
                            onClick: this.start },
                        "Start"
                    ),
                    React.createElement(
                        "a",
                        {
                            href: "#", className: "button",
                            id: "stop",
                            onClick: this.stop },
                        "Stop"
                    ),
                    React.createElement(
                        "a",
                        {
                            href: "#", className: "button",
                            id: "reset",
                            onClick: this.reset },
                        "Reset"
                    )
                ),
                React.createElement(
                    "div",
                    { className: "stopwatch" },
                    " "
                ),
                React.createElement("ul", { className: "results" })
            );
        }
    }]);

    return App;
}(React.Component);

function pad0(value) {
    var result = value.toString();
    if (result.length < 2) {
        result = '0' + result;
    }
    return result;
}
