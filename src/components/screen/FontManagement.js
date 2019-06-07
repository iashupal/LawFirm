import React from 'react';
import DropdownElement from '../DropdownElement/DropdownElement';
import Button from '@material-ui/core/Button';
export default class FontManagement extends React.Component{
    state = {
        option: "1"
    }
    handleOptionsChange = (event) => {
        this.setState({
          option: event.target.value
        });
      }
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
                            {/* <Select className="select" size={4} value={this.state.option} onChange={this.handleOptionsChange}>
                                <option className="opt" value='1'><Button>B</Button></option>
                                <option className="opt" value='2'><Button>I</Button></option>
                                <option className="opt" value='3'><Button>U</Button></option>
                                <option className="opt" value='4'><Button>abc</Button></option>
                            </Select> */}
                            
                                <Button>B</Button>
                                <Button><i className="material-icons icon">
                                    format_italic
                                    </i>
                                </Button>
                                <Button>
                                <i className="material-icons icon">
                                    format_underlined
                                </i>
                                </Button>
                                <Button><strike style={{textTransform: 'lowercase', color: 'gray', fontWeight: '500'}}>abc</strike></Button>
                            
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
                    <textarea className="form-control z-depth-1" rows="6" placeholder="Write something here..."></textarea>
                    </div>
                </div>
            </div>
        )
    }
}