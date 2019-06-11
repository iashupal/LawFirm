import React from 'react';
import '../../styles/ui/_popupbtn.scss';
import { Button } from '@material-ui/core';
class AddContent extends React.Component {
    render() {
        return (
            <div className="wrap-popup">
                <div className="popup">
                    <div className="popup-btn">
                        <p>Popups</p>
                        <i className="material-icons right">add</i>
                    </div>
                </div>
            </div>
        );
    }
}

export default AddContent;
