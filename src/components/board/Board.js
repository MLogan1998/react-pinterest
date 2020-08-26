import React from 'react';
import './Board.scss';

class Board extends React.Component {
  singleBoardEvent = (e) => {
    e.preventDefault();
    const { board, setSingleBoard } = this.props;
    setSingleBoard(board.id);
  }

  editBoardEvent = (e) => {
    e.preventDefault();
    const { editABoard, board } = this.props;
    editABoard(board);
  }

  deleteBoardEvent = (e) => {
    const { board, deleteBoard } = this.props;
    e.preventDefault();
    deleteBoard(board.id);
  }

  render() {
    const { board } = this.props;
    return (
      <div className="single-board card">
      <h4>{board.title}</h4>
      <div className="card-footer">
      <i className="fas fa-info-circle fa-2x" onClick={this.singleBoardEvent}></i>
      <i class="fas fa-pen-square fa-2x" onClick={this.editBoardEvent}></i>
      <i className="far fa-trash-alt fa-2x" onClick={this.deleteBoardEvent}></i>
      </div>
      </div>
    );
  }
}

export default Board;
