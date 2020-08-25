import React from 'react';
import authData from '../../helpers/data/authData';

import './BoardForm.scss';

class BoardForm extends React.Component {
  state = {
    title: '',
    description: '',
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

  render() {
    return (
      <form>
        <div className="form-group">
          <label for="boardName">Board Name</label>
          <input type="text" className="form-control" id="boardName" aria-describedby="emailHelp" placeholder="Enter Board Name" onChange={this.changeNameEvent} />
        </div>
        <div className="form-group">
          <label for="description">Description</label>
          <input type="text" className="form-control" id="description" aria-describedby="emailHelp" placeholder="Enter Board Description" onChange={this.changeDescriptionEvent}/>
        </div>
        <button className="btn btn-primary" onClick={this.saveBoardEvent}>Create Board</button>
      </form>
    );
  }
}

export default BoardForm;
