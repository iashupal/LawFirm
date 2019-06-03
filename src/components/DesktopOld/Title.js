import React, { Component } from 'react';
import blet_title from 'assets/images/icons/blet_title.gif';

class Title extends Component {
  render() {
    return (
      <React.Fragment>
        <div
          style={{
            fontSize: '18px',
            fontWeight: 'bold',
            color: '#000000',
          }}
        >
          <img src={blet_title} alt="" />
          <span style={{ paddingLeft: '9px' }}>{this.props.title}</span>
        </div>
        <div
          style={{
            borderTop: 'solid',
            borderWidth: '2.5px',
            borderColor: '#D8D8D8',
            marginTop: '4px',
            marginBottom: '10px',
            width: '100%',
          }}
        />
      </React.Fragment>
    );
  }
}

export default Title;
