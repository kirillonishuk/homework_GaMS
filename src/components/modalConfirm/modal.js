import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './modal.css';

class Modal extends Component {
    componentWillReceiveProps(nextProps) {
        if (nextProps.isVisible === true) {
            this.openPopup()
        } else {
            this.closePopup()
        }

    }

    openPopup = () => {
        ReactDOM.render(
            this.renderModal(),
            document.getElementById('modal-confirm')
        );
    }

    closePopup = () => {
        ReactDOM.render(
            null,
            document.getElementById('modal-confirm')
        );
    }

    renderModal = () => (
        <div className="modal-confirm-container">
            <div className="modal-text">
                {this.props.text}
            </div>
            <button
                className="modal-button modal-button-ok"
                onClick={(event) => this.props.onOKClick(event)}
            >OK</button>
            <button
                className="modal-button modal-button-cancel"
                onClick={(event) => this.props.onCANCELClick(event)}
            >Cancel</button>
        </div>
    )

    render() {
        return null;
    }
}

export default Modal;
