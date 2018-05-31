/*
Core Libs
*/
import React, { Component } from 'react';
import { connect }          from 'react-redux';

/*
Local CSS
*/
import './Dashboard.component.css';

/*
React Bootstrap Components
*/
import { Col, Row, Grid } from 'react-bootstrap';

/*
Networking
*/
import axios from 'axios';

/*
Actions
*/
import { fetchFulfilled, fetchPending, fetchRejected } from '../../actions/DatabaseRequestActions';

/*
Custom Components
*/
import Footer           from '../footer/Footer.component';
import DashboardWallet  from './DashboardWallet/DashboardWallet.component';
import DashboardStats   from './DashboardStats/DashboardStats.component';
import DashboardCharts  from './DashboardCharts/DashboardCharts.component';


/**
 * Dashboard container manages the layout of each children components
 * ! Caution: when changing css, be aware dashboard-right may overlap to left on screen resize
 */
class Dashboard extends Component {

    constructor(props){
        super(props);
        props.onStartLoadData();
        this.decideSmallDashboardLeft = this.decideSmallDashboardLeft.bind(this);
        this.decideSmallDashboardRight = this.decideSmallDashboardRight.bind(this);
    }

    componentDidMount() {
        document.title = "Qchain - Dashboard";
        
        // Register data loading every 10 minutes.
        const tenMinutes = 1000 * 60 * 10;
        this.loadDataInterval = setInterval(this.props.onStartLoadData, tenMinutes);
    }

    componentWillUnmount() {
        // Tidy up
        clearInterval(this.loadDataInterval);
        this.loadDataInterval = 0;
    }

    decideSmallDashboardLeft() {
        return this.props.isDatabaseEmpty ? 5 : 8
    }

    decideSmallDashboardRight() {
        return this.props.isDatabaseEmpty ? 7 : 4
    }

    render() {
        return <div className='dashboard-container'>
            <Grid className='dashboard-grid'>
                <Row>
                    <Col xs={12} lg={5} sm={this.decideSmallDashboardLeft()} className='dashboard-left'>
                        <DashboardWallet className='wallet-div'/>
                        <DashboardStats modeFilter={this.props.modeFilter} 
                            currencyFilter={this.props.currencyFilter}  
                            className='stats-div'/>
                    </Col>

                    <Col xs={12} lg={7} sm={this.decideSmallDashboardRight()} className='dashboard-right'>
                        <DashboardCharts modeFilter={this.props.modeFilter}
                            currencyFilter={this.props.currencyFilter} />
                    </Col>
                </Row>
            </Grid>
            <Footer />
        </div>
    }
}

const mapStateToProps = (state) => {
    return {
        modeFilter      : state.MenuBarFilterReducer.modeFilter,
        currencyFilter  : state.MenuBarFilterReducer.currencyFilter,
        isDatabaseEmpty : state.DatabaseReducer.isEmpty
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onStartLoadData : () => {
            dispatch((dispatch) => {
                dispatch(fetchPending())
                axios.get(`${window.location.protocol}//${window.location.host}/api/db`)
                    .then((response) => {
                        dispatch(fetchFulfilled(response.data))
                    })
                    .catch((err) => {
                        dispatch(fetchRejected(err))
                    })
            })
        }
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Dashboard);
