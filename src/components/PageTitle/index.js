import React from 'react';
import '../../styles/ui/_page-title.scss';
import {Icon} from '@material-ui/core';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import * as clasnames from 'classnames';
const styles = theme => ({
pageTitle: {
    width: '100%',
    position: 'relative',
},
heading: {
    fontSize: '1.4rem',
    fontWeight: '400',
    display: 'inline-block',
    fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
}, 
icon: {
    fontSize: '1.5rem',
    paddingRight: '2rem',

}
})
 function PageTitle ({ text, color, icon, classes, iconVisible }) {
    return (
        <div className={classes.pageTitle}>
            {iconVisible && (<Icon className={classes.icon} color={color}>{icon}</Icon>)}
            <h2 color={color} className = {classes.heading}>{text}</h2>
        </div>
       
    );
}

PageTitle.propTypes = {
    classes: PropTypes.object,
    icon: PropTypes.string,
    color: PropTypes.string,
    text: PropTypes.string,
}
export default withStyles(styles)(PageTitle);
