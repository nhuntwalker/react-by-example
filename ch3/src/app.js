var App = React.createClass({
  propTypes: {
    headings: React.PropTypes.array,
    changeSets: React.PropTypes.array,
    author: React.PropTypes.string.isRequired
  },
  render: function(){
    return (<div>
      <h1>{this.props.title}</h1>
      <RecentChangesTable>
        <RecentChangesTable.Headings headings={this.props.headings} />
        <Rows changeSets = {this.props.changeSets} />
      </RecentChangesTable>
    </div>);
  }
});

var RecentChangesTable = React.createClass({
  render: function(){
    return <table className='recentChangesTable'>
      {this.props.children}
    </table>;
  }
});
RecentChangesTable.Headings = React.createClass({
  render: function(){
    var headings = this.props.headings.map(function(h, index){
      return(<RecentChangesTable.Heading key={index} heading={h} />);
    });
    return(<thead>
    <tr>{headings}</tr>
    </thead>);
  }
});
RecentChangesTable.Heading = React.createClass({
  render: function(){
    return(<th>{this.props.heading}</th>);
  }
});
Row = React.createClass({
  render: function(){
    var trStyle = {
      backgroundColor: 'aliceblue'
    };
    return(<tr style={trStyle}>
      <td>{this.props.changeSet.when}</td>
      <td>{this.props.changeSet.who}</td>
      <td>{this.props.changeSet.description}</td>
    </tr>);
  }
});
Rows = React.createClass({
  render: function(){
    var rows = this.props.changeSets.map(function(changeSet, index){
      return(<Row key={index} changeSet={changeSet}/>);
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

var props = {
  headings: headings,
  changeSets: data,
  title: title
};

React.render(<App {...props} />, document.body);