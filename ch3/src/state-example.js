console.log('Start');

var App = React.createClass({
  componentWillMount: function(){
    console.log('componentWillMount');
  },
  componentDidMount: function(){
    console.log('componentDidMount');
  },
  getInitialState: function(){
    return {status: true};
  },
  getDefaultProps: function(){
    return {name: 'John'}
  },
  componentWillReceiveProps: function(nextProps){
    console.log('componentWillReceiveProps');
  },
  shouldComponentUpdate: function(nextProps, nextState){
    console.log('shouldComponentUpdate');
    return true;
  },
  componentWillUpdate: function(){
    console.log('componentWillUpdate');
  },
  render: function(){
    console.log('rendered');
    return (<h1 onClick={this.toggleState}>
      {this.state.status.toString()}
    </h1>);
  },
  componentWillUnmount: function(){
    console.log('componentWillUmount');
  },
  toggleState: function(){
    this.setState({status: !this.state.status});
  }
});

React.render(<App name='Jane'/>, document.body);