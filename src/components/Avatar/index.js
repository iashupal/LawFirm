import React from 'react';
import { Avatar as MaterialAvatar } from '@material-ui/core';

export default function Avatar({ children, color }) {
    return <MaterialAvatar color={color}>{children}</MaterialAvatar>;
}
