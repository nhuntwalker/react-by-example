import React from 'react';

var ModalAlertTimeout = React.createClass({
    componentDidMount() {
      setTimeout(() => {
        let timeoutModal = this.refs.timeoutModal.getDOMNode();
        $(timeoutModal).modal('show');
      }, 100);
    },
    unMountComponent() {
        React.unmountComponentAtNode(this.getDOMNode().parentNode);
    },
    componentWillUnmount() { // This method is complete guesswork.
      let timeoutModal = this.refs.timeoutModal.getDOMNode();
      $(timeoutModal).on('hidden.bs.modal', this.unMountComponent);  
    },
    render() {
        return (
            <div>
                <div>
                    <div>
                        <div>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">x</span>
                            </button>
                            <h4 className="modal-title">Timeout</h4>
                        </div>
                        <div className="modal-body">
                            <p>The cart has timed-out. Please try again!</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

export {
    ModalAlertTimeout
};