import PropTypes from 'prop-types';
import React from 'react';
import boarddate from '../../helpers/data/boardsData';
import authData from '../../helpers/data/authData';
import smash from '../../helpers/data/smash';
import BoardForm from '../BordForm.js/BoardForm';
import './BoardContainer.scss';

import Board from '../board/Board';

class BoardContainer extends React.Component {
  static propTypes = {
    setSingleBoard: PropTypes.func.isRequired,
  }

  state = {
    boards: [],
  }

  goGetBoards = () => {
    boarddate.getBoardsByUid(authData.getUid())
      .then((boards) => this.setState({ boards }))
      .catch((err) => console.error(err));
  }

  componentDidMount() {
    this.goGetBoards();
  }

  deleteBoard = (boardId) => {
    smash.totallyDeleteBoard(boardId)
      .then(() => {
        this.goGetBoards();
      })
      .catch((err) => console.error(err));
  }

  render() {
    const { boards } = this.state;
    const { setSingleBoard } = this.props;
    const boardCard = boards.map((board) => <Board key={board.id} board={board} setSingleBoard={setSingleBoard} deleteBoard={this.deleteBoard}/>);

    return (
      <div>
        <div>
          <button className="btn btn-warning"></button>
          <BoardForm />
        </div>
      <div className="board-container">{boardCard}</div>
      </div>
    );
  }
}

export default BoardContainer;
