import React from 'react';
import '../../../styles/ui/_checkbox.scss';

export default function SimpleCheckbox({ checked, label, value, onChange }) {
    return (
        <div className="checkbox">
            <input type="checkbox" checked={checked}/>
            <label>
                <span>{label}</span>
            </label>
        </div>
    );
}
