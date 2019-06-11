import React from 'react';
import '../../styles/ui/_switchbutton.scss';
export default class SwitchButton extends React.Component {
    render() {
        return (
            <div>
                <label className="switch">
                    <input type="checkbox" />
                    <span className="slider round" />
                </label>
            </div>
        );
    }
}
