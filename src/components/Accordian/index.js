import React from 'react';
import PropTypes from 'prop-types';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const Accordian = ({ title, children }) => {
    return (
        <ExpansionPanel>
            <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography>{title}</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>{children}</ExpansionPanelDetails>
        </ExpansionPanel>
    );
};

Accordian.propTypes = {
    title: PropTypes.string.isRequired
};

Accordian.defaultProps = {
    title: 'Accordian Title Here'
};

export default Accordian;
