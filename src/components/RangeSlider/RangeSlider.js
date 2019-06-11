import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/lab/Slider';
import LensIcon from '@material-ui/icons/LensOutlined';

const styles = {
  root: {
    width: 300,
  },
  slider: {
    padding: '22px 0px',
  },
  thumbIcon: {
    borderRadius: '50%',
  },
  thumbIconWrapper: {
    backgroundColor: '#fff',
  },
};

class RangeSlider extends React.Component {
  state = {
    value: 50,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.root}>
        <Slider
          value={value}
          aria-labelledby="slider-icon"
          onChange={this.handleChange}
          classes={{
            root: classes.slider,
            thumbIconWrapper: classes.thumbIconWrapper,
          }}
          thumb={<LensIcon style={{ color: '#2196f3' }} />}
        />
      </div>
    );
  }
}

RangeSlider.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RangeSlider);