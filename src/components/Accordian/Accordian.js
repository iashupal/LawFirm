import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import DropdownElement from '../DropdownElement/DropdownElement';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import '../../../node_modules/pretty-checkbox/dist/pretty-checkbox.min.css';
import SimpleCheckbox from '../Checkbox/SimpleCheckbox';
import CrossCheckbox from '../Checkbox/CrossCheckbox';


const styles = theme => ({
    root: {
      width: '100%',
    },
    heading: {
      fontWeight: theme.typography.fontWeightRegular,
      fontSize: '18px',
    //   fontFamily: 'Material-Design-Iconic-Font',
    fontFamily: "Roboto, Helvetica, Arial, sans-serif",
    },
    expandIcon: {
        left: 8,
        right: '97%'
    }


  
    
  });
 class Accordian extends React.Component{
    render(){
        const {classes} = this.props;
  return (
      <div className={classes.root}>
        <div className="form-accordian">
                <ExpansionPanel className="expansion">
                    <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon className={classes.expandIcon}/>}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    className="expansion-summary"
                    >
                    <Typography className={classes.heading}>Supreme Court</Typography>
                    </ExpansionPanelSummary>
                    
                    <ExpansionPanelDetails>
                    <div className="accord1">
                        <div className="accord-supreme-btn">
                            <Button variant="contained">Supreme Court</Button>
                        </div>
                    <div className="accord-table">
                        <table className="table">
                                                
                            <tbody>
                                <tr>
                                    <td>Case</td>
                                    <td>Information</td>
                                    <td>ID</td>
                                    <td>2019AB123456</td>
                                    <td>Case</td>
                                    <td>..</td>
                                                        
                                </tr>
                                <tr>
                                    <td>Case</td>
                                    <td>Information</td>
                                    <td>Supreme</td>
                                    <td>..</td>
                                    <td>Data</td>
                                   
                                    <td>..</td>
                                </tr>
                                <tr>
                                    <td>Case</td>
                                    <td>Information</td>
                                    <td>July</td>
                                    <td>Dooley</td>
                                    <td>Case</td>
                                    <td>..</td>                  
                                </tr>
                                <tr>
                                    <td>Case</td>
                                    <td>xxx-xxxxx</td>
                                    <td>Mary</td>
                                    <td>Moe</td>
                                    <td>Case</td>
                                    <td>..</td>                   
                                </tr>
                                <tr>
                                    <td>Case</td>
                                    <td><i className="material-icons">
                                        search
                                        </i>
                                    </td>
                                    <td>July</td>
                                    <td>Dooley</td>
                                    <td>Case</td>
                                    <td>..</td>                   
                                </tr>
                                <tr>
                                    <td>Case</td>
                                    <td>..
                                    </td>
                                    <td>July</td>
                                    <td>Dooley</td>
                                    <td>Case</td>
                                    <td>..</td>                   
                                </tr>
                                <tr>
                                    <td>Case</td>
                                    <td>..</td>
                                    <td>July</td>
                                    <td>Dooley</td>
                                    <td>Case</td>
                                    <td>..</td>                  
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    </div>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel className="expansion">
                    <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                    className="expansion-summary"
                    >
                    <Typography className={classes.heading}>Client</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                    <div className="accord1">
                       <div className="accord2">
                           <div className="accord2-wrap">
                               <div className="accord2-wrap-inr">
                                   <span>Label </span> : 
                                    <div className="pretty p-default p-round p-smooth padding-pretty">
                                        <input type="checkbox" />
                                        <div className="state p-primary">
                                            <label>Monday</label>
                                        </div>
                                    </div>
                                    <div className="drpdwn-elt">
                                        <DropdownElement/>
                                    </div>
                                    <div className="pretty p-default p-round p-smooth">
                                        <input type="checkbox" />
                                        <div className="state p-primary">
                                            <label>Monday</label>
                                        </div>
                                    </div>
                                    <div className="drpdwn-elt">
                                        <DropdownElement/>
                                    </div>
                                    <div className="pretty p-default p-round p-smooth">
                                        <input type="checkbox" />
                                        <div className="state p-primary">
                                            <label>Monday</label>
                                        </div>
                                    </div>
                                    <div className="drpdwn-elt">
                                        <DropdownElement/>
                                    </div>
                               </div>
                               <div className="client-accord">
                                   <div className="row">
                                       <div className="col-lg-8 col-md-12 col-sm-12 case-tab-padding">
                                           <div className="client-acord-wrap">
                                                <div className="accord-table">
                                                    <table className="table">
                                                                            
                                                        <tbody>
                                                            <tr>
                                                                <td>Case</td>
                                                                <td>Information</td>
                                                                <td className="blank"></td>
                                                                <td className="table-td">
                                                                    <div className="table-inr-btns">
                                                                        <button type="button" className="btn right btnStyle btn-color1">Button2</button>
                                                                        <button type="button" className="btn right btnStyle btn-color2">Button1</button>
                                                                    </div>
                                                                </td>
                                                                                    
                                                            </tr>
                                                            <tr>
                                                                <td>Case</td>
                                                                <td>
                                                                <div className="drpdwn-elt client-drpdwn-accord">
                                                                    <DropdownElement/>
                                                                </div>
                                                                </td>
                                                                <td>Supreme</td>
                                                                <td>
                                                                    <div className="inr-wrap-chkbox">
                                                                        <div className="cross-checkbox">
                                                                            <CrossCheckbox crossid={"id1"}/>
                                                                        </div>
                                                                        <div className="custom-checkbox">
                                                                            <SimpleCheckbox id={"checkbox5"}/>
                                                                        
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>Case</td>
                                                                <td>Information</td>
                                                                <td>July</td>
                                                                <td>Dooley</td>
                                                                                 
                                                            </tr>
                                                            <tr>
                                                                <td>Case</td>
                                                                <td></td>
                                                                <td>Mary</td>
                                                                <td>Moe</td>
                                                                                  
                                                            </tr>
                                                            <tr>
                                                                <td>Case</td>
                                                                <td>
                                                                </td>
                                                                <td></td>
                                                                <td></td>
                                                                                  
                                                            </tr>
                                                            <tr>
                                                                <td>Case</td>
                                                                <td>
                                                                </td>
                                                                <td></td>
                                                                <td></td>
                                                                                  
                                                            </tr>
                                                           
                                                        </tbody>
                                                    </table>
                                                </div>
                                           </div>
                                       </div>
                                       <div className="col-lg-4 col-md-12 col-sm-12 case-tab-padding">
                                       <div className="font-wrapper">
                                            <div className="font-wrapper-container">
                                                <div className="tab1-heading h3-heading">
                                                    <h3 className="h2-fontwght">CaseTab3</h3>
                                                </div>
                                                <div className="textfield-wrapper">
                                                    <div className="form-group">
                                                        <input type="text" className="form-control inputtype" placeholder="Default form control" name="text2" />
                                                    </div>
                                                    <span> and</span>
                                                    <div className="form-group">
                                                        <input type="text" className="form-control inputtype" placeholder="Default form control" name="text3" />
                                                    </div>
                                                </div>
                                                <div className="accord2-rght">
                                                    <h3 className="h2-fontwght">Content</h3>
                                                    <div className="table-inr-btns table-rght-btns">
                                                        <button type="button" className="btn right btnStyle btn-color2">Button1</button>
                                                        <button type="button" className="btn right btnStyle btn-color1">Button2</button>
                                                        
                                                    </div>
                                                </div>
                                            
                                            </div>
                                            <div className="font-textarea">
                                            <textarea className="form-control z-depth-1" rows="4" placeholder="Write something here..."></textarea>
                                            </div>
                                        </div>
                                       </div>
                                   </div>
                               </div>
                           </div>
                       </div>
                    </div>
                    </ExpansionPanelDetails>
                </ExpansionPanel> 
                <ExpansionPanel className="expansion">
                    <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                    className="expansion-summary"
                    >
                    <Typography className={classes.heading}>Executive</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                    
                    <div className="accord1">
                       <div className="accord2">
                           <div className="accord2-wrap">
                               <div className="client-accord">
                                   <div className="row">
                                        <div className="col-lg-4 col-md-12 col-sm-12 case-tab-padding">
                                            <div className="font-wrapper">
                                                <div className="font-wrapper-container">
                                                    <div className="tab1-heading h3-heading">
                                                        <h3 className="h2-fontwght">CaseTab3</h3>
                                                    </div>
                                                    
                                                    <div className="accord2-rght">
                                                        <div className="drpdwn-elt">
                                                            <DropdownElement/>
                                                        </div>
                                                        <div className="table-inr-btns table-rght-btns">
                                                            <button type="button" className="btn right btnStyle btn-color2">Button1</button>
                                                            <button type="button" className="btn right btnStyle btn-color1 accord3-btn-clr">Button2</button>
                                                                
                                                        </div>
                                                    </div>
                                                    
                                                </div>
                                                <div className="font-textarea">
                                                <div className="textarea-chkbox">
                                                    <div>
                                                    <SimpleCheckbox id={"checkbox6"}/>
                                                    </div>
                                                    <div>
                                                        <SimpleCheckbox id={"checkbox7"}/>
                                                    </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-4 col-md-12 col-sm-12 case-tab-padding accord-exec-padding">
                                            <div className="font-wrapper">
                                                <div className="font-wrapper-container">
                                                    <div className="tab1-heading h3-heading">
                                                        <h3 className="h2-fontwght">CaseTab3</h3>
                                                    </div>
                                                    
                                                    <div className="accord2-rght">
                                                        <div className="drpdwn-elt">
                                                            <DropdownElement/>
                                                        </div>
                                                        <div className="table-inr-btns table-rght-btns">
                                                            <button type="button" className="btn right btnStyle btn-color2">Button1</button>
                                                            <button type="button" className="btn right btnStyle btn-color1 accord3-btn-clr">Button2</button>
                                                            <button type="button" className="btn right btnStyle btn-color1 accord3-btn-clr">Button2</button>
                                                                
                                                        </div>
                                                    </div>
                                                    
                                                </div>
                                                <div className="font-textarea">
                                                <div className="textarea-chkbox">
                                                <SimpleCheckbox id={"checkbox8"}/>
                                                {/* </textarea> */}
                                                </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-4 col-md-12 col-sm-12 case-tab-padding accord-exec-padding">
                                            <div className="font-wrapper">
                                                <div className="font-wrapper-container">
                                                    <div className="tab1-heading h3-heading">
                                                        <h3 className="h2-fontwght">CaseTab3</h3>
                                                    </div>
                                                    
                                                    <div className="accord2-rght">
                                                        <div className="drpdwn-elt">
                                                            <DropdownElement/>
                                                        </div>
                                                        <div className="table-inr-btns table-rght-btns">
                                                            <button type="button" className="btn right btnStyle btn-color2">Button1</button>
                                                            <button type="button" className="btn right btnStyle btn-color1 accord3-btn-clr">Button2</button>
                                                            <button type="button" className="btn right btnStyle btn-color1 accord3-btn-clr">Button2</button>
                                                            
                                                        </div>
                                                    </div>
                                                
                                                </div>
                                                <div className="font-textarea">
                                                <div className="textarea-chkbox">
                                                    <SimpleCheckbox id={"checkbox9"}/>
                                                </div>
                                                </div>
                                            </div>
                                       </div>
                                   </div>
                               </div>
                           </div>
                       </div>
                    </div>
                    
                    </ExpansionPanelDetails>
                </ExpansionPanel>                                    
       </div>
    </div>
  );
}

}
Accordian.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(Accordian);