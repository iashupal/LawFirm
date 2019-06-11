import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';



const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },


});

class Textbox extends React.Component {
    render(){
        const {classes} = this.props;
        return (
            <form className={classes.container} noValidate autoComplete="off">
            <TextField
                id="outlined-bare"
                defaultValue="Bare"
                margin="normal"
                variant="outlined"
                inputProps={{ 'aria-label': 'bare' }}
            />
            </form>
        );
    }
}


Textbox.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(Textbox);