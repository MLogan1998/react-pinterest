import React from 'react';
import authData from '../../helpers/data/authData';

import './BoardForm.scss';

class BoardForm extends React.Component {
  state = {
    title: '',
    description: '',
    isEditing: false,
  }

  componentDidMount() {
    const { editBoard } = this.props;
    if (editBoard.title) {
      this.setState({
        title: editBoard.title,
        description: editBoard.description,
        isEditing: true,
      });
    }
  }

  changeNameEvent = (e) => {
    e.preventDefault();
    this.setState({ title: e.target.value });
  }

  changeDescriptionEvent = (e) => {
    e.preventDefault();
    this.setState({ name: e.target.value });
  }

  saveBoardEvent = (e) => {
    e.preventDefault();
    const { title, description } = this.state;
    const { createBoard } = this.props;
    const newBoard = {
      title,
      description,
      uid: authData.getUid(),
    };
    createBoard(newBoard);
  }

  editBoardEvent = (e) => {
    e.preventDefault();
    const { title, description } = this.state;
    const { updateBoard, editBoard } = this.props;

    const editedBoard = {
      title,
      description,
      uid: authData.getUid(),
    };
    updateBoard(editBoard.id, editedBoard);
  }

  render() {
    const {
      description,
      title,
      isEditing,
    } = this.state;

    return (
      <form>
        <div className="form-group">
          <label for="boardName">Board Name</label>
          <input type="text" className="form-control" id="boardName" aria-describedby="emailHelp" placeholder="Enter Board Name" value={title} onChange={this.changeNameEvent} />
        </div>
        <div className="form-group">
          <label for="description">Description</label>
          <input type="text" className="form-control" id="description" aria-describedby="emailHelp" placeholder="Enter Board Description" value={description} onChange={this.changeDescriptionEvent}/>
        </div>
         {
          isEditing
            ? <button className="btn btn-light" onClick={this.editBoardEvent}>Edit Board</button>
            : <button className="btn btn-dark" onClick={this.saveBoardEvent}>Save Board</button>
        }
      </form>
    );
  }
}

export default BoardForm;
