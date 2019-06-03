import React from 'react';
import '../../styles/pages/_case.scss';
import IntegrationReactSelect from './Components/AutoComplete/IntegrationReactSelect';
export default class CaseTabThree extends React.Component{
    render(){
        return(
            <div className="tab3">
                <IntegrationReactSelect/>
            </div>
        )
    }
}