/*
Core Libs
*/
import React, { Component } from 'react';
import { connect }          from 'react-redux';

/*
Local CSS
*/
import './DashboardCharts.component.css';

/*
Material UI Components
*/
import { Card, CardText } from 'material-ui/Card';
import  Divider           from 'material-ui/Divider';

/*
Children Components
*/
import DashboardLineChart   from './DashboardLineChart/DashboardLineChart.component';
import LineChartSlider      from './LineChartSlider/LineChartSlider.component';
import DashboardDoughnut    from './DashboardDoughnut/DashboardDoughnut.component';
import DashboardPlaceholder from '../DashboardPlaceholder/DashboardPlaceholder.component';


/**
 *
 */
class DashboardCharts extends Component {

    constructor(props){
        super(props);
        this.state = {
            triggerPlaceholder: false
        }
        this.chooseLineChartDisplayData = this.chooseLineChartDisplayData.bind(this);
        this.injectLineChartDataset = this.injectLineChartDataset.bind(this);
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
     * @param { number } n operand
     * @param { number } m operand base
     */
    mod(n, m) {
        return ((n % m) + m) % m;
    }

    /**
     * This Method initialize the data object that is required for Chart.js component
     * @param {*} dataset provide the array of numbers that is to be plotted to chart.
     */
    prepareDatasetToLineChart(dataset){
        const data = {
            labels : this.prepareLineChartXaxisLabels(dataset),
            datasets: [
              {
                label: 'Some Content names maybe',
                fill: true,
                lineTension: 0.05,
                backgroundColor: 'rgba(20,78,170,0.3)',
                borderColor: 'rgba(20,78,170,1)',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: 'rgba(20,78,170,1)',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'rgba(20,78,170,1)',
                pointHoverBorderColor: 'rgba(20,78,170,1)',
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


    /**
     * Fairly dirty code here, please fix if got a better solution
     * @param {*} previousProps 
     * @param {*} previousState 
     */
    componentDidUpdate(previousProps, previousState) {
        
        if(this.props.modeFilter === 'Advertiser'){
            // Advertiser charts (Clicks, Impressions)
            if(this.props.currencyFilter === 'EQC') {
                let newState = {
                    triggerPlaceholder: this.props.fetched 
                        && this.props.eqcClicks.length === 0
                        && this.props.eqcImpressions.length === 0
                }
                if(newState.triggerPlaceholder !== previousState.triggerPlaceholder){
                    this.setState(newState)
                }
            }else {
                let newState = {
                    triggerPlaceholder: this.props.fetched 
                        && this.props.xqcClicks.length === 0
                        && this.props.xqcImpressions.length === 0
                }
                if(newState.triggerPlaceholder !== previousState.triggerPlaceholder){
                     this.setState(newState)
                }           
            }
        }else {
            // Publisher charts  (Clicks, Impression, RPM, Revenue)
            // returning empty array at this time to serve as a test case and wait for actual data
            if(this.props.currencyFilter === 'EQC') {
                let newState = {
                    triggerPlaceholder: true
                }
                if(newState.triggerPlaceholder !== previousState.triggerPlaceholder){
                    this.setState(newState)
                } 
            }else {
                let newState = {
                    triggerPlaceholder: true
                }
                if(newState.triggerPlaceholder !== previousState.triggerPlaceholder){
                    this.setState(newState)
                } 
            }
        }
    }

    chooseLineChartDisplayData() {
        if(this.props.modeFilter === 'Advertiser'){
            // Advertiser charts (Clicks, Impressions)
            return (this.props.currencyFilter === 'EQC' ? [this.props.eqcClicks, this.props.eqcImpressions]
                        : [this.props.xqcClicks, this.props.xqcImpressions])
        }else {
            // Publisher charts  (Clicks, Impression, RPM, Revenue)
            // returning empty array at this time to serve as a test case and wait for actual data
            return (this.props.currencyFilter === 'EQC' ? [[[]]] : [[[]]]);
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
                    return 'Content Impression';
                case 1:
                    return 'Content Measurable';
                default:
                    return null;
            }
        }else {                                             // Publisher
            switch (k) {
                case 0:
                    return 'Content Space Revenue';
                case 1:
                    return 'Content Space Impressions';
                default:
                    return null;
            }
        }

    }

    chooseDoughnutDataset() {
        // TODO(ahuszagh): fix, shouldn't be hard-coded.
        return {
            labels: [
                'Contract Uno',
                'Contract Dos',
                'Contract Tres',
            ],
            datasets: [{
                data: [300, 50, 100],
                backgroundColor: [
                    'rgba(38,40,191, 1.0)',
                    'rgba(255,170,0, 1.0)',
                    'rgba(100,46,165, 1.0)'
                ],
                hoverBackgroundColor: [
                    'rgba(38,40,191, 0.9)',
                    'rgba(255,170,0, 0.9)',
                    'rgba(100,46,165, 0.9)',
                ]
            }]
        };
    }

    injectLineChartDataset (itemListsForSlider) {
        return itemListsForSlider.map((itemList, i)=>{
                    return <Card key={'itemList'+i} className='dashboard-charts-card'>
                                <h2 className='chart-title'> {this.getLineChartTitle(i)} Performance</h2>
                                <Divider style={{width: '75%'}}/>
                                <CardText>
                                    <LineChartSlider itemList={itemList} />
                                </CardText>
                            </Card>
                })
    }

    render() {

        let itemListsForSlider = [];
        this.chooseLineChartDisplayData().map((datasets, key) => {
            let currentDatasetChartList = [];
            datasets.map((dataset, index)=>{
                let currentDataset = this.prepareDatasetToLineChart(dataset);
                return currentDatasetChartList.push(<DashboardLineChart data={currentDataset} key={key+''+index} />);
            })
            return itemListsForSlider.push(currentDatasetChartList);
        })

        const doughnutChart = (
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
        )

        return <div className='dashboard-charts-container'>
            {
                (this.state.triggerPlaceholder
                    ? <DashboardPlaceholder />
                    : this.injectLineChartDataset(itemListsForSlider)
                ) 
            }
            {
                (this.state.triggerPlaceholder ? null : doughnutChart)
            }
        </div>;
    }
}

const mapStateToProps = (state) => {
    return {
        eqcClicks      : state.DatabaseReducer.db.eqcClicks,
        eqcImpressions : state.DatabaseReducer.db.eqcImpressions,
        xqcClicks      : state.DatabaseReducer.db.xqcClicks,
        xqcImpressions : state.DatabaseReducer.db.xqcImpressions,
        fetched      : state.DatabaseReducer.fetched
    }
}

const mapDispatchToProps = (dispatch) => {
    return {}
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DashboardCharts);
