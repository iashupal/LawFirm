import React, { Component } from 'react';

class SearchBox extends Component {
  render() {
    return (
      <div
        style={{
          color: '#576373',
          borderColor: '#c5d0dc',
          border: '1px solid #dddddd',
          backgroundColor: '#FCFCFC',
          padding: '7px 25px 10px 25px',
          borderRadius: '5px',
          fontSize: '13px',
        }}
      >
        {this.props.children}
      </div>
    );
  }
}

export default SearchBox;
