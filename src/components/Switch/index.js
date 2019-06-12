import React from 'react';
import '../../styles/ui/_switchbutton.scss';

export default function Switch() {
    return (
        <div>
            <label className="switch">
                <input type="checkbox" />
                <span className="slider round" />
            </label>
        </div>
    );
}
