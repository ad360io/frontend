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


/**
 * 
 */
class DashboardCharts extends Component {

    
    prepareLineChartXaxis(){
        let daysLabel = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        let today = new Date().getDay();
        let labelsArray = new Array(30);
        for (let i = 0; i < 30; i++) {
            labelsArray[30-i] = daysLabel[this.mod((today - i),7)];
        }
        return labelsArray;
    }

    mod(n, m) {
        return ((n % m) + m) % m;
    }

    prepareDataset(sampleIndex){
        let sampleRGB = ['rgba(75,192,192,1)', 'rgba(255,20,20,1)'];
        let sampleDataset = (sampleIndex ? clickDatasetsInEqc[0] : impressionDatasetsInEqc[0]);
        const data = {
            labels : this.prepareLineChartXaxis(),
            datasets: [
              {
                label: 'Some Ad names maybe',
                fill: false,
                lineTension: 0.1,
                backgroundColor: sampleRGB[sampleIndex],
                borderColor: sampleRGB[sampleIndex],
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: sampleRGB[sampleIndex],
                pointBackgroundColor: '#fff',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: sampleRGB[sampleIndex],
                pointHoverBorderColor: sampleRGB[sampleIndex],
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: sampleDataset
              }
            ]
          };
        return data;
    }

    render() {
        return <div className="dashboard-charts-container">
            <Card className="dashboard-line-charts-card" style={{background:'#fafafa'}}>
                <CardText>
                    <h2 className="chart-title">Ad Click Performance</h2>
                    <DashboardLineChart data={this.prepareDataset(0)}/>
                </CardText>
            </Card>

            <Card className="dashboard-line-charts-card" style={{background:'#fafafa'}}>
                <CardText>
                    <h2 className="chart-title">Ad Impression Performance</h2>
                    <DashboardLineChart data={this.prepareDataset(1)}/>
                </CardText>
            </Card>
        </div>;
    }
}


export default DashboardCharts;