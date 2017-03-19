import React from 'react';

var SetIntervalMixin = {
    componentWillMount() {
        this.intervals = []; // will hold instances to intervals we create
    },
    setInterval() {
        this.intervals.push(setInterval.apply(null, arguments)); // defines new intervals
    },
    componentWillUnmount() {
        this.intervals.map(clearInterval);
    }
};

var CartTimeoutMixin = {
    componentWillMount() {
        this.setInterval(this.decrementCartTimer, 1000);
    },
    decrementCartTimer() {
        if (this.state.cartTimeout === 0) {
            this.props.alertCartTimeout();
            return;
        }
        this.setState({ cartTimeout: this.state.cartTimeout - 1 });
    },
    componentWillUnmount() {
        this.props.updateCartTimeout(this.state.cartTimeout);
    }
};

export {
    SetIntervalMixin,
    CartTimeoutMixin
}