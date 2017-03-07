var App = React.createClass({
  render: function(){
    return (<div>
      <h1>{this.props.title}</h1>
      <table className='table'>
        <Headings headings={this.props.headings} />
        <Rows changeSets = {this.props.changeSets} />
      </table>
    </div>);
  }
});

var Heading = React.createClass({
  render: function(){
    return(<th>{this.props.heading}</th>);
  }
});


var Headings = React.createClass({
  render: function(){
    var headings = this.props.headings.map(function(h){
      return(<Heading heading={h}/>);
    })
    return(<thead>
      <tr>{headings}</tr>
    </thead>);
  }
});

var Row = React.createClass({
  render: function(){
    return(<tr>
      <td>{this.props.changeSet.when}</td>
      <td>{this.props.changeSet.who}</td>
      <td>{this.props.changeSet.description}</td>
    </tr>);
  }
});

var Rows = React.createClass({
  render: function(){
    var rows = this.props.changeSets.map(function(changeSet){
      return(<Row changeSet={changeSet}/>);
    });
    return(<tbody>{rows}</tbody>);
  }
});


var data = [{ "when": "2 minutes ago",
            "who": "Jill Dupre",
            "description": "Created new account"
          },
          {
            "when": "1 hour ago",
            "who": "Lose White",
            "description": "Added fist chapter"
          },
          {
            "when": "2 hours ago",
            "who": "Jordan Whash",
            "description": "Created new account"
          }];

var headings = ['Last Change At', 'Author', 'Summary'];

var title = 'Recent Changes';

React.render(<App headings={headings} changeSets={data} title={title}/>, document.body);