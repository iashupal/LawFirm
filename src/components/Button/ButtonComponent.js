import React from 'react';
import Button from '@material-ui/core/Button';

export default class ButtonComponent extends React.Component{
  
    render(){
        // console.log(this.props);
        const {onClick} = this.props;
        return(
            <div>
            <Button variant="contained" color="primary" onClick={onClick}>
                {this.props.text}
                        
                <i className="material-icons icon">
                    {this.props.icon}
                </i> 
            </Button>
            </div>
        )
    }
}