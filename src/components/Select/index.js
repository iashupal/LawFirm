import React from 'react';
import { Dropdown } from 'office-ui-fabric-react/lib/Dropdown';
import PropTypes from 'prop-types';

function Select({
    options,
    placeholder,
    label,
    styles,
    onChange,
    selectedKey
}) {
    return (
        <Dropdown
            placeholder={placeholder}
            label={label}
            options={options}
            styles={styles}
            onChange={(event, option, index) => onChange(event, option, index)}
            selectedKey={selectedKey}
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

export default Select;
