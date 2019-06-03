import React, { Component } from 'react';
import { Button } from 'reactstrap';

class ButtonRS extends Component {
  render() {
    return (
      <Button
        color="primary"
        size="sm"
        style={{
          backgroundColor: '#EAEAEA',
          borderColor: '#EAEAEA',
          color: 'rgb(87, 99, 115)',
        }}
        onClick={this.props.onClick}
      >
        {this.props.checked && (
          <React.Fragment>
            <i className="zmdi zmdi-check zmdi-hc-lg" style={{ paddingRight: '5px' }} />
          </React.Fragment>
        )}
        <span style={{ fontSize: '13px' }}>{this.props.name}</span>
      </Button>
    );
  }
}

export default ButtonRS;
