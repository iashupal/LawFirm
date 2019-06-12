import * as React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

export default function Loading({ title, color }) {
    return (
        <div>
            <CircularProgress color={color} />
            {title && <p>{title}</p>}
        </div>
    );
}
