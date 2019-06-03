import React, { Component } from 'react';

class Input extends Component {
  render() {
    return (
      <input
        type="text"
        style={{
          borderStyle: 'solid',
          borderWidth: 1,
          borderColor: '#d9d9d9',
          padding: '1px 5px',
          height: '20px',
          lineHeight: '12px',
        }}
        value={this.props.value}
        onChange={this.props.onChange}
      />
    );
  }
}

export default Input;
