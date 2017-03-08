var App = React.createClass({
  getInitialState: function(){
    return {
      changeSets: []   
    }
  },
  mapOpenLibraryDataToChangeSet: function(data){
    console.log('mapOpenLibraryDataToChangeSet called');
    return data.map(function(change, idx){
      return {
        "when": convertDate(change.timestamp),
        "who": change.author.key,
        "description": change.comment
      }
    });
  },
  componentDidMount: function(){
    console.log('Doing Ajax Call');
    $.ajax({
      url: 'http://openlibrary.org/recentchanges.json?limit=10',
      context: this,
      dataType: 'json',
      type: 'GET'
    }).done(function(data){
      var changeSets = this.mapOpenLibraryDataToChangeSet(data);
      this.setState({
        changeSets: changeSets
      });
    });
  },
  propTypes: {
    headings: React.PropTypes.array,
  },
  render: function(){
    return (<div>
      <h1>{this.props.title}</h1>
      <RecentChangesTable>
        <RecentChangesTable.Headings headings={this.props.headings} />
        <Rows changeSets={this.state.changeSets} />
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

var headings = ['Updated At', 'Author', 'Change'];

var title = 'Recent Changes';

function convertDate(dateStr){
  var newDate = new Date(dateStr);
  var dd = newDate.getDate();
  var mm = newDate.getMonth()+1;

  var yyyy = newDate.getFullYear();
  if(dd<10){
      dd='0'+dd;
  } 
  if(mm<10){
      mm='0'+mm;
  } 
  var newDate = dd+'/'+mm+'/'+yyyy;
  return newDate
};

var props = {
  headings: headings,
  title: title
};

React.render(<App {...props} />, document.body);