import React from 'react';
import DropdownElement from './DropdownElement';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
export default class FontManagement extends React.Component{
    render(){
        return(
            <div className="font-div">
                <p>Fonts</p>
                <div className="font-wrapper">
                    <div className="font-wrapper-container">
                        <div className="font-drpdwn">
                            <DropdownElement/>
                        </div> 
                        <span className="font-mod-span">|</span>
                        <div className="font-button">
                            <Button>B</Button>
                            <Button>I</Button>
                            <Button>U</Button>
                            <Button>abc</Button>
                        </div>
                        <div className="font-icon">
                         <Button>  
                            <i className="material-icons">
                                format_align_left
                            </i>
                        </Button>
                        <Button>
                            <i className="material-icons">
                                format_align_center
                            </i>
                        </Button> 
                        <Button>
                            <i className="material-icons">
                                format_align_right
                            </i>
                        </Button> 
                        <Button>
                            <i className="material-icons">
                                format_align_justify
                            </i>
                        </Button>
                        </div>
                       
                    </div>
                    <div className="font-textarea">
                    <textarea className="form-control z-depth-1" rows="5" placeholder="Write something here..."></textarea>
                    </div>
                </div>
            </div>
        )
    }
}