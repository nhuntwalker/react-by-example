import React from 'react';
import {SetIntervalMixin, CartTimeoutMixin} from './mixins';
import {ModalAlertTimeout} from './modals';


var BookStore = React.createClass({
    getInitialState() {
        return ({ currentStep: 1, formValues: {}, cartTimeout: 60 * 15 });
    },
    updateFormData(formData) {
        var formValues = Object.assign({}, this.state.formValues, formData);
        var nextStep = this.state.currentStep + 1;
        this.setState({ formValues: formValues, currentStep: nextStep });
    },
    updateCartTimeout(timeout){
        this.setState({ cartTimeout: timeout });
    },
    alertCartTimeout(){
        React.render(<ModalAlertTimeout />, document.getElementById('modalAlertTimeout'));
        this.setState({ currentStep: 10, formValues: {}, cartTimeout: 1 });
    },
    render() {
        switch (this.state.currentStep) {
            case 1:
                return <BookList updateFormData={ this.updateFormData } />;
            case 2:
                return <ShippingDetails updateFormData={ this.updateFormData }
                                        cartTimeout={ this.state.cartTimeout }
                                        updateCartTimeout={ this.updateCartTimeout }
                                        alertCartTimeout={ this.alertCartTimeout } />;
            case 3:
                return <DeliveryDetails updateFormData={ this.updateFormData }
                                        cartTimeout={ this.state.cartTimeout }
                                        updateCartTimeout={ this.updateCartTimeout }
                                        alertCartTimeout={ this.alertCartTimeout } />;
            case 4:
                return <Confirmation data={ this.state.formValues } updateFormData={ this.updateFormData } />;
            case 5:
                return <Success data={ this.state.formValues } />;
            case 10:
                // Handle the case of Cart Timeout
                return <div><h2>Your cart timed out, please try again!</h2></div>;

            default:
                return <BookList updateFormData={ this.updateFormData } />;
        };
    }
});

var BookList = React.createClass({
  getInitialState() {
    return (
      {
        books: [
          { name: 'Zero to One', author: 'Peter Thiel' },
          { name: 'Monk who sold his Ferrari', author: 'Robin Sharma' },
          { name: 'Wings of Fire', author: 'A.P.J. Abdul Kalam' },
        ],
        selectedBooks: [],
        error: false
      }
    );
  },
  _renderError() {
    if (this.state.error) {
        return (
            <div className="alert alert-danger">
                { this.state.error }
            </div>
        );
    }
  },
  _renderBook(book) {
    return (<div className="checkbox" key={ book.id }>
      <label>
        <input type="checkbox" value={ book.name } onChange={ this.handleSelectedBooks }/>
        { book.name } -- { book.author }
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
  handleSubmit(event) {
    event.preventDefault();
    if (this.state.selectedBooks.length === 0) {
        this.setState({ error: 'Please choose at least one book to continue' });
    } else {
        this.setState({ error: false });
        this.props.updateFormData({ selectedBooks: this.state.selectedBooks });
    }
  },
  render() {
    var errorMessage = this._renderError();
    return (
    <div>
      <h3>Choose from wide variety of books available in our store.</h3>
      {errorMessage}
      <form onSubmit={ this.handleSubmit}>
        { this.state.books.map((book) => { return (this._renderBook(book)); })}
        <input type='submit' className='btn btn-success' />
      </form>
    </div>
    );
  },
});

var ShippingDetails = React.createClass({
    propTypes: {
      alertCartTimeout: React.PropTypes.func.isRequired,
      updateCartTimeout: React.PropTypes.func.isRequired,
      cartTimeout: React.PropTypes.number.isRequired
    },

    mixins: [SetIntervalMixin, CartTimeoutMixin],
    getInitialState() {
        return ({
            fullName: '',
            contactNumber: '',
            shippingAddress: '',
            error: false,
            cartTimeout: this.props.cartTimeout
        });
    },
    _renderError() {
        if (this.state.error) {
            return (
                <div className="alert alert-danger">
                    { this.state.error}
                </div>
            );
        }
    },
    _validateInput() {
        if (this.state.fullName === '') {
            this.setState({error: "Please enter full name"});
        } else if (this.state.contactNUmber === '') {
            this.setState({error: "Please enter contact number"});
        } else if (this.state.shippingAddress === '') {
            this.setState({error: "Please enter shipping address"});
        } else {
            this.setState({error: false});
            return true;
        }
    },
    handleSubmit(event) {
        event.preventDefault();
        var formData = {
            fullName: this.state.fullName,
            contactNumber: this.state.contactNumber,
            shippingAddress: this.state.shippingAddress
        };
        if (this._validateInput()) {
            this.props.updateFormData(formData);
        }
    },
    handleChange(event, attribute) {
        var newState = this.state;
        newState[attribute] = event.target.value;
        this.setState(newState);
    },
    render() {
        var errorMessage = this._renderError();
        var minutes = Math.floor(this.state.cartTimeout / 60);
        var seconds = this.state.cartTimeout - minutes * 60;

        return (
            <div>
                <h1>Enter your shipping information.</h1>
                { errorMessage }
                <div style={{ width: 200 }}>
                    <form onSubmit={ this.handleSubmit}>
                        <div className="form-group">
                            <input className="form-control"
                                    type="text"
                                    placeholder="Full Name"
                                    value={ this.state.fullName}
                                    onChange={(event) => this.handleChange(event, 'fullName')} />
                        </div>
                        <div className="form-group">
                            <input className="form-control"
                                    type="text"
                                    placeholder="Contact number"
                                    value={ this.state.contactNumber}
                                    onChange={(event) => this.handleChange(event, 'contactNumber')} />
                        </div>
                        <div className="form-group">
                            <input className="form-control"
                                    type="text"
                                    placeholder="Shipping Address"
                                    value={ this.state.shippingAddress}
                                    onChange={(event) => this.handleChange(event, 'shippingAddress')} />
                        </div>
                        <div className="form-group">
                            <button type="submit" ref="submit" className="btn btn-success">Submit</button>
                        </div>
                    </form>
                </div>
                <div className="well">
                  <span className="glyphicon glyphicon-time" aria-hidden="true"></span> You have { minutes } Minutes and { seconds } Seconds before confirming order.
                </div>
            </div>
        );
    }
});

var DeliveryDetails = React.createClass({
    propTypes: {
      alertCartTimeout: React.PropTypes.func.isRequired,
      updateCartTimeout: React.PropTypes.func.isRequired,
      cartTimeout: React.PropTypes.number.isRequired
    },
    mixins: [SetIntervalMixin, CartTimeoutMixin], // imports and overwrites the existing class methods
    getInitialState() {
        return ({ deliveryOption: 'Primary', cartTimeout: this.props.cartTimeout });  
    },
    componentWillReceiveProps(newProps) {
      this.setState({ cartTimeout: newProps.cartTimeout });
    },
    handleChange(event) {
        this.setState({ deliveryOption: event.target.value });
    },
    handleSubmit(event) {
        event.preventDefault();
        this.props.updateFormData(this.state);
    },
    render() {
        var minutes = Math.floor(this.state.cartTimeout / 60);
        var seconds = this.state.cartTimeout - minutes * 60;

        return (
            <div>
                <h1>Choose your delivery options here.</h1>
                <div style={{ width: 200 }}>
                    <form onSubmit={ this.handleSubmit }>
                        <div className="radio">
                            <label>
                                <input type="radio"
                                       checked={ this.state.deliveryOption === "Primary" }
                                       value="Primary"
                                       onChange={ this.handleChange } />
                                       Primary -- Next Day Delivery
                            </label>
                        </div>
                        <div className="radio">
                            <label>
                                <input type="radio"
                                       checked={ this.state.deliveryOption === "Normal" }
                                       value="Normal"
                                       onChange={ this.handleChange } />
                                       Normal -- 3-4 Days
                            </label>
                        </div>
                        <button className="btn btn-success" type="submit">Submit Information</button>
                    </form>
                </div>
                <div className="well">
                  <span className="glyphicon glyphicon-time" aria-hidden="true"></span> You have { minutes } Minutes and { seconds } Seconds before confirming order.
                </div>
            </div>
        );
    }
});

var Confirmation = React.createClass({
    handleSubmit(event) {
        event.preventDefault();
        this.props.updateFormData(this.props.data);
    },
    render() {
        return (
            <div>
                <h1>Are you sure you want to submit the data?</h1>
                <form onSubmit={ this.handleSubmit}>
                    <div>
                        <strong>Full Name</strong> : { this.props.data.fullName }
                    </div><br />
                    <div>
                        <strong>Contact Number</strong> : { this.props.data.contactNumber }
                    </div><br />
                    <div>
                        <strong>Shipping Address</strong> : { this.props.data.shippingAddress }
                    </div><br />
                    <div>
                        <strong>Selected Books</strong> : { this.props.data.selectedBooks.join(", ") }
                    </div><br />
                    <button className="btn btn-success" type="submit">Place order</button>
                </form>
            </div>
        );
    }
});

var Success = React.createClass({
    render(){
        var numberOfDays = "1 to 2";

        if (this.props.data.deliveryOption === "Normal") {
            numberOfDays = "3 to 4";
        }
        return (
            <div>
                <h2>Thank you for shopping with us, { this.props.data.fullName}.</h2>
                <h4>
                    You will soon get { this.props.data.selectedBooks.join(", ")} at { this.props.data.shippingAddress} in approximately {numberOfDays} days.
                </h4>
            </div>
        );
    }
});

module.exports = BookStore;