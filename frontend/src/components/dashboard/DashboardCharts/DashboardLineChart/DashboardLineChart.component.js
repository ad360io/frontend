/*
Core Libs
*/
import React from 'react';
import PropTypes from 'prop-types';

/*
Local CSS
*/
import './DashboardLineChart.component.css';

/*
Chart.js Components
*/
import { Line } from 'react-chartjs-2';


/**
 * Line Chart singleton
 * Requires a props of data (Number array) to be graphed
 */
const DashboardLineChart = ({data}) =>
    <div className="dashboard-line-chart-container">
        <Line   data={data}
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
    </div>

DashboardLineChart.propTypes = {
    data: PropTypes.object.isRequired
};


export default DashboardLineChart;
