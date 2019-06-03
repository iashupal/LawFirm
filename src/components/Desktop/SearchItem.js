import React, { Component } from 'react';

class SearchItem extends Component {
  render() {
    return (
      <React.Fragment>
        <span
          className="col-md-1"
          style={{
            borderRight: '1px dashed #D7DFE5',
            padding: '10px 12px 5px 12px',
            textAlign: 'right',
            fontWeight: '500',
            fontSize: '13px',
          }}
        >
          {this.props.title}
        </span>
        <span
          className={this.props.oneItem ? 'col-md-11' : 'col-md-5'}
          style={{
            padding: `${this.props.paddingTop ? this.props.paddingTop : 6}px 12px 0px 12px`,
          }}
        >
          {this.props.children}
        </span>
      </React.Fragment>
    );
  }
}

export default SearchItem;
