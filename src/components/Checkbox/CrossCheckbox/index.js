import React from 'react';
import '../../../styles/ui/_crosscheckbox.scss';

export default function CrossCheckbox({ checked, label, value, onChange, onClick }) {
    return (
        <div onClick={onClick}>
            <input className="css-checkbox" type="checkbox" checked={checked} onChange={(event) => onChange(event)} value={value}/>
            <label className="css-label">{label}</label>
        </div>
    );
}
