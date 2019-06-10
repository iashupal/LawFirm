 import React from 'react';
 import '../../styles/ui/_timebutton.scss';
 export default class TimeButton extends React.Component{
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
                         <h3 >{this.formatDuration(this.state.time)}</h3>
                         {reset}
                 </div>
             </div>
         )
     }
 }

