 import React from 'react';
 import ms from 'pretty-ms';
 import '../../styles/ui/_timebutton.scss';
 import formatDuration from 'format-duration';
//  import timeFormat from 'time-format';
 import moment from 'moment';
 export default class TimeButton extends React.Component{
     constructor(props){
         super(props);
         this.state = {
           timer : {},
           time: 0,
           start: 0,
           isOn: false,     
         }
         this.startTimer = this.startTimer.bind(this);
         this.stopTimer = this.stopTimer.bind(this);
         this.resetTimer = this.resetTimer.bind(this);
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
                         <h3 >{formatDuration(this.state.time)}</h3>
                         {reset}
                 </div>
             </div>
         )
     }
 }

// import React from 'react';
// import ElapsedTime from './ElapsedTime';
// import Buttons from './Buttons';

// export default class TimeButton extends React.Component{
//   constructor(props){
//     super(props);
//     this.state = {
//       timingEvents : [],
//       nounce: 0,
//     }
//     this.addTimerEvent = this.addTimerEvent.bind(this);
//     this.tick = this.tick.bind(this);
//     this.poll = setInterval(this.tick,1000)
//   }
//   tick(){
//     this.setState((prevState) => ({nounce : prevState.nounce+1}))
//   }
//   addTimerEvent(){
//     this.setState({
//       timingEvents: [
//         ...this.state.timingEvents,
//         new Date()
//       ]
//     })
//   }
//   render(){
//     return(
//       <div className="timer">
//         <ElapsedTime
//           timingEvents = {this.state.timingEvents}
//         />
//         <Buttons 
//           handleClick = {this.addTimerEvent}
//           timingEvents = {this.state.timingEvents}
//         />
//       </div>
//     )
//   }
// } 