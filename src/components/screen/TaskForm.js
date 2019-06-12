import React from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Button from '../../components/Button/';

export default class TaskForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            startDate: new Date()
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
                <div className="tab1-form tab2-form task-table-form">
                    <table className="table">
                                            
                        <tbody>
                            <tr>
                                <td>John</td>
                                <td>
                                    <div className="form-group">
                                        <input type="text" className="form-control inputtype" placeholder="Default form control" name="text2" />
                                    </div>    
                                </td>                    
                            </tr>
                            <tr>
                                <td>Mary</td>
                                <td>
                                    <div className="font-textarea">
                                        <textarea className="form-control z-depth-1" rows="6" placeholder="Write something here..."></textarea>
                                    </div>    
                                </td>                    
                            </tr>
                            <tr>
                                <td>July</td>
                                <td>
                                    {/* <button type="button" className="btn left btnStyle accord3-btn-clr">Button2</button> */}
                                    <Button 
                                        mode="regular"
                                        size="small"
                                        color="inverted"
                                        variant="contained"
                                    >
                                    Click
                                    </Button>
                                </td>                    
                            </tr>
                            <tr>
                                <td>Mary</td>
                                <td className="task-forminput-width">
                                    <div className="form-group left">
                                        <input type="text" className="form-control inputtype" placeholder="Default form control" name="text2" />
                                    </div> 
                                    <i className="material-icons icon-left-menu-color left">
                                        supervisor_account
                                    </i>  
                                </td>                                            
                            </tr>
                            <tr>
                                <td>July</td>
                                <td>
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
                                </td>                                            
                            </tr>
                            <tr>
                                <td>July</td>
                                <td>
                                    {/* <button type="button" className="btn left btnStyle accord3-btn-clr">Button2</button> */}
                                    <div className="left" style={{paddingRight:'15px'}}>
                                        <Button 
                                            mode="regular"
                                            size="medium"
                                            color="inverted"
                                            variant="contained"
                                            
                                        >
                                        Click
                                        </Button>
                                    </div>
                                    <p className="left"><span>Task1.pdf</span> &nbsp; | &nbsp; <span>Task2.pdf</span></p>
                                </td>                    
                            </tr>
                        </tbody>
                    </table>                                                
                
                    <div className="task-form-para-btn">
                        <p><span className="para-clr">Task</span> &nbsp; | &nbsp; <span>2010-03-02 23:00</span></p>
                        <p><span className="para-clr">Task</span> &nbsp; | &nbsp; <span>2010-03-02 23:00</span></p>
                        {/* <button type="button" className="btn btnStyle accord3-btn-clr">Button2</button> */}
                        <div style={{textAlign:'center'}}>
                            <Button 
                                mode="regular"
                                size="large"
                                color="primary"
                                variant="contained"
                                
                            >
                            Click
                            </Button>
                        </div>
                       
                    </div>
                </div>

        )
    }
}
