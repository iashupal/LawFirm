import React from 'react';
import '../../styles/ui/_checkbox.scss';
export default class SimpleCheckbox extends React.Component{
    render(){
        console.log(this.props);
        return(
                <div className="checkbox">
                    <input type="checkbox" id={this.props.id} name="" value=""/>
                    <label htmlFor={this.props.id}><span>Checkbox</span></label>
                </div>
        )
    }
}