import React from 'react';
import AutoComplete from '../components/AutoComplete';
import CrossCheckbox from '../components/Checkbox/CrossCheckbox';
import SimpleCheckbox from '../components/Checkbox/SimpleCheckbox';

function handleChange() {
    alert('hello');
}

function ComponentDemo() {
    return (
        <div>
            <CrossCheckbox label="Test Label" onChange={handleChange} />
            <SimpleCheckbox label="Test Label" onChange={handleChange} />
        </div>
    );
}

export default ComponentDemo;
