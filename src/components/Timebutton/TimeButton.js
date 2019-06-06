import React from 'react';
import ms from 'pretty-ms';
import '../../styles/ui/_timebutton.scss';
export default class TimeButton extends React.Component{
    constructor(props){
        super(props)
        this.state = {
          time: 0,
          start: 0,
          isOn: false
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
        let start = (this.state.time == 0) ?
            <i className="material-icons left" onClick={this.startTimer}> play_circle_outline</i> :  //start//
            null
        let stop = (this.state.isOn) ?
            <i className="material-icons left" onClick={this.stopTimer}> pause_circle_outline</i> :  //stop
            null
        let reset = (this.state.time != 0 && !this.state.isOn) ?
            <i className="material-icons left" onClick={this.resetTimer}>play_circle_outline</i> :  //reset
            null
        let resume = (this.state.time != 0 && !this.state.isOn) ?
           <i className="material-icons left" onClick={this.startTimer}> play_circle_outline</i> :  //resume
            null
        return(
            <div className="timer">
                <div className="timer-inr">
                     
                        {start}
                        {stop}
                        {/* {reset} */}
                        {resume}
                        <h3>{ms(this.state.time)}</h3>
                        
                        
                        <i className="material-icons right">query_builder</i>
                </div>
            </div>
        )
    }
}