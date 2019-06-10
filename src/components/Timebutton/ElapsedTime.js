import React from 'react';
import formatDuration from 'format-duration';
function elapsedTime(events){
    let elapsed = 0
  for (let i = 0; i < events.length; i+=2){
      const start = events[i]
      const stop = events[i+1] || new Date()
    //   console.log(events[i])
    //   console.log(events[i+1])
    //     console.log(start - stop)
    elapsed += stop - start
  }
  return elapsed
}

export default function ElapsedTime(props){
    return(
        <div>
            {formatDuration(elapsedTime(props.timingEvents))}
        </div>
    )
}