import React, { Component } from 'react';

class LinkButton extends Component {
  render() {
    const { onClick, name } = this.props;
    return (
      <span style={{ cursor: 'pointer', color: 'blue' }} onClick={onClick} role="button" tabIndex="-1">
        {name}
      </span>
    );
  }
}

export default LinkButton;
