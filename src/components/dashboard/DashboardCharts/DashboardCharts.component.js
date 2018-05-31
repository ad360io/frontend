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
        this.prepareLineChartSliderProps = this.prepareLineChartSliderProps.bind(this);
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

    injectLineChartDataset () {
        return this.prepareLineChartSliderProps().map((itemList, i)=>{
                    return <Card key={'itemList'+i} className='dashboard-charts-card'>
                                <h2 className='chart-title'> {this.getLineChartTitle(i)} Performance</h2>
                                <Divider style={{width: '75%'}}/>
                                <CardText>
                                    <LineChartSlider itemList={itemList} />
                                </CardText>
                            </Card>
                })
    }

    prepareLineChartSliderProps() {
        let itemListsForSlider = [];

        this.chooseLineChartDisplayData().map((datasets, key) => {
            let currentDatasetChartList = [];
            datasets.map((dataset, index)=>{
                return currentDatasetChartList.push(<DashboardLineChart dataset={dataset} key={key+''+index} />);
            })
            return itemListsForSlider.push(currentDatasetChartList);
        })

        return itemListsForSlider;
    }

    render() {

        

        return <div className='dashboard-charts-container'>
            {
                (this.state.triggerPlaceholder
                    ? <DashboardPlaceholder />
                    : this.injectLineChartDataset()
                ) 
            }
            {
                (this.state.triggerPlaceholder ? null : <DashboardDoughnut/>)
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
