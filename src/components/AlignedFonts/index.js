import React from 'react';
// import DropdownElement from '../DropdownElement/DropdownElement';
// import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
function AlignedFonts({children}) {
    // state = {
    //     option: "1"
    // }
    // handleOptionsChange = (event) => {
    //     this.setState({
    //       option: event.target.value
    //     });
    //   }
    // render(){
        return(
            <div className="font-div">
                <p>Fonts</p>
                <div className="font-wrapper">
                    {children}
                   
                </div>
            </div>
        )
    // }
}


export default AlignedFonts;