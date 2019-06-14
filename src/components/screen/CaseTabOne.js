import React from 'react';
import TextField from './TextField';
import DropdownElement from '../DropdownElement/DropdownElement';
import PageTitle from '../PageTitle/PageTitle';
import CaseCard from './CaseCard';
export default class CaseTabOne extends React.Component{
    render(){
        return(
            <div className="tabone">
                <div className="row">
                    <div className="col-lg-8 col-md-8 col-sm-12 case-tab-padding">    
                            <CaseCard>
                            <div className="row">
                                
                                <div className="col-lg-6 col-md-12 col-sm-12">
                                    <div className="tab1-form">
                                        <TextField label={"Number1"} value={"0001"}/>
                                            <div className="form">
                                                <p>Number2</p>&nbsp;&nbsp;&nbsp;&nbsp;<span>:</span>
                                                <div className="form-search-input">
                                                    <p style={{color: '#427FDF'}}>[Input]</p>
                                                    
                                                    <i className="material-icons">
                                                        search
                                                    </i>
                                            </div>
                                            
                                        </div>
                                        <TextField label={"Num3"} value={""}/>
                                        <TextField label={"Num4"} value={"Input1"}/>
                                        
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-12 col-sm-12">
                                    <div className="tab1-form tab2-form">
                                        <div className="form">
                                            <p>Number</p>&nbsp;&nbsp;&nbsp;&nbsp;<span>:</span>
                                            <div className="drpdwn-elt">
                                                <DropdownElement/>
                                            </div>
                                        </div>
                                        <div className="form">
                                            <p>Number</p>&nbsp;&nbsp;&nbsp;&nbsp;<span>:</span>
                                            <div className="drpdwn-elt">
                                                <DropdownElement/>
                                            </div>
                                        </div>
                                        <div className="form">
                                            <p>Number</p>&nbsp;&nbsp;&nbsp;&nbsp;<span>:</span>
                                            <div className="drpdwn-elt">
                                                <DropdownElement/>
                                            </div>
                                        </div>
                                        
                                        <TextField label={"Num4"} value={"Input1"}/>
                                        
                                    </div>
                                </div>
                                
                            </div>
                            </CaseCard>
                        {/* </div> */}
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-12 case-rght-margin">
                        <CaseCard buttonVisible buttonColor={'#3B434B'} title={"Case Form"}>
                        <div className="row">
                                <div className="col-lg-6 col-md-12 col-sm-12 case-tab-padding">
                                    <div className="tab1-form tab1-form2 tab1-spacing">
                                        <div className="case-contact-name">
                                            <i className="material-icons icon-color">
                                                account_circle
                                            </i>
                                            <p>Ashu</p>
                                        </div>
                                        <div className="form">
                                            <p className="form-para">Number</p>&nbsp;&nbsp;&nbsp;&nbsp;<span>:</span>
                                            <p style={{color: 'gray', marginBottom: 0}} className="inputbase">001</p>
                                        </div>
                                        <div className="form">
                                            <p className="form-para">Number</p>&nbsp;&nbsp;&nbsp;&nbsp;<span>:</span>
                                            <p style={{color: 'gray', marginBottom: 0}} className="inputbase">001</p>
                                                
                                        </div>
                                        <div className="form">
                                            <p className="form-para">Number</p>&nbsp;&nbsp;&nbsp;&nbsp;<span>:</span>
                                            <p style={{color: 'gray', marginBottom: 0}} className="inputbase">001</p>
                                                
                                        </div>
                                        <div className="form">
                                            <p className="form-para">Number</p>&nbsp;&nbsp;&nbsp;&nbsp;<span>:</span>
                                            <p style={{color: 'gray', marginBottom: 0}} className="inputbase">001</p>
                                                
                                        </div>
                                        
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-12 col-sm-12 case-tab-padding">
                                    <div className="tab1-form tab2-form tab2-top-mgn">
                                       
                                    <div className="form">
                                        <p className="form-para">Number</p>&nbsp;&nbsp;&nbsp;&nbsp;<span>:</span>
                                        <p style={{color: 'gray', marginBottom: 0}} className="inputbase">001</p>
                                                
                                    </div>
                                    <div className="form">
                                        <p className="form-para">Number</p>&nbsp;&nbsp;&nbsp;&nbsp;<span>:</span>
                                        <p style={{color: 'gray', marginBottom: 0}} className="inputbase">001</p>
                                            
                                    </div>
                                        
                                    </div>
                                </div>
                            </div>
                        </CaseCard>
               
                    </div>
                </div>
                <div className="tabs-row2">
                    <div className="row">
                        <div className="col-lg-8 col-md-8 col-sm-12 case-tab-padding">
                            <CaseCard buttonVisible title={"Case Table"}>
                                <div className="row">
                                    <div className="col-lg-6 col-md-12 col-sm-12">
                                        <div className="tab1-form tab3-form">
                                        
                                            <TextField label={"Num1"} value={"0001"}/>
                                            <TextField label={"Num2"} value={"[Input]"}/>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-12 col-sm-12">
                                        <div className="tab1-form tab2-form">
                                        <table className="table">
                                            
                                            <tbody>
                                                <tr>
                                                    <td>John</td>
                                                    <td>Doe</td>
                                                
                                                </tr>
                                                <tr>
                                                    <td>Mary</td>
                                                    <td>Moe</td>
                                                
                                                </tr>
                                                <tr>
                                                    <td>July</td>
                                                    <td>Dooley</td>
                                                
                                                </tr>
                                                <tr>
                                                    <td>Mary</td>
                                                    <td>Moe</td>
                                                
                                                </tr>
                                                <tr>
                                                    <td>July</td>
                                                    <td>Dooley</td>
                                                
                                                </tr>
                                            </tbody>
                                        </table>
                                            
                                            
                                        </div>
                                    </div>
                            </div> 
                            </CaseCard>
                           
                            </div>
                            <div className="col-lg-4 col-md-4 col-sm-12">
                                <div className="wrap-tab1-left wrap-tab1-right tab4-margin">
                                    <div className="tab1-heading">
                                    <PageTitle value={"CaseTab4"}/>
                                        <div className="case-btn case-tab-btn tabs-drpdwn">
                                            <div className="drpdwn-elt">
                                                <DropdownElement/>
                                            </div>
                                        
                                        </div>
                                    </div>
                                    <div className="case-4-content">
                                        <div className="case-4-inr-content">
                                            <div className="case-4-inr-para">
                                                <p>2018-03-30()</p>
                                            </div>
                                            <div style={{borderBottom: '1px solid lightgray'}}>
                                                <div className="case-4-inr-div">
                                                    <i className="material-icons icon-color">
                                                        account_circle
                                                    </i>
                                                    <p>Ashu's <b>law</b> case <b> open</b> </p>
                                                </div>
                                                
                                                <div className="case-4-inr-div">
                                                    <i className="material-icons icon-color">
                                                        chat_bubble_outline
                                                    </i>
                                                    <p>Ashu's <b>law</b> case <b> open</b> </p>
                                                </div>
                                            </div>
                                            <div className="case-4-inr-para">
                                                <p>2018-03-30()</p>
                                            </div>
                                            <div className="case-4-inr-div">
                                                <i className="material-icons icon-color">
                                                    delete
                                                </i>
                                                <p>Ashu's <b>law</b> case <b> open</b> </p>
                                            </div>
                                            <div className="case-4-inr-div">
                                                <i className="material-icons icon-color">
                                                    account_circle
                                                </i>
                                                <p>Ashu's <b>law</b> case <b> open</b> </p>
                                            </div>
                                            <div className="case-4-inr-div">
                                                <i className="material-icons icon-color">
                                                    account_circle
                                                </i>
                                                <p>Ashu's <b>law</b> case <b> open</b> </p>
                                            </div>
                                        </div>
                                    </div>
                                    
                                </div>
                            
                            </div>
                    </div>
                </div>
                <div className="tabs-row2 tabs-row3">
                    <div className="row">
                        <div className="col-lg-8 col-md-12 col-sm-12 case-tab-padding">
                            <div className="wrap-tab1-left div5-margin">
                                <div className="case-detail">
                                    <p>Case Details</p>
                                </div>
                                    
                                    
                            </div>
                        </div>
                            
                    </div>
                </div>
            </div>
        )
    }
}