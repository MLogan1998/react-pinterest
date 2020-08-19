import React from 'react';
import PropTypes from 'prop-types';
import boardsDat from '../../helpers/data/boardsData';

class SingleBoard extends React.Component {
  static propTypes = {
    setSingleBoard: PropTypes.func.isRequired,
    boardId: PropTypes.string.isRequired,
  }

  state = {
    board: {},
  }

  componentDidMount() {
    const { boardId } = this.props;
    boardsDat.singleBoardByBoardId(boardId)
      .then((response) => this.setState({ board: response.data }))
      .catch((err) => console.error(err));
  }

  render() {
    const { setSingleBoard } = this.props;
    const { board } = this.state;

    return (
      <div>
        <h4>{board.title}</h4>
        <button className="btn btn-danger" onClick={() => { setSingleBoard(''); }}>back</button>
      </div>
    );
  }
}

export default SingleBoard;
