/*
Core Libs
*/
import React, { Component } from 'react';

/*
Local CSS
*/
import './DashboardLineChart.component.css';

/*
Chart.js Components
*/
// TODO(ahuszagh) Well done, not directly using the UI.
// Let react take care of the UI.
import { Line } from 'react-chartjs-2';


/**
 * Line Chart singleton
 * Requires a props of data (Number array) to be graphed
 */
class DashboardLineChart extends Component {

    render() {

        // TODO(ahuszagh) Can't we do PropTypes here??
        //

        /* Make sure the props.data is not undefined */
        if(typeof this.props.data === 'undefined'){
            return null;
        }

        /* Only render the chart.js library if data is present */
        return <div className="dashboard-line-chart-container">
            <Line   data={this.props.data}
                    options={{
                        maintainAspectRatio: false,
                        responsive: true,
                        animation: false,
                        legend: {
                            labels: {
                                boxWidth: 0,
                            }
                        }
                    }}
            />
        </div>;
    }
}


export default DashboardLineChart;
