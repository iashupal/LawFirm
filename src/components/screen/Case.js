import React from 'react';
import '../../styles/pages/_case.scss';
// import ButtonComponent from '../Button/ButtonComponent';
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
                                    {/* <h2>Case</h2> */}
                                    <PageTitle/>
                                </div>
                            </div>
                            <div className="col-lg-2 col-md-2 col-sm-2 col-xs-6 case-padding case-main-button">
                                <div className="case-btn">
                                    {/* <ButtonComponent text={"Case"} icon={"add_to_queue"} onClick={this.handleClick}/> */}
                                    <Button variant="contained" color="primary" onClick={this.handleClick}>Case
                                        <i className="material-icons icon">add_to_queue</i> 
                                    </Button>
                                </div>
                            </div>
                        </div>
                </div>
                <div className="tabs-component">
                    {this.state.show && <TabsComponent  />}
                    {!this.state.show && <FormComponent />}
                </div>
            </div>
        )
    }
}
