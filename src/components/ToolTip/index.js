import React from './node_modules/react';
import Tooltip from './node_modules/@material-ui/core/Tooltip';

export default function ToolTip({ title, children }) {
    return <Tooltip title={title}>{children}</Tooltip>;
}
