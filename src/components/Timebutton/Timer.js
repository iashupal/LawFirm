import React from 'react';
import ElapsedTime from './ElapsedTime';
import Buttons from './Buttons';

export default class TimeButton extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      timingEvents : [],
      nounce: 0,
    }
    this.addTimerEvent = this.addTimerEvent.bind(this);
    this.tick = this.tick.bind(this);
    this.poll = setInterval(this.tick,1000)
  }
  tick(){
    this.setState((prevState) => ({nounce : prevState.nounce+1}))
  }
  addTimerEvent(){
    this.setState({
      timingEvents: [
        ...this.state.timingEvents,
        new Date()
      ]
    })
  }
  render(){
    return(
      <div className="timer">
          <div className="timer-inr">
            <Buttons 
            handleClick = {this.addTimerEvent}
            timingEvents = {this.state.timingEvents}
            />
            <ElapsedTime
            timingEvents = {this.state.timingEvents}
            />
            
        </div>
      </div>
    )
  }
} 