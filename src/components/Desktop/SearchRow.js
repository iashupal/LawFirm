import React, { Component } from 'react';

class SearchRow extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="row" style={{ minHeight: '42px' }}>
          {this.props.children}
        </div>
        {!this.props.isLast && (
          <div
            style={{
              borderTop: '1px dashed #e7eaec',
              color: '#ffffff',
              backgroundColor: '#ffffff',
              height: '1px',
              margin: '3px 0',
            }}
          />
        )}
      </React.Fragment>
    );
  }
}

export default SearchRow;
