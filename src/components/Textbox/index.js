import React from 'react';
import PropTypes from 'prop-types';
import { TextField } from 'office-ui-fabric-react/lib/TextField';

function Textbox({ placeholder, label, value, onChange, multiline }) {
    return (
        <TextField
            label={label}
            placeholder={placeholder}
            value={value}
            onChange={e => onChange(e)}
            multiline={multiline}
        />
    );
}

Textbox.propTypes = {
    label: PropTypes.string,
    value: PropTypes.value,
    placeholder: PropTypes.placeholder,
    onChange: PropTypes.func,
    multiline: PropTypes.bool
};

export default Textbox;
