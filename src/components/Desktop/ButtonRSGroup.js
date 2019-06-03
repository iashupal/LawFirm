import React, { Component } from 'react';
import { ButtonRS } from 'components/Desktop';

class ButtonRSGroup extends Component {
  render() {
    const { list, value, handleClick } = this.props;
    return (
      <React.Fragment>
        {list &&
          list.map((item, index) => (
            <ButtonRS
              onClick={e => {
                const isChecked = value === item.value;
                handleClick(isChecked ? '' : item.value);
              }}
              name={item.name}
              checked={value === item.value}
              key={index}
            />
          ))}
      </React.Fragment>
    );
  }
}

export default ButtonRSGroup;
