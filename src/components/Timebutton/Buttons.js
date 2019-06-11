import React from 'react';

export default function Buttons(props){
    const label = props.timingEvents.length % 2 === 0
    ? <i className="material-icons left"> play_circle_outline</i>
    : <i className="material-icons left"> pause_circle_outline</i>
    return(
        <div>
            <div onClick={props.handleClick}>{label}</div>
        </div>
    )
}