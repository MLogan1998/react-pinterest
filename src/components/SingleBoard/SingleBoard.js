import React from 'react';
import PropTypes from 'prop-types';
import boardsDat from '../../helpers/data/boardsData';
import Pins from '../pins/Pins';
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

  render() {
    const { setSingleBoard } = this.props;
    const { board, pins } = this.state;
    const pinCard = pins.map((pin) => <Pins key={pin.id} pin={pin} setSingleBoard={setSingleBoard} deletePin={this.deletePin} />);

    return (
      <div>
        <h1>{board.title}</h1>
        <button className="btn btn-danger" onClick={() => { setSingleBoard(''); }}>Back</button>
        <div className="pinContainer">
        {pinCard}
        </div>
      </div>
    );
  }
}

export default SingleBoard;
