import React, { Component } from 'react';

class SearchBox extends Component {
  render() {
    return (
      <table
        style={{
          backgroundColor: '#f4f6fb',
          borderTopStyle: 'solid',
          borderTopWidth: 2,
          borderTopColor: '#4587d8',
          borderBottomStyle: 'solid',
          borderBottomWidth: 1,
          borderBottomColor: '#9fb9de',
          width: '100%',
          color: '#4b70a5',
          fontSize: 13,
        }}
      >
        <colgroup>
          <col width="120" />
          <col />
          <col width="120" />
          <col />
        </colgroup>
        <tbody>{this.props.children}</tbody>
      </table>
    );
  }
}

export default SearchBox;
