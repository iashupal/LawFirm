import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

class TriggerTooltip extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            open : false,
        }
        this.handleTooltipClose = this.handleTooltipClose.bind(this);
        this.handleTooltipOpen = this.handleTooltipOpen.bind(this);
    }
    handleTooltipClose() {
     this.setState({open: false});
      }
    
      handleTooltipOpen() {
       this.setState({open: true});
      }
    render(){
        const {open} = this.state;
    return (
        <div>
        <Grid container justify="center">
            <Grid item>
            <Tooltip title="Add" interactive>
                <Button >Interactive</Button>
            </Tooltip>
            
            
            </Grid>
            <Grid item>
            <Tooltip  disableFocusListener title="subtract">
                <Button>Focus or touch</Button>
            </Tooltip>
            </Grid>
            <Grid item>
            <Tooltip disableFocusListener disableTouchListener title="Add">
                <Button>Hover</Button>
            </Tooltip>
            </Grid>
            <Grid item>
            <ClickAwayListener onClickAway={this.handleTooltipClose}>
                <div>
                <Tooltip
                    PopperProps={{
                    disablePortal: true,
                    }}
                    onClose={this.handleTooltipClose}
                    open={open}
                    disableFocusListener
                    
                    disableTouchListener
                    title="Add"
                >
                    <Button onClick={this.handleTooltipOpen}>Click</Button>
                </Tooltip>
                </div>
            </ClickAwayListener>
            </Grid>
        </Grid>
        </div>
  );
}
}

export default TriggerTooltip;