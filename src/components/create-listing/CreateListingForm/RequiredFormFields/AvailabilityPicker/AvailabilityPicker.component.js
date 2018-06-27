import React, { Component } from 'react';

import DayPicker, { DateUtils } from 'react-day-picker';

import 'react-day-picker/lib/style.css'
import './AvailabilityPicker.component.css';

class AvailabilityPicker extends Component {
    static defaultProps = {
        numberOfMonths: 2
    }

    constructor(props){
        super(props);
        this.state = {
            from: undefined,
            to: undefined
        }
        this.handleDayClick = this.handleDayClick.bind(this);
        this.handleResetClick = this.handleResetClick.bind(this);
    }

    handleDayClick(day) {
        const range = DateUtils.addDayToRange(day, this.state);
        this.setState(range);
    }

    handleResetClick() {
        this.setState({
            from: undefined,
            to: undefined
        })
    }

    render() {
        const { from , to } = this.state;
        const modifiers = { start: from, end: to };
        return <div>
            <div className="date-range-container">
                <DayPicker
                    className='Selectable'
                    numberOfMonths={this.props.numberOfMonths}
                    selectedDays={[from, { from ,to }]}
                    modifiers={modifiers}
                    onDayClick={this.handleDayClick}
                />
                <p className='selected-range-label'>
                    { !from && !to && 'Please select the first day' }
                    {  from && !to && 'Please select the last day'  }
                    { from && to &&  `Selected from ${from.toLocaleDateString()}
                        to ${to.toLocaleDateString()}`}{'  '}
                    { from && to && (
                        <button className='link' onClick={this.handleResetClick}>
                            Reset
                        </button>
                    )}
                </p>
            </div>
        </div>
    }

}

export default AvailabilityPicker;