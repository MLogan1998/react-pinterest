/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import boardsDat from '../../helpers/data/boardsData';
import Pins from '../pins/Pins';
import PinForm from '../PinForm/PinForm';
import pinData from '../../helpers/data/pinData';
import './SingleBoard.scss';

class SingleBoard extends React.Component {
  static propTypes = {
    setSingleBoard: PropTypes.func.isRequired,
    boardId: PropTypes.string.isRequired,
  }

  state = {
    board: {},
    pins: [],
    formOpen: false,
    editPin: {},
  }

  goGetPins = () => {
    const { boardId } = this.props;

    pinData.getPinsByBoardId(boardId)
      .then((pins) => this.setState({ pins }))
      .catch((err) => console.error(err));
  }

  componentDidMount() {
    const { boardId } = this.props;
    boardsDat.singleBoardByBoardId(boardId)
      .then((response) => this.setState({ board: response.data }))
      .catch((err) => console.error(err));
    this.goGetPins();
  }

  deletePin = (pinId) => {
    pinData.deletePin(pinId)
      .then(() => {
        this.goGetPins();
      })
      .catch((err) => console.error(err));
  }

  createPin = (newPin) => {
    pinData.createPin(newPin)
      .then(() => {
        this.goGetPins();
        this.setState();
      })
      .catch((err) => console.error(err));
  }

  editAPin= (pinToEdit) => {
    this.setState({ formOpen: true, editPin: pinToEdit });
  }

  updatePin = (pinId, editedPin) => {
    pinData.updatePin(pinId, editedPin)
      .then(() => {
        this.goGetPins();
        this.setState({ formOpen: false, editPin: {} });
      })
      .catch((err) => console.error(err));
  }

  closeForm = () => {
    this.setState({ formOpen: false });
  }

  render() {
    const { setSingleBoard, boardId } = this.props;
    const {
      board,
      pins,
      formOpen,
      editPin,
    } = this.state;
    const pinCard = pins.map((pin) => <Pins key={pin.id} pin={pin} setSingleBoard={setSingleBoard} deletePin={this.deletePin} editAPin={this.editAPin}/>);

    return (
      <div>
        <h1>{board.title}</h1>
        <button className="btn btn-danger" onClick={() => { setSingleBoard(''); }}>Back</button>
        {!formOpen ? <button className="btn btn-danger ml-2" onClick={() => { this.setState({ formOpen: true, editPin: {} }); }}>Create New Pin<i className='far fa-plus-square ml-1'></i></button> : '' }
        { formOpen ? <PinForm boardId={boardId} createPin={this.createPin} updatePin={this.updatePin} closeForm={this.closeForm} editPin={editPin}/> : '' }
        <div className="pinContainer">
        {pinCard}
        </div>
      </div>
    );
  }
}

export default SingleBoard;
