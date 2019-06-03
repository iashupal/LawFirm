import React, { Component } from 'react';

class ButtonBox extends Component {
  render() {
    return (
      <div
        style={{
          textAlign: 'center',
          paddingTop: '10px',
          paddingBottom: '10px',
        }}
      >
        {this.props.children}
      </div>
    );
  }
}

export default ButtonBox;
