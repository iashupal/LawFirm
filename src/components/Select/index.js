import React from 'react';
import { Dropdown } from 'office-ui-fabric-react/lib/Dropdown';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
function Select({
    options,
    placeholder,
    label,
    styles,
    onChange,
    selectedKey, 
    classes
}) {
    return (
        <Dropdown
            placeholder={placeholder}
            label={label}
            options={options}
            styles={styles}
            onChange={(event, option, index) => onChange(event, option, index)}
            selectedKey={selectedKey}
            className = {classes.select}
        />
    );
}

Select.propTypes = {
    options: PropTypes.array.isRequired,
    placeholder: PropTypes.string,
    label: PropTypes.label,
    styles: PropTypes.object,
    onChange: PropTypes.func
};

const styles = {
    select: {
        borderRadius: 5
    }
}
export default withStyles(styles)(Select);
