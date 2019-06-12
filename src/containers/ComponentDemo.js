import React from 'react';
import Button from '../components/Button';

function ComponentDemo() {
    return (
        <div>
            <CrossCheckbox label="Test Label" onChange={handleChange} />
            <SimpleCheckbox label="Test Label" onChange={handleChange} />
           
        </div>
    );
}

export default ComponentDemo;
