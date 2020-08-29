import React from 'react';
import authData from '../../helpers/data/authData';

class PinForm extends React.Component {
  state = {
    title: '',
    description: '',
    imgUrl: '',
    isEditing: false,
  }

  componentDidMount() {
    const { editPin } = this.props;
    if (editPin.title) {
      this.setState({
        title: editPin.title,
        description: editPin.description,
        imgUrl: editPin.imgUrl,
        isEditing: true,
      });
    }
  }

  componentDidUpdate(prevProps) {
    const previousPin = prevProps.editPin;
    const incomingPin = this.props.editPin;

    if (previousPin.title !== incomingPin.title) {
      this.setState({
        description: incomingPin.description || '',
        title: incomingPin.title || '',
        imgUrl: incomingPin.imgUrl || '',
        // eslint-disable-next-line no-unneeded-ternary
        isEditing: incomingPin.title ? true : false,
      });
    }
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

  editPinEvent = (e) => {
    e.preventDefault();
    const { title, description, imgUrl } = this.state;
    const { updatePin, editPin, boardId } = this.props;

    const editedPin = {
      title,
      description,
      imgUrl,
      uid: authData.getUid(),
      boardId,
    };
    updatePin(editPin.id, editedPin);
  }

  closeFormEvent = (e) => {
    e.preventDefault();
    this.props.closeForm();
  };

  render() {
    const {
      description,
      title,
      imgUrl,
      isEditing,
    } = this.state;

    return (
      <form>
        <button className="btn btn-danger mt-2" onClick={this.closeFormEvent}>CLOSE FORM</button>
        <div className="form-group">
          <label for="pinName">Pin Name</label>
          <input type="text" className="form-control" id="pinName" aria-describedby="emailHelp" placeholder="Enter Pin Name" onChange={this.changeNameEvent} value={title}/>
        </div>
        <div className="form-group">
          <label for="pinDescription">Description</label>
          <input type="text" className="form-control" id="pinDescription" aria-describedby="emailHelp" placeholder="Enter Pin Description" value={description} onChange={this.changeDescriptionEvent}/>
        </div>
        <div className="form-group">
          <label for="pinImageUrl">Image URL</label>
          <input type="text" className="form-control" id="pinImageUrl" aria-describedby="emailHelp" placeholder="Enter Pin Image URL" value={imgUrl} onChange={this.changeImgEvent}/>
        </div>
        {
          isEditing
            ? <button className="btn btn-light" onClick={this.editPinEvent}>Edit Pin</button>
            : <button className="btn btn-dark" onClick={this.savePinEvent}>Create Pin</button>
        }
      </form>
    );
  }
}

export default PinForm;
