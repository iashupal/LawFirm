import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
function TextArea({ placeholder, label, value, onChange, multiline, rows, classes }) {
    return (
        <textarea
            label={label}
            placeholder={placeholder}
            value={value}
            onChange={e => onChange(e)}
            multiline={multiline}
            rows={rows}
            className={classes.textareaField}

        />
    );
}

TextArea.propTypes = {
    label: PropTypes.string,
    value: PropTypes.value,
    placeholder: PropTypes.placeholder,
    onChange: PropTypes.func.isRequired,
    multiline: PropTypes.bool
};
const styles = {
    textareaField: {
        width: '100%',
        borderColor: 'lightgray',
        borderRadius: '5px',
    
    }
}
export default withStyles(styles)(TextArea);
