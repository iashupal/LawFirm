import React from 'react';
import { Paper, withStyles, Divider } from '@material-ui/core';
import PropTypes from 'prop-types';

const styles = theme => ({
    container: {
        padding: 20,
        display: 'grid',
        gridTemplateRows: '40px 1fr'
    },
    content: {
        paddingTop: 20,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 10
    },
    header: {
        padding: 10,
        display: 'grid',
        gridTemplateRows: '1fr 1fr',
        gridTemplateColumns: 'repeat(12,1fr)'
    },
    heading: {
        gridColumnStart: 1,
        gridColumnEnd: 9
    },
    action: {
        gridColumnStart: 12,
        gridColumnEnd: 13,
        marginBottom: 10
    },
    divider: {
        gridColumnStart: 1,
        gridColumnEnd: 13
    }
});

function ContentCard({ classes, title, actionButton, contents }) {
    return (
        <Paper className={classes.container}>
            <div className={classes.header}>
                <div className={classes.heading}>
                    <p>{title}</p>
                </div>
                <div className={classes.action}>{actionButton}</div>
                <Divider className={classes.divider} />
            </div>
            <div className={classes.content}>
                {contents.map(content => (
                    <div>{content}</div>
                ))}
            </div>
        </Paper>
    );
}

ContentCard.propTypes = {
    title: PropTypes.string.isRequired,
    actionButton: PropTypes.element,
    content: PropTypes.array.isRequired
};

ContentCard.defaultProps = {
    contents: []
};

export default withStyles(styles)(ContentCard);
