import React from 'react';
// import '../../styles/layout/_header.scss';
import { Button as Btn, Icon } from '@material-ui/core';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
const styles = theme => ({
    customBtn : {
        width: '100%',
        paddingTop: '10px',
        paddingRight: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,
        paddingLeft: '10px',
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
    <Btn style = {color={color}} size="large" fullWidth variant={variant} backgroundcolor={buttonColor} className={classes.customBtn}>
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
