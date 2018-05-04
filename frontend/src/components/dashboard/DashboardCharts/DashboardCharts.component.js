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
        // make api calls to get all datasets, display partial datasets based on store.state
        // suppose save all datasets in local state
        this.state = {
            clickDatasetsInEqc,
            clickDatasetsInXqc,
            impressionDatasetsInEqc,
            impressionDatasetsInXqc
        }
    }

    
    prepareXaxisLabels(dataset){
        let daysLabel = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        let today = new Date().getDay();
        let labelSize = (dataset.length > 30 ? 30 : dataset.length);
        let labelsArray = new Array(labelSize);
        for (let i = 0; i < labelSize; i++) {
            labelsArray[labelSize-i] = daysLabel[this.mod((today - i),7)];
        }
        return labelsArray;
    }

    mod(n, m) {
        return ((n % m) + m) % m;
    }

    prepareDatasetToChart(dataset, rbgaString){
        // let sampleRGB = ['rgba(75,192,192,1)', 'rgba(255,20,20,1)'];
        //let sampleDataset = (sampleIndex ? clickDatasetsInEqc[0] : impressionDatasetsInEqc[0]);
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
                data: dataset
              }
            ]
          };
        return data;
    }

    render() {
        let clickDatasetChartList = [];
        this.state.clickDatasetsInEqc.map((dataset)=>{
            let currentDataset = this.prepareDatasetToChart(dataset, 'rgba(75,192,192,1)');
            return clickDatasetChartList.push(<DashboardLineChart data={currentDataset} />);
        })

        let impressionDatasetChartList = [];
        this.state.impressionDatasetsInEqc.map((dataset) =>{
            let currentDataset = this.prepareDatasetToChart(dataset, 'rgba(255,20,20,1)');
            return impressionDatasetChartList.push(<DashboardLineChart data={currentDataset}/>);
        })

        return <div className="dashboard-charts-container">
            <LineChartSlider />
            <Card className="dashboard-line-charts-card" style={{background:'#fafafa'}}>
                <CardText>
                    <h2 className="chart-title">Ad Click Performance</h2>
                    <LineChartSlider itemList={clickDatasetChartList} />
                    {/* //<DashboardLineChart data={this.prepareDataset(0)}/> */}
                </CardText>
            </Card>

            <Card className="dashboard-line-charts-card" style={{background:'#fafafa'}}>
                <CardText>
                    <h2 className="chart-title">Ad Impression Performance</h2>
                    {/* <DashboardLineChart data={this.prepareDataset(1)}/> */}
                    <LineChartSlider itemList={impressionDatasetChartList} />
                </CardText>
            </Card>
        </div>;
    }
}


export default DashboardCharts;