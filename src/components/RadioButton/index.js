import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
 function RadioButton({ checked, label, value, onChange, classes }) {
    return (
        <div className={classes.radiobtn}>
        <div className="pretty p-default p-round p-smooth padding-pretty">
            <input type="checkbox" checked={checked}/>
            <div className="state p-primary">
                <label>{label}</label>
            </div>
        </div>
         </div>
    );
}


const styles = {
radiobtn: {
    position: 'relative',
    verticalAlign: 'top',
    top: '8px',
    display: 'inline-block',
}
}
RadioButton.propTypes = {
    label: PropTypes.string,
    value: PropTypes.value,
    placeholder: PropTypes.placeholder,
    onChange: PropTypes.func.isRequired,
    multiline: PropTypes.bool
};
export default withStyles(styles)(RadioButton);