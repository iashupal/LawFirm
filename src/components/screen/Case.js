import React from 'react';
import '../../styles/pages/_case.scss';
import TabsComponent from './TabsComponent';
import FormComponent from './FormComponent';
import Button from '@material-ui/core/Button';
import PageTitle from '../PageTitle/PageTitle';
 
 export default class Case extends React.Component{
     constructor(props){
         super(props);
         this.state = {
            show: true,

          };
          this.handleClick = this.handleClick.bind(this);
     }
    handleClick(){
        this.setState({show : !this.state.show});
    }
   
    render(){
        return(
            <div className="case">   
                <div className="caseInr">   
                        <div className="row case-row">
                            <div className="col-lg-10 col-md-10 col-sm-10 col-xs-6 case-main-heading">
                                <div className="caseHeading">
                                    <i className="material-icons icon-left-menu-color">
                                        class
                                    </i>
                                    <PageTitle value = {"Case"}/>
                                </div>
                            </div>
                            <div className="col-lg-2 col-md-2 col-sm-2 col-xs-6 case-padding case-main-button">
                                <div className="case-btn">
                                    <Button variant="contained" color="primary" onClick={this.handleClick} className="case-change-btn">
                                        <span className="label">
                                            Case
                                        </span>
                                        <i className="material-icons icon">add_to_queue</i> 
                                    </Button>
                                  
                                </div>
                            </div>
                        </div>
                </div>
                <div className="tabs-component">
                    {this.state.show ? <TabsComponent  />: <FormComponent/>}
                </div>
            </div>
        )
    }
}
