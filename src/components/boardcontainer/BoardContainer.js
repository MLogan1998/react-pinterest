/* eslint-disable max-len */
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
    formOpen: false,
    editBoard: {},
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

  createBoard = (newBoard) => {
    boarddate.createBoard(newBoard)
      .then(() => {
        this.goGetBoards();
        this.setState();
      })
      .catch((err) => console.error(err));
  }

  editABoard = (boardToEdit) => {
    this.setState({ formOpen: true, editBoard: boardToEdit });
  }

  updateBoard = (boardId, editedBoard) => {
    boarddate.updateBoard(boardId, editedBoard)
      .then(() => {
        this.goGetBoards();
        this.setState({ formOpen: false, editBoard: {} });
      })
      .catch((err) => console.error(err));
  }

  closeForm = () => {
    this.setState({ formOpen: false });
  }

  render() {
    const { boards, formOpen, editBoard } = this.state;
    const { setSingleBoard } = this.props;
    const boardCard = boards.map((board) => <Board key={board.id} board={board} setSingleBoard={setSingleBoard} deleteBoard={this.deleteBoard} editABoard={this.editABoard} />);

    return (
      <div>
        <div className="mt-2">
          {!formOpen ? <button className="btn btn-warning" onClick={() => { this.setState({ formOpen: true, editBoard: {} }); }}>Create New Board<i className='far fa-plus-square ml-1'></i></button> : '' }
          { formOpen ? <BoardForm createBoard={this.createBoard} editBoard={editBoard} updateBoard={this.updateBoard} closeForm={this.closeForm}/> : '' }
        </div>
      <div className="board-container">{boardCard}</div>
      </div>
    );
  }
}

export default BoardContainer;
