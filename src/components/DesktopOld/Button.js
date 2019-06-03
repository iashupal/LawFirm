import React, { Component } from 'react';
import btn01_left_2 from 'assets/images/icons/btn01_left_2.gif';

class Button extends Component {
  render() {
    return (
      <span
        style={{
          borderStyle: 'solid',
          borderColor: '#CCCCCC',
          borderWidth: '1px',
          paddingRight: '10px',
          paddingLeft: '5px',
          borderRadius: '3px',
          fontWeight: '300',
          fontSize: '12px',
          color: '#000',
          cursor: 'pointer',
        }}
        onClick={e => {
          this.props.handleClick();
        }}
        role="button"
        tabIndex="-1"
      >
        <img src={btn01_left_2} alt="" style={{ paddingRight: '3px' }} />
        {this.props.name}
      </span>
    );
  }
}

export default Button;
