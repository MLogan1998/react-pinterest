import React from 'react';
// import PropTypes from 'prop-types';

import './Pin.scss';

class Pins extends React.Component {
  deletePinEvent = (e) => {
    e.preventDefault();
    const { deletePin, pin } = this.props;
    deletePin(pin.id);
  }

  editPinEvent = (e) => {
    e.preventDefault();
    const { editAPin, pin } = this.props;
    editAPin(pin);
  }

  render() {
    const { pin } = this.props;
    return (
      <div className="card">
      <img className="card-img-top" src={pin.imgUrl} alt={pin.title}></img>
      <div className="card-body">
        <h5 className="card-title">{pin.title}</h5>
        <p className="card-text">{pin.description}</p>
      </div>
      <div className="card-footer">
      <i className="fas fa-trash" onClick={this.deletePinEvent}></i>
      <i className="fas fa-edit" onClick={this.editPinEvent}></i>
      </div>
    </div>
    );
  }
}

export default Pins;
