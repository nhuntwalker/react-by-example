import React from 'react';

var BookStore = React.createClass({
  getInitialState() {
    return (
      {
        books: [
          { name: 'Zero to One', author: 'Peter Thiel'},
          { name: 'Monk who sold his Ferrari', author: 'Robin Sharma'},
          { name: 'Wings of Fire', author: 'A.P.J. Abdul Kalam'},
        ],
        selectedBooks: []
      }
    );
  },
  _renderBook(book) {
    return (<div className="checkbox" key={book.id}>
      <label>
        <input type="checkbox" value={book.name} onChange={this.handleSelectedBooks}/>
        {book.name} -- {book.author}
      </label>
    </div>);
  },
  handleSelectedBooks(event){
    var selectedBooks = this.state.selectedBooks;
    var index = selectedBooks.indexOf(event.target.value);

    if (event.target.checked) {
      if (index === -1) {
        selectedBooks.push(event.target.value);
      }
    } else {
      selectedBooks.splice(index, 1);
    }

    this.setState({selectedBooks: selectedBooks});
  },
  render() {
    return (<div>
      <h3>Choose from wide variety of books available in our store.</h3>
      <form onSubmit={this.handleSubmit}>
        { this.state.books.map((book) => {
          return (this._renderBook(book));
        }) }
        <input type="submit" className="btn btn-success" />
      </form>
    </div>);
  },
  handleSubmit(event) {
    console.log(event);
    event.preventDefault();
    console.log("Form submitted");
  }
});

var BookList = React.createClass({
  getInitialState() {
    return (
      { books: [
        { name: 'Zero to One', author: 'Peter Thiel'},
        { name: 'Monk who sold his Ferrari', author: 'Robin Sharma'},
        { name: 'Wings of Fire', author: 'A.P.J. Abdul Kalam'},
      ]}
    );
  },
  _renderBook(book) {
    return (
      <div className="checkbox">
        <label>
          <input type="checkbox" /> {book.name} -- {book.author}
        </label>
      </div>
    );
  },
  render() {
    return (
      <div>
        <h3>
          Choose from a wide variety of books available in our store.
        </h3>
        <form onSubmit={this.handleSubmit}>
          { 
            this.state.books.map((book) => {
              return (this._renderBook(book));
            }) 
          }
          <input type="submit" className="btn btn-success" />
        </form>
      </div>
    );
  },
  handleSubmit(event) {
    console.log(event);
    event.preventDefault();
    console.log("Form submitted");
  }
});

var ShippingDetails = React.createClass({
  render() {
    return (
      <h1>Enter your shipping information.</h1>
    );
  }
});

var DeliveryDetails = React.createClass({
  render() {
    return (
      <h1>Choose your delivery options here.</h1>
    );
  }
});