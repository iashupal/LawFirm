import React from 'react';
import DropdownElement from './DropdownElement';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import { FormGroup, Table } from '@material-ui/core';
import InputBase from '@material-ui/core/InputBase';
import Search from './Search';
import EnhancedTable from './EnhancedTable';
import Button from '@material-ui/core/Button';
import TaskForm from './TaskForm';
export default class CaseTabTwo extends React.Component{
    render(){
        return(
            <div>
                <div className="tabone">
                    <div className="row">
                    <div className="col-lg-8 col-md-12 col-sm-12 case-tab-padding">
                        <div className="wrap-tab1-left left">
                            <div className="tab1-heading left tab2-heading">
                                <h2 className="h2-fontwght left">Task</h2>
                                <div className="task-head-middle left">
                                    <button type="button" className="btn btnStyle accord3-btn-clr">Button1</button>
                                    <button type="button" className="btn btnStyle accord3-btn-clr">Button2</button>
                                    <button type="button" className="btn btnStyle accord3-btn-clr">Button3</button>
                                    <button type="button" className="btn btnStyle accord3-btn-clr">Button4</button>
                                    <button type="button" className="btn btnStyle accord3-btn-clr">Button5</button>
                                </div>
                                <div className="task-head-right right">
                                    <Button className="btn left btnStyle accord3-btn-clr right" variant="contained">Button2</Button>
                                        <div className="checkbox right">
                                            <FormGroup>  
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox
                                                        icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                                                        checkedIcon={<CheckBoxIcon fontSize="small" />}
                                                        value="checkedI"
                                                        />
                                                        }
                                                        label="Custom size"
                                                />
                                            </FormGroup>  
                                        </div>
                                            
                                    </div>  

                            </div>
                            <div className="task-strt-row2 left">
                                <div className="row">
                                    <div className="col-lg-4 col-md-4 col-sm-12 case-tab-padding">
                                        <div className="task-row2">
                                            <div className="checkbox left">
                                                <FormGroup>  
                                                    <FormControlLabel
                                                        control={
                                                        <Checkbox
                                                            icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                                                            checkedIcon={<CheckBoxIcon fontSize="small" />}
                                                            value="checkedI"
                                                                    />
                                                            }
                                                            label="Custom"
                                                        />
                                                </FormGroup>  
                                            </div>
                                            <button type="button" className="btn btnStyle accord3-btn-clr ">Button2</button>
                                            <button type="button" className="btn btnStyle btn-color2">Button1</button>
                                            
                                        </div>
                                    </div>
                                    <div className="col-lg-8 col-md-8 col-sm-12 case-tab-padding">
                                        <div className="task-rght-row-drpdwn">
                                            <div className="left-heading">
                                                <div className="task-search">
                                                    <Search/>
                                                </div>
                                                <div className="drpdwn-elt drpdwn-elt-tab2">
                                                    <DropdownElement/>
                                                </div>
                                                <div className="drpdwn-elt drpdwn-elt-tab2">
                                                    <DropdownElement/>
                                                </div>
                                                <div className="drpdwn-elt drpdwn-elt-tab2">
                                                    <DropdownElement/>
                                                </div>
                                                
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="paginatn-table left">
                                <EnhancedTable/>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-12 col-sm-12 case-rght-margin">
                    <div className="wrap-tab1-left wrap-tab1-right left">
                            <div className="tab1-heading">
                                <h2 className="h2-fontwght">CaseTab2</h2>
                                <div className="case-btn case-tab-btn tab2-form-rght-btn">
                                    <Button variant="contained" className="btn btnStyle btn-color">Case Form
                                        <i className="material-icons icon">
                                            queue
                                        </i>
                                    </Button>
                                </div>
                            </div>
                            
                            <div className="task-form left">
                                <TaskForm/>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        )
    }
}