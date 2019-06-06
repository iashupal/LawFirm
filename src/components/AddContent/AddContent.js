import React from 'react';
import '../../styles/ui/_popupbtn.scss';
class AddContent extends React.Component {
    render () {
        return (
            <div className="wrap-popup">
                 <div className="popup">
                    <div className="popup-btn">
                        <p>Popup</p>
                        <i className="material-icons right" >
                            add
                        </i>
                    </div>
                </div>
            </div>
        );
    }
}

export default AddContent;