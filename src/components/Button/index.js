import React from 'react';
// import '../../styles/layout/_header.scss';
import { Button as Btn, Icon } from '@material-ui/core';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
const styles = theme => ({
    customBtn : {
        width: '180px',
        paddingTop: '10px',
        paddingLeft: '16px',
        paddingBottom: '10px',
        paddingRight: '16px',
        textAlign: 'left',
        borderColor: fade(theme.palette.common.white, 0.15),
   '&:hover': {
     borderColor: fade(theme.palette.common.white, 0.25),
    
   },
   fontSize: '14px',
    letterSpacing: '.5px',
        
    },
    label:{
        textAlign: 'left',
        width: '100%',
        justifyContent: 'initial',
        verticalAlign: 'middle'
    }
   

})

const Button = ({ children, variant, icon, color, buttonColor, classes }) => (
    <Btn style = {color={color}} size="large" fullWidth variant={variant} backgroundColor={buttonColor} className={classes.customBtn}>
        <span className={classes.label}>
            {children}
        </span>
        <Icon style={{fontSize: '20px'}}>{icon}</Icon>
    </Btn>
);

Button.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(Button);
