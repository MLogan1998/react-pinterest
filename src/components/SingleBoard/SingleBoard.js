import React from 'react';
import PropTypes from 'prop-types';
import boardsDat from '../../helpers/data/boardsData';
import Pins from '../pins/Pins';
import pinData from '../../helpers/data/pinData';

class SingleBoard extends React.Component {
  static propTypes = {
    setSingleBoard: PropTypes.func.isRequired,
    boardId: PropTypes.string.isRequired,
  }

  state = {
    board: {},
    pins: [],
  }

  componentDidMount() {
    const { boardId } = this.props;
    boardsDat.singleBoardByBoardId(boardId)
      .then((response) => this.setState({ board: response.data }))
      .catch((err) => console.error(err));
    pinData.getPinsByBoardId(boardId)
      .then((pins) => this.setState({ pins }))
      .catch((err) => console.error(err));
  }

  render() {
    const { setSingleBoard } = this.props;
    const { board, pins } = this.state;
    const pinCard = pins.map((pin) => <Pins key={pin.id} pin={pin} setSingleBoard={setSingleBoard} />);

    return (
      <div>
        <h4>{board.title}</h4>
        <button className="btn btn-danger" onClick={() => { setSingleBoard(''); }}>back</button>
        {pinCard}
      </div>
    );
  }
}

export default SingleBoard;
