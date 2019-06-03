import React, { Component } from 'react';

class Body extends Component {
  render() {
    return (
      <div
        style={{
          paddingTop: '20px',
          paddingBottom: '20px',
          paddingLeft: '40px',
          paddingRight: '40px',
          backgroundColor: 'white',
          height: '100%',
        }}
      >
        {this.props.children}
      </div>
    );
  }
}

export default Body;
