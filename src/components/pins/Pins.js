import React from 'react';

class Pins extends React.Component {
  render() {
    const { pin } = this.props;
    return (
      <h4>{pin.title}</h4>
    );
  }
}

export default Pins;
