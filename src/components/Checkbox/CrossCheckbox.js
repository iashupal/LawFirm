import React from 'react';
import '../../styles/ui/_crosscheckbox.scss';
export default class CrossCheckbox extends React.Component{
    render(){
        return(
                 <form>
                    <input id={this.props.crossid} className="css-checkbox" type="checkbox" />
                    <label htmlFor={this.props.crossid} name="demo_lbl_2" className="css-label">select</label>
             </form>
        )
    }
}