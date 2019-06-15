import React from 'react';
import PropTypes from 'prop-types';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { withStyles } from '@material-ui/core';
const Accordian = ({ title, classes, contents }) => {
    return (
        <ExpansionPanel className="expansionPanelWrapper">
            <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                className={classes.panelBorder}
            >
                <Typography className={classes.accordTitle}>{title}</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails className={classes.contents}>
                {contents.map(content => (<div className={classes.content}>{content}</div>))}
            </ExpansionPanelDetails>
        </ExpansionPanel>
    );
};
const styles = {
expansionPanelWrapper: {
    borderRadius: '10px',
    marginTop: 5,
    marginBotton: 5,
},
accordTitle: {
    fontSize: '18px', 
},
panelBorder: {
    borderBottom: '1px solid lightgray',
    
},
contents:{  
    flex: 1,
},
content: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    padding: 10
},
}
Accordian.propTypes = {
    title: PropTypes.string.isRequired,
    contents: PropTypes.array.isRequired,
};

Accordian.defaultProps = {
    title: 'Accordian Title Here',
    contents: []
};


export default withStyles(styles)(Accordian);
