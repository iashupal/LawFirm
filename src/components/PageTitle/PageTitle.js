import React from 'react';
import '../../styles/ui/_page-title.scss';
export default class PageTitle extends React.Component{
    render(){
        return(
            <div className="page-title">
                <h2>{this.props.value}</h2>
            </div>
        )
    }
}