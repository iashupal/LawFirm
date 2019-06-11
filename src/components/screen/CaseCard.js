import React from 'react'
import PageTitle from '../PageTitle/PageTitle';
export default class CaseCard extends React.Component{
    render(){
        const {children, buttonVisible ,buttonColor, title} = this.props;
        return(
               <div className="wrap-tab1-left wrap-tab1-right">
                                    <div className="tab1-heading">
                                    <PageTitle value={"CaseTab3"}/>
                                        {buttonVisible && (<div className="case-btn case-tab-btn">
                                            <button type="button" className="btn btnStyle btn-color1" style={{backgroundColor: buttonColor}}>{title}</button>

                                        </div>)}
                                    </div>
                                    
                                    {children}
                                </div>
                               
        )
        }
}