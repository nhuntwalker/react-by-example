import React from 'react';
import BookStore from './BookStore';
// import ReactDOM from 'react-dom';

React.render(<BookStore />, document.getElementById('root'));

var InputExample = React.createClass({
    render() {
        return (
            <input type='text' value={this.state.name} onChange={this.handleChange} />
        );
    },
    getInitialState() {
        return (
            {
                name: 'Shawn'
            }
        );
    },
    handleChange(event) {
        this.setState({ name: event.target.value });
    }
});

React.render(<InputExample />, document.getElementById('root'));
