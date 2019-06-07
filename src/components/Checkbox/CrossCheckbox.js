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
                    <label htmlFor="checkbox7" name="checkbox7_lbl" className="lite-x-gray">Selected Option</label>
                </form>
                <form>
                    <input id="demo_box_2" className="css-checkbox" type="checkbox" />
                    <label for="demo_box_2" name="demo_lbl_2" className="css-label">select</label>
                    
                </form>

               
                
            </div>
        )
    }
}