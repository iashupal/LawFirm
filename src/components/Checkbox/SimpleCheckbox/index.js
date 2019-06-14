import React from 'react';
import '../../../styles/ui/_checkbox.scss';

 function SimpleCheckbox({ checked, label, value, onChange, onClick }) {
    return (
        <div className="checkbox" onClick={onClick}>
            <input type="checkbox" checked={checked} checked={checked}  value={value}/>
            <label>
                <span>{label}</span>
            </label>
        </div>
    );
}

export default SimpleCheckbox;