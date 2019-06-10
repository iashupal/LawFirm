import React from 'react';

export default function Buttons(props){
    const label = props.timingEvents.length % 2 === 0
    ? 'start'
    : 'stop'
    return(
        <div>
            <button onClick={props.handleClick}>{label}</button>
        </div>
    )
}