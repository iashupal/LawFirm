import React from 'react';
import { Paper, withStyles, Divider } from '@material-ui/core';
import PropTypes from 'prop-types';

const styles =  ({
    container: {
        padding: 20,
        display: 'grid',
        gridTemplateRows: '40px 1fr',
        borderRadius: '8px'
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
        gridColumnEnd: 10,
        alignSelf: 'center'
    },
    action: {
        gridColumnStart: 10,
        gridColumnEnd: 13,
        alignSelf: 'center'
    },
    divider: {
        gridColumnStart: 1,
        gridColumnEnd: 13,
        marginTop: 10
    },
    content: {
        display: 'flex',
        flex: 1,
        flexDirection: 'row',
        marginTop: 45,
        padding: 10
    },
    contents: {
        flex: 1
    }
});

function ContentCard ({
    classes,
    title,
    actionButton,
    contents,
    onActionClick,
    mode
}) {
   
    return (
        <Paper className={classes.container}>
            <div className={classes.header}>
                <h2 className={classes.heading}>{title}</h2>
                
                <div className={classes.action} onClick={onActionClick}>
                    {actionButton}
                </div >
                <Divider className={classes.divider} />
            </div>
            <div className={classes.content}>
                {contents.map(content => (
                    <div className={classes.contents}>{content}</div>
                ))}
            </div>
        </Paper>
    );
}
    


ContentCard.propTypes = {
    title: PropTypes.string.isRequired,
    actionButton: PropTypes.element,
    contents: PropTypes.array.isRequired,
    onActionClick: PropTypes.func
};

ContentCard.defaultProps = {
    contents: []
};

export default withStyles(styles)(ContentCard);
