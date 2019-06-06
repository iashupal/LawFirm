import React from 'react';
import '../../styles/ui/_crosscheckbox.scss';
export default class CrossCheckbox extends React.Component{
    render(){
        return(
            <div>
                
                {/* <p>
                    <input type="checkbox" id="c1" name="cb"/>
                    <label htmlFor="c1">Option 01</label>
                </p> */}
                <form>
                    <input id="checkbox7" className="css-checkbox" type="checkbox" />
                    <label htmlFor="checkbox7" name="checkbox7_lbl" class="lite-x-gray">Selected Option</label>
                </form>

               
                
            </div>
        )
    }
}