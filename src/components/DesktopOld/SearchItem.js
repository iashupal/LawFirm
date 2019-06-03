import React, { Component } from 'react';

class SearchItem extends Component {
  render() {
    return (
      <React.Fragment>
        <th
          style={{
            padding: '3px 5px',
            borderRightStyle: 'solid',
            borderRightColor: '#9fb9de',
            borderRightWidth: 1,
            fontWeight: '500',
            height: '30px',
          }}
        >
          {this.props.title}
        </th>
        <td
          style={
            this.props.lastLine
              ? {
                  backgroundColor: 'white',
                  padding: '3px 5px',
                  borderRightStyle: 'solid',
                  borderRightColor: '#9fb9de',
                  borderRightWidth: 1,
                  fontWeight: '300',
                  height: '25px',
                }
              : { backgroundColor: 'white', padding: '3px 5px' }
          }
          colSpan={this.props.colSpan ? this.props.colSpan : 1}
        >
          {this.props.children}
        </td>
      </React.Fragment>
    );
  }
}

export default SearchItem;
