import React from 'react';
import InputBase from '@material-ui/core/InputBase';

export default class TextField extends React.Component{
    render(){
        // console.log(this.props);
        return(
           
                <div className="form">
                    <p>{this.props.label}</p>&nbsp;&nbsp;&nbsp;&nbsp;<span>:</span>
                    <p style={{color: 'gray'}} className="inputbase">{this.props.value}</p>
                    
                </div>
           
        )
    }
}