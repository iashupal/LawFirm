import React from 'react';
import { Button, withStyles } from '@material-ui/core';
import * as classnames from 'classnames';
import PropTypes from 'prop-types';

const styles = theme => ({
    root: {
        backgroundColor: 'white',
        border: '1px solid #e4e4e4',
        color: 'gray'
    },
    active: {
        border: `1px solid ${theme.palette.primary.main}`,
        color: theme.palette.primary.main
    }
});

function Tab({ text, selected, classes, onClick }) {
    return (
        <Button
            className={classnames(classes.root, { [classes.active]: selected })}
            onClick={onClick}
        >
            {text}
        </Button>
    );
}

Tab.propTypes = {
    text: PropTypes.string.isRequired,
    selected: PropTypes.bool,
    onClick: PropTypes.func
};

Tab.defaultProps = {
    selected: false
};

export default withStyles(styles)(Tab);
