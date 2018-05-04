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
import { Line } from 'react-chartjs-2';


/**
 * Line Chart singleton
 * Requires a props of data (Number array) to be graphed
 */
class DashboardLineChart extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            mode : "Advertiser",
            currency: "eqc"
        }
    }

    render() {

        /* Make sure if the props.data is undefined */
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