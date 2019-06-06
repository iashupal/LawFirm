import React from 'react';
import '../../styles/ui/_checkbox.scss';
export default class SimpleCheckbox extends React.Component{
    render(){
        return(
            <div>
                
                {/* <p>
                    <input type="checkbox" id="c1" name="cb"/>
                    <label htmlFor="c1">Option 01</label>
                </p> */}
                <div className="checkbox right">
                    <input type="checkbox" id="checkbox" name="" value=""/>
                    <label htmlFor="checkbox"><span>Checkbox</span></label>
                </div>
                
            </div>
        )
    }
}