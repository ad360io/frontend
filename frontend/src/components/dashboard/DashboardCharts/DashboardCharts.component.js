/*
Core Libs
*/
import React, { Component } from 'react';

/*
Local CSS
*/
import './DashboardCharts.component.css';

/*
Fake Data
*/
import clickDatasetsInEqc from '../../../assets/fakeData/fakeDashboardData/fake-click-eqc';
import clickDatasetsInXqc from '../../../assets/fakeData/fakeDashboardData/fake-click-xqc';
import impressionDatasetsInEqc from '../../../assets/fakeData/fakeDashboardData/fake-impression-eqc';
import impressionDatasetsInXqc from '../../../assets/fakeData/fakeDashboardData/fake-impression-xqc';

/*
Material UI Components
*/
import { Card, CardText } from 'material-ui/Card';

/*
Children Components
*/
import DashboardLineChart from './DashboardLineChart/DashboardLineChart.component';
import LineChartSlider    from './LineChartSlider/LineChartSlider.component';


/**
 * 
 */
class DashboardCharts extends Component {

    constructor(props){
        super(props);
        // make api calls to get all datasets, display partial datasets based on mode/currency
        // supposedly we have saved all datasets in local state
        this.state = {
            clickDatasetsInEqc,
            clickDatasetsInXqc,
            impressionDatasetsInEqc,
            impressionDatasetsInXqc
        }
    }

    /**
     * Based on the dataset that needs to be graphed, return the X-axis labels
     * Labels are capped at 30, which is a month in this case
     * @param {*} dataset Array of numbers that represent historical data by days.
     */
    prepareXaxisLabels(dataset){
        let daysLabel = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        let today = new Date().getDay();
        let labelSize = (dataset.length > 30 ? 30 : dataset.length);
        let labelsArray = new Array(labelSize);
        for (let i = 0; i < labelSize; i++) {
            labelsArray[labelSize-i-1] = daysLabel[this.mod((today - i),7)];
        }
        return labelsArray;
    }

    /**
     * Helper method to calculate modulo operation, including negative numbers;
     * @param {*} n operand
     * @param {*} m operand base
     */
    mod(n, m) {
        return ((n % m) + m) % m;
    }

    /**
     * This Method initialize the data object that is required for Chart.js component
     * @param {*} dataset provide the array of numbers that is to be plotted to chart.
     * @param {*} rbgaString provide the desired color of the graph in rgba format.
     */
    prepareDatasetToChart(dataset, rbgaString){
        const data = {
            labels : this.prepareXaxisLabels(dataset),
            datasets: [
              {
                label: 'Some Ad names maybe',
                fill: false,
                lineTension: 0.1,
                backgroundColor: rbgaString,
                borderColor: rbgaString,
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: rbgaString,
                pointBackgroundColor: '#fff',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: rbgaString,
                pointHoverBorderColor: rbgaString,
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                 /* only get the first 30 element if the dataset is more than 30 elements*/
                data: dataset.slice(0, (dataset.length > 30 ? 30 : dataset.length)) 
              }
            ]
          };
        return data;
    }

    render() {
        /*
        * LineChartSlider requires a itemList props that should contain list of !!!COMPONENTS!!! to be rendered
        * Here we are preparing the itemList for click graph slider to contain list of DashboardLineCharts
        */
        let clickDatasetChartList = [];
        this.state.clickDatasetsInEqc.map((dataset, index)=>{
            let currentDataset = this.prepareDatasetToChart(dataset, 'rgba(75,192,192,1)');
            return clickDatasetChartList.push(<DashboardLineChart data={currentDataset} key={"clickDataLine"+index} />);
        })

        /* Here we are preparing the itemList for impression graph slider to contain list of DashboardLineCharts*/
        let impressionDatasetChartList = [];
        this.state.impressionDatasetsInEqc.map((dataset, index) =>{
            let currentDataset = this.prepareDatasetToChart(dataset, 'rgba(255,20,20,1)');
            return impressionDatasetChartList.push(<DashboardLineChart data={currentDataset} key={"impressionDataLine"+index} />);
        })

        return <div className="dashboard-charts-container">

            {/* Card container for click data slider */}
            <Card className="dashboard-line-charts-card" style={{background:'#fafafa'}}>
                <CardText>
                    <h2 className="chart-title">Ad Click Performance</h2>
                    <LineChartSlider itemList={clickDatasetChartList} />
                </CardText>
            </Card>

            {/* Card container for impression data slider */}
            <Card className="dashboard-line-charts-card" style={{background:'#fafafa'}}>
                <CardText>
                    <h2 className="chart-title">Ad Impression Performance</h2>
                    <LineChartSlider itemList={impressionDatasetChartList} />
                </CardText>
            </Card>
        </div>;
    }
}


export default DashboardCharts;