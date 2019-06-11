import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
const styles = theme => ({

  timer : {
    width: '180',
    position: 'relative',
   marginTop: 0,
   marginBottom: 0,
   marginLeft: 'auto',
   marginRight: 'auto',
   backgroundColor: fade(theme.palette.common.white, 0.15),
   '&:hover': {
     backgroundColor: fade(theme.palette.common.white, 0.25),
    
   },
   width: '100%',
     borderRadius: theme.shape.borderRadius,
     [theme.breakpoints.up('sm')]: {
       marginLeft: theme.spacing.unit * 3,
       width: 'auto',
     },
     padding: 5,
  },
  timerInr: {
   paddingTop: theme.spacing.unit,
   paddingRight: theme.spacing.unit,
   paddingBottom: theme.spacing.unit,
   paddingLeft: theme.spacing.unit,
 
   transition: theme.transitions.create('width'),
   width: '100%',
   [theme.breakpoints.up('md')]: {
     width: 180,
   },
   position: 'relative',
   verticalAlign: 'middle',
  },
 
 heading: {
   display: 'inline',
   paddingLeft: '10px',
   verticalAlign: 'text-bottom',
   fontSize: '15px',
   letterSpacing: '.5px',
   color: 'white',
 }
 
})
class TimeButton extends React.Component{
    constructor(props){
        super(props);
        this.state = {
          time: 0,
          start: 0,
          isOn: false,     
        }
        this.startTimer = this.startTimer.bind(this);
        this.stopTimer = this.stopTimer.bind(this);
        this.resetTimer = this.resetTimer.bind(this);
        this.formatDuration = this.formatDuration.bind(this);
    }  

    startTimer() {
        this.setState({
          time: this.state.time,
          start: Date.now() - this.state.time,
          isOn: true
        })
        this.timer = setInterval(() => this.setState({
          time: Date.now() - this.state.start
        }), 1);
      }
      stopTimer() {
        this.setState({isOn: false})
        clearInterval(this.timer)
      }
      resetTimer() {
        this.setState({time: 0})
      } 
       formatDuration(duration) {
       const hours   = Math.floor(duration / 3.6e6).toString(10).padStart(2,'0');
       const minutes = Math.floor((duration % 3.6e6) / 6e4).toString(10).padStart(2,'0');
       const seconds = Math.floor((duration % 6e4) / 1000).toString(10).padStart(2,'0');
       return `${hours}:${minutes}:${seconds}`;
     }
    render(){
      const {classes} = this.props;
        let start = (this.state.time == 0) ?
    <i className="material-icons left" onClick={this.startTimer} style = {{cursor: 'pointer', fontSize: '20px'}}> play_circle_outline</i> :  //start//
            null
        let stop = (this.state.isOn) ?
            <i className="material-icons left" onClick={this.stopTimer} style = {{cursor: 'pointer', fontSize: '20px'}}> pause_circle_outline</i> :  //stop
            null
        let reset = (this.state.time != 0 && !this.state.isOn) ?
            <i className="material-icons right" onClick={this.resetTimer} style = {{cursor: 'pointer', fontSize: '20px'}}>query_builder</i> :  //reset
            null
        let resume = (this.state.time != 0 && !this.state.isOn) ?
           <i className="material-icons left" onClick={this.startTimer} style = {{cursor: 'pointer', fontSize: '20px'}}> play_circle_outline</i> :  //resume
            null
        return(
            <div className={classes.timer}>
                <div className={classes.timerInr}>
                  
                        {start}
                        {stop}
                        {resume}
                        <h3 className={classes.heading}>{this.formatDuration(this.state.time)}</h3>
                        {reset}
                </div>
            </div>
        )
    }
}


TimeButton.propTypes = {
 classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TimeButton);