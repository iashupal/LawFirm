import React, { Component } from 'react';

class Title extends Component {
  render() {
    return (
      <React.Fragment>
        <div
          style={{ borderBottom: '1px dotted #e2e2e2', marginBottom: '12px' }}
        >
          <h2
            style={{
              fontSize: '22px',
              height: '30px',
              color: '#2679b5',
            }}
          >
            {this.props.title}
          </h2>
        </div>
      </React.Fragment>
    );
  }
}

export default Title;
