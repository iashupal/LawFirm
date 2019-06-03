import React, { Component } from 'react';

class TableTD extends Component {
  render() {
    const { textAlign } = this.props;
    return (
      <td
        style={{
          padding: '10px',
          borderRightStyle: 'solid',
          borderRightColor: '#E1E1E1',
          borderRightWidth: 1,
          fontWeight: '300',
          height: '25px',
          color: 'black',
          textAlign: textAlign || 'center',
        }}
      >
        {this.props.children}
      </td>
    );
  }
}

export default TableTD;
