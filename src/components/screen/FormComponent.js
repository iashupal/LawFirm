import React from 'react';
import TextField from './TextField';
import DropdownElement from '../DropdownElement/DropdownElement';
import FontManagement from './FontManagement';
import DatePicker from "react-datepicker";
import InputBase from '@material-ui/core/InputBase';
import "react-datepicker/dist/react-datepicker.css";
import Accordian from '../Accordian/Accordian';
import Button from '@material-ui/core/Button';
import SimpleCheckbox from '../Checkbox/SimpleCheckbox';
import '../../styles/ui/_crosscheckbox.scss';
import CrossCheckbox from '../Checkbox/CrossCheckbox';
export default class FormComponent extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            startDate: new Date(),
        };
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(date){
        this.setState({
            startDate: date
        });
    }
   
    render(){
        return(
            <div className="tabone">
              <div className="row">
                  <div className="col-lg-12 col-md-12 col-sm-12">
                      <div className="wrap-tab1-left">
                            <div className="tab1-heading">
                                <h2>Case Application Form</h2>
                            </div>
                      <div className="row">
                                <div className="col-lg-6 col-md-12 col-sm-12">
                                    <div className="tab1-form">
                                        {/* <div className="form app-form"> */}
                                            {/* <p>Number2</p>&nbsp;&nbsp;&nbsp;&nbsp;<span>:</span>
                                            <InputBase defaultValue="input" style={{color: 'gray'}} className="inputbase"/> */}
                                            <TextField value={"Input"} label={"Number"}/>
                                            
                                            
                                        {/* </div> */}
                                        <div className="form app-form">
                                            <p>Number2</p>&nbsp;&nbsp;&nbsp;&nbsp;<span>:</span>
                                            <div className="form-search-input">
                                                <p style={{color: '#427FDF'}}>[Input]</p>
                                                
                                                <i className="material-icons">
                                                    search
                                                </i>
                                            </div>
                                            
                                        </div>
                                        
                                        <FontManagement/>
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-12 col-sm-12">
                                    <div className="tab1-form tab2-form">
                                        <div className="form app-form-para">
                                            <p>Number</p>&nbsp;&nbsp;&nbsp;&nbsp;<span className="semi-coln">:</span>
                                            <div className="drpdwn-elt form-drpdwn">
                                                <DropdownElement/>
                                            </div>
                                        </div>
                                        <div className="form app-form-para">
                                            <p>Number</p>&nbsp;&nbsp;&nbsp;&nbsp;<span className="semi-coln">:</span>
                                            <div className="drpdwn-elt form-drpdwn">
                                                <DropdownElement/>
                                            </div>
                                        </div>
                                        <div className="form app-form-para">
                                            <p>Number</p>&nbsp;&nbsp;&nbsp;&nbsp;<span className="semi-coln">:</span>
                                            <div className="drpdwn-elt form-drpdwn">
                                                <DropdownElement/>
                                            </div>
                                        </div>
                                        <div className="form form-cal app-form-para">
                                            <p>Date</p>&nbsp;&nbsp;&nbsp;&nbsp;<span className="semi-coln">:</span>
                                            
                                                <DatePicker
                                                    selected={this.state.startDate}
                                                    onChange={this.handleChange}
                                                    peekNextMonth
                                                    showMonthDropdown
                                                    showYearDropdown
                                                    dropdownMode="select"
                                                   
                                                />
                                                <i className="material-icons">
                                                    date_range
                                                </i>
                                             
                                        </div>
                                        <div className="form form-without-border app-form-para">
                                            <p>Date</p>&nbsp;&nbsp;&nbsp;&nbsp;<span className="semi-coln">:</span>
                                                <DatePicker
                                                    selected={this.state.startDate}
                                                    onChange={this.handleChange}
                                                    peekNextMonth
                                                    showMonthDropdown
                                                    showYearDropdown
                                                    dropdownMode="select" 
                                                />
                                        </div>
                                        <TextField label={"Num4"} value={"Input1"}/>
                                        
                                        
                                        <div className="form">
                                            <p>Number</p>&nbsp;&nbsp;&nbsp;&nbsp;<span className="semi-coln">:</span>
                                            <div className="wrapper-checkbox">
                                                <div className="inr-wrap-chkbox">
                                                    <div className="cross-checkbox">
                                                        <CrossCheckbox crossid={"id2"}/>
                                                    </div>
                                                    {/* <form className="cross-checkbox">
                                                        <input id="demo_box_2" className="css-checkbox" type="checkbox" />
                                                        <label htmlFor="demo_box_2" name="demo_lbl_2" className="css-label">Select</label>
                                                        
                                                    </form> */}
                                                    <div className="custom-checkbox">
                                                        <SimpleCheckbox id={"checkbox3"}/>
                                                    </div>
                                                    
                                                </div>
                                                <div className="contain-cal-btn">
                                                    <button type="button" className="btn btnStyle  btn-color">CalBtn</button>
                                                    <div className="form-cal-btn">
                                                        <DatePicker
                                                            selected={this.state.startDate}
                                                            onChange={this.handleChange}
                                                            peekNextMonth
                                                            showMonthDropdown
                                                            showYearDropdown
                                                            dropdownMode="select" 
                                                        />
                                                         <i className="material-icons">
                                                                date_range
                                                        </i>
                                                    </div>
                                                    <button type="button" className="btn btnStyle btn-color">CalBtn</button>
                                                    <div className="form-cal-btn">
                                                        <DatePicker
                                                            selected={this.state.startDate}
                                                            onChange={this.handleChange}
                                                            peekNextMonth
                                                            showMonthDropdown
                                                            showYearDropdown
                                                            dropdownMode="select" 
                                                        />
                                                         <i className="material-icons">
                                                            date_range
                                                        </i>
                                                    </div>
                                                    <div className="custom-control custom-checkbox checkbox2">
                                                        {/* <input type="checkbox" className="custom-control-input" id="customCheck" name="example1" />
                                                        <label className="custom-control-label" htmlFor="customCheck">check</label> */}
                                                        <SimpleCheckbox id={"checkbox4"}/>
                                                    </div>
                                                    
                                                </div>
                                            </div>
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>
                      </div>
                  </div>
              </div>
              {/* accordian start */}
              <div className="form-accordian">                                   
                <Accordian/>
              </div>
              {/* buttons */}
              <div className="form-submisn-btns">
                
                    <Button className="btn btn-primary left btnStyle clr1" variant="contained">Button2</Button>
                    <Button className="btn left btnStyle accord3-btn-clr" variant="contained">Button2</Button>
                    <Button className="btn btn-danger right btnStyle clr3" variant="contained">Button3</Button>
              </div>
            </div>
        )
    }
}