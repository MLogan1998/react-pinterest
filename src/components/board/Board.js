import React from 'react';

class Board extends React.Component {
  render() {
    const { board } = this.props;
    return (
      <h4>{board.title}</h4>
    );
  }
}

export default Board;
