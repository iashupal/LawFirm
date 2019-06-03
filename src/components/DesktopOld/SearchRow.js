import React, { Component } from 'react';

class SearchRow extends Component {
  render() {
    return (
      <tr
        style={{
          borderBottomStyle: 'solid',
          borderBottomColor: '#9fb9de',
          borderBottomWidth: 1,
        }}
      >
        {this.props.children}
      </tr>
    );
  }
}

export default SearchRow;
