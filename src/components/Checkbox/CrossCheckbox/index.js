import React from 'react';
import '../../../styles/ui/_crosscheckbox.scss';

export default function CrossCheckbox({ checked, label }) {
    return (
        <div>
            <input className="css-checkbox" type="checkbox" checked={checked} />
            <label className="css-label">{label}</label>
        </div>
    );
}
