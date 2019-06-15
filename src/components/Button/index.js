import React from 'react';
import { Button as Btn, Icon, colors } from '@material-ui/core';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import * as classnames from 'classnames';

const styles = theme => ({
    rightIconButtonRoot: {
        width: '100%',
        paddingTop: '10px',
        paddingRight: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,
        paddingLeft: '10px',
        textAlign: 'left',
        borderColor: fade(theme.palette.common.white, 0.75),
        '&:hover': {
            borderColor: fade(theme.palette.common.white, 0.25)
        },
        fontSize: '14px',
        letterSpacing: '.5px'
    },
    rightIconButtonLabel: {
        textAlign: 'left',
        width: '100%',
        justifyContent: 'initial',
        verticalAlign: 'middle'
    },
    warning: {
        backgroundColor: colors.amber[500],
        '&:hover': {
            backgroundColor: colors.amber[700]
        },
        color: 'white'
    },
    primary: {
        backgroundColor: theme.palette.primary.main,
        '&:hover': {
            backgroundColor: theme.palette.primary.dark
        },
        color: 'white'
    },
    success: {
        backgroundColor: colors.green[600],
        '&:hover': {
            backgroundColor: colors.green[700]
        },
        color: 'white'
    },
    danger: {
        backgroundColor: colors.red[600],
        '&:hover': {
            backgroundColor: colors.red[700]
        },
        color: 'white'
    },
    inverted: {
        backgroundColor: colors.grey[400],
        '&:hover': {
            backgroundColor: colors.grey[500]
        },
        color: 'white'
    },
    root: {
        borderRadius: 4
    },
    toolbar: {
        backgroundColor: colors.grey[200],
        border: `1px solid ${colors.grey[500]}`,
        color: colors.grey[700],
        fontSize: '10px'
    }
});

const Button = ({
    children,
    variant,
    icon,
    color,
    classes,
    mode,
    size,
    onClick
}) => {
    if (mode === 'rightIcon') {
        return (
            <Btn
                size={size}
                variant={variant}
                className={classes.rightIconButtonRoot}
                color={color}
                onClick={onClick}
            >
                <span className={classes.rightIconButtonLabel}>{children}</span>
                <Icon style={{ fontSize: '20px' }}>{icon}</Icon>
            </Btn>
        );
    } else if (mode === 'regular') {
        return (
            <Btn
                variant={variant}
                size={size}
                className={classnames({
                    [classes.root]: true,
                    [classes.primary]: color === 'primary',
                    [classes.warning]: color === 'warning',
                    [classes.success]: color === 'success',
                    [classes.danger]: color === 'danger',
                    [classes.inverted]: color === 'inverted'
                })}
                onClick={onClick}
            >
                {children}
            </Btn>
        );
    } else if (mode === 'toolbar') {
        return (
            <Btn
                variant="contained"
                color="default"
                size="small"
                className={classes.toolbar}
                onClick={onClick}
            >
                {children}
            </Btn>
        );
    }
};

Button.propTypes = {
    classes: PropTypes.object,
    mode: PropTypes.string,
    icon: PropTypes.string,
    color: PropTypes.string,
    size: PropTypes.string
};

Button.defaultProps = {
    children: 'Button Text',
    mode: 'regular',
    color: 'default',
    size: 'medium',
    variant: 'contained',
    icon: 'home'
};

export default withStyles(styles)(Button);
