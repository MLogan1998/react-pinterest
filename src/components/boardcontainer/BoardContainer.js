import PropTypes from 'prop-types';
import React from 'react';
import boarddate from '../../helpers/data/boardsData';
import authData from '../../helpers/data/authData';
import './BoardContainer.scss';

import Board from '../board/Board';

class BoardContainer extends React.Component {
  static propTypes = {
    setSingleBoard: PropTypes.func.isRequired,
  }

  state = {
    boards: [],
  }

  componentDidMount() {
    boarddate.getBoardsByUid(authData.getUid())
      .then((boards) => this.setState({ boards }))
      .catch((err) => console.error(err));
  }

  render() {
    const { boards } = this.state;
    const { setSingleBoard } = this.props;
    const boardCard = boards.map((board) => <Board key={board.id} board={board} setSingleBoard={setSingleBoard} />);

    return (
      <div className="board-container">{boardCard}</div>

    );
  }
}

export default BoardContainer;
