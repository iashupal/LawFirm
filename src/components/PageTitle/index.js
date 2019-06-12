import React from 'react';
import '../../styles/ui/_page-title.scss';

export default function PageTitle({ text, variant, color }) {
    return (
        <div className="page-title">
            <h2>{text}</h2>
        </div>
    );
}
