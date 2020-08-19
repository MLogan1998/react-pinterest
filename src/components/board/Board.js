import React from 'react';

class Board extends React.Component {
  singleBoardEvent = (e) => {
    e.preventDefault();
    const { board, setSingleBoard } = this.props;
    setSingleBoard(board.id);
  }

  render() {
    const { board } = this.props;
    return (
      <div>
      <h4>{board.title}</h4>
      <button className="btn btn-primary" onClick={this.singleBoardEvent}>Details</button>
      </div>
    );
  }
}

export default Board;
