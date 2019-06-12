import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';

export default function ToolTip({ title, children }) {
    return <Tooltip title={title}>{children}</Tooltip>;
}
