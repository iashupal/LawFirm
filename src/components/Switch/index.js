import React from 'react';
import { Switch as MaterialSwitch } from '@material-ui/core';
import PropTypes from 'prop-types';

function Switch({ checked, onChange, value }) {
    return (
        <MaterialSwitch checked={checked} onChange={onChange} value={value} />
    );
}

Switch.propTypes = {
    checked: PropTypes.bool.isRequired,
    onChange: PropTypes.func,
    value: PropTypes.string
};

export default Switch;
