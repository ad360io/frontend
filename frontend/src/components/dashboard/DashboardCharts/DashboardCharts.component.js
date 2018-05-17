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
import clickDatasetsInEqc      from '../../../assets/fakeData/fakeDashboardData/fake-click-eqc';
import clickDatasetsInXqc      from '../../../assets/fakeData/fakeDashboardData/fake-click-xqc';
import impressionDatasetsInEqc from '../../../assets/fakeData/fakeDashboardData/fake-impression-eqc';
import impressionDatasetsInXqc from '../../../assets/fakeData/fakeDashboardData/fake-impression-xqc';

/*
Material UI Components
*/
import { Card, CardText } from 'material-ui/Card';
import  Divider           from 'material-ui/Divider';

/*
Children Components
*/
import DashboardLineChart from './DashboardLineChart/DashboardLineChart.component';
import LineChartSlider    from './LineChartSlider/LineChartSlider.component';
import DashboardDoughnut  from './DashboardDoughnut/DashboardDoughnut.component';


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

        this.chooseLineChartDisplayData = this.chooseLineChartDisplayData.bind(this);
    }

    /**
     * Based on the dataset that needs to be graphed, return the X-axis labels
     * Labels are capped at 30, which is a month in this case
     * @param {*} dataset Array of numbers that represent historical data by days.
     */
    prepareLineChartXaxisLabels(dataset){
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
    prepareDatasetToLineChart(dataset, rbgaString){
        const data = {
            labels : this.prepareLineChartXaxisLabels(dataset),
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

    chooseLineChartDisplayData() {
        if(this.props.modeFilter === 'Advertiser'){
            // Advertiser charts (Clicks, Impressions)
            return (this.props.currencyFilter === 'EQC' ? [this.state.clickDatasetsInEqc, this.state.impressionDatasetsInEqc]
                        : [this.state.clickDatasetsInXqc, this.state.impressionDatasetsInXqc])
        }else {
            // Publisher charts  (Clicks, Impression, RPM, Revenue)
            // returning empty array at this time to serve as a test case and wait for actual data
            return (this.props.currencyFilter === 'EQC' ? [] : []);
        }
    }

    getLineColor(k) {
        switch (k){
            case 1:
                return 'rgba(200,20,20,1)';
            case 2:
                return 'rgba(0,128,128,1)';
            case 3:
                return 'rgba(40,240,240,1)';
            default:
                return 'rgba(32,178,120,1)';
        }
    }

    /**
     * Definitely Need Refactoring after database ( API ) is ready
     * @param {*} k
     */
    getLineChartTitle(k){
        if(this.props.modeFilter === 'Advertiser'){         // Advertiser
            switch (k){
                case 0:
                    return 'Ad Clicks';
                case 1:
                    return 'Ad Impressions'
                default:
                    return null;
            }
        }else {                                             // Publisher
            switch (k) {
                case 0:
                    return 'Adspace Clicks';
                case 1:
                    return 'Adspace Impressions';
                case 2:
                    return 'Adspace Revenue';
                case 3:
                    return 'Adspace RPM';
                default:
                    return null;
            }
        }

    }

    chooseDoughnutDataset() {
        return {
            labels: [
                'Contract Uno',
                'Contract Dos',
                'Contract Tres',
            ],
            datasets: [{
                data: [300, 50, 100],
                backgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56'
                ],
                hoverBackgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56'
                ]
            }]
        };
    }

    render() {

        let itemListsForSlider = [];
        this.chooseLineChartDisplayData().map((datasets, key) => {
            let currentDatasetChartList = [];
            datasets.map((dataset, index)=>{
                let currentDataset = this.prepareDatasetToLineChart(dataset,this.getLineColor(key));
                return currentDatasetChartList.push(<DashboardLineChart data={currentDataset} key={key+''+index} />);
            })
            return itemListsForSlider.push(currentDatasetChartList);
        })

        return <div className='dashboard-charts-container'>
            {
                itemListsForSlider.map((itemList, i)=>{
                    return <Card key={'itemList'+i} className='dashboard-charts-card'>
                                <h2 className='chart-title'> {this.getLineChartTitle(i)} Performance</h2>
                                <Divider style={{width: '75%'}}/>
                                <CardText> 
                                    <LineChartSlider itemList={itemList} />
                                </CardText>
                            </Card>
                })
            }
            {
                <Card className='dashboard-charts-card doughnut-card'>
                  <h2 className='chart-title'> Highest Grossing Contracts </h2> 
                    <Divider style={{width: '75%'}}/>
                    <CardText>
                        <div className='highest-gross-card-left'>
                            <DashboardDoughnut data={this.chooseDoughnutDataset()} />
                        </div>
                        <div className='highest-gross-card-right'>
                            {/* Build this info dynamically after we are pulling real data*/}
                            The <a><i>Contract Uno</i></a> is the best deal you've done! 
                            <span className='quick-maf'> 66.6</span>% of your total grossing are generated here!
                        </div>
                    </CardText>
                </Card>
            }
        </div>;
    }
}


export default DashboardCharts;
