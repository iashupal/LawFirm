import React from 'react';
import ms from 'pretty-ms';
import '../../styles/ui/_timebutton.scss';
// import moment = require('moment');
import moment from 'moment';
export default class TimeButton extends React.Component{
    constructor(props){
        super(props);
        // let fixDate = (new Date()).setHours(0,0,0); // for 3:00:00 pm
        // let currDate = new Date();
        // let obj = {
        //   "h": hours,
        //   "m": minutes,
        //   "s": seconds
        // };
        this.state = {
          time: 0,
          start: 0,
          isOn: false,
          // fixDate,
          //  diff: fixDate-currDate,
          
        
        }
        this.startTimer = this.startTimer.bind(this)
        this.stopTimer = this.stopTimer.bind(this)
        this.resetTimer = this.resetTimer.bind(this)
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
    render(){
      // const { diff } = this.state;
      //   const hours = Math.floor(diff/(60*60*1000));
      //   const mins = Math.floor((diff-(hours*60*60*1000))/(60*1000));
      //   const secs = Math.floor((diff-(hours*60*60*1000)-(mins*60*1000))/1000);
        let start = (this.state.time == 0) ?
            <i className="material-icons left" onClick={this.startTimer}> play_circle_outline</i> :  //start//
            null
        let stop = (this.state.isOn) ?
            <i className="material-icons left" onClick={this.stopTimer}> pause_circle_outline</i> :  //stop
            null
        let reset = (this.state.time != 0 && !this.state.isOn) ?
            <i className="material-icons right" onClick={this.resetTimer}>query_builder</i> :  //reset
            null
        let resume = (this.state.time != 0 && !this.state.isOn) ?
           <i className="material-icons left" onClick={this.startTimer}> play_circle_outline</i> :  //resume
            null
        return(
            <div className="timer">
                <div className="timer-inr">
                     
                        {start}
                        {stop}
                        {resume}
                        {/* <h2>{moment.HTML5_FMT.TIME_SECONDS}</h2> */}
                        {/* <h2>{moment().format('LTS')}</h2> */}
                        <h3 format="HH:mm:ss">{ms(this.state.time)}</h3>
                        {reset}
                </div>
            </div>
        )
    }
}
