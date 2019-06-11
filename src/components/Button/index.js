import React from 'react';
import { Button as Btn, Icon } from '@material-ui/core';

const Button = ({ children, variant, icon, color }) => (
    <Btn color={color} size="large" fullWidth variant={variant}>
        {children}
        <Icon>{icon}</Icon>
    </Btn>
);

export default Button;
