/*
Core Libs
*/
import React from 'react';
import PropTypes from 'prop-types';

/*
Chart.js Components
*/
import { Line } from 'react-chartjs-2';


/**
 * Line Chart singleton
 * Requires a props of data (Number array) to be graphed
 */
const DashboardLineChart = ({data}) =>
    <div className='dashboard-line-chart-container'>
        <Line   data={data}
                height={200}
                options={{
                    maintainAspectRatio: false,
                    animation: false,
                    responsive: true,
                    legend: {
                        labels: {
                            boxWidth: 0,
                        }
                    },
                    scales: {
                        yAxes: [{
                            ticks: {
                                fontColor: "rgba(0,0,0,0.5)",
                                fontStyle: "bold",
                                beginAtZero: true,
                                maxTicksLimit: 5,
                                padding: 20
                            },
                            gridLines: {
                                display: false
                            }
                        }],
                        xAxes: [{
                            gridLines: {
                                zeroLineColor: "transparent"
                            },
                            ticks: {
                                padding: 20,
                                fontColor: "rgba(0,0,0,0.5)",
                                fontStyle: "bold"
                            }
                        }]
                    }
                }}
        />
    </div>

DashboardLineChart.propTypes = {
    data: PropTypes.object.isRequired
};


export default DashboardLineChart;
