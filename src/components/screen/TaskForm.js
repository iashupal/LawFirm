import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Button from '../../components/Button/';

export default class TaskForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: new Date()
        };
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(date) {
        this.setState({
            startDate: date
        });
    }
    render() {
        return (
            <div className="tab1-form tab2-form task-table-form">
                <table className="table">
                    <tbody>
                        <tr>
                            <td>John</td>
                            <td>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        className="form-control inputtype"
                                        placeholder="Default form control"
                                        name="text2"
                                    />
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}
