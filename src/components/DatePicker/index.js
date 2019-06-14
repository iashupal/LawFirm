import React from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
export default function Dateicker({onChange, selected})  {
    return (<DatePicker
                selected={this.state.startDate}
                onChange={this.handleChange}
                peekNextMonth
                showMonthDropdown
                showYearDropdown
                dropdownMode="select" 
            />);
}

