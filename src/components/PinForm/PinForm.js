import React from 'react';
import authData from '../../helpers/data/authData';

class PinForm extends React.Component {
  state = {
    title: '',
    description: '',
    imgUrl: '',
  }

  changeNameEvent = (e) => {
    e.preventDefault();
    this.setState({ title: e.target.value });
  }

  changeDescriptionEvent = (e) => {
    e.preventDefault();
    this.setState({ description: e.target.value });
  }

  changeImgEvent = (e) => {
    e.preventDefault();
    this.setState({ imgUrl: e.target.value });
  }

  savePinEvent = (e) => {
    e.preventDefault();
    const { boardId, createPin } = this.props;
    const { title, description, imgUrl } = this.state;
    const newPin = {
      title,
      boardId,
      description,
      imgUrl,
      uid: authData.getUid(),
    };
    createPin(newPin);
  }

  render() {
    return (
      <form>
        <div className="form-group">
          <label for="pinName">Pin Name</label>
          <input type="text" className="form-control" id="pinName" aria-describedby="emailHelp" placeholder="Enter Pin Name" onChange={this.changeNameEvent} />
        </div>
        <div className="form-group">
          <label for="pinDescription">Description</label>
          <input type="text" className="form-control" id="pinDescription" aria-describedby="emailHelp" placeholder="Enter Pin Description" onChange={this.changeDescriptionEvent}/>
        </div>
        <div className="form-group">
          <label for="pinImageUrl">Image URL</label>
          <input type="text" className="form-control" id="pinImageUrl" aria-describedby="emailHelp" placeholder="Enter Pin Image URL" onChange={this.changeImgEvent}/>
        </div>
        <button className="btn btn-primary" onClick={this.savePinEvent}>Create Pin</button>
      </form>
    );
  }
}

export default PinForm;
