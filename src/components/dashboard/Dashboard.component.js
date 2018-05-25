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
    }

    componentDidMount() {
        document.title = "Qchain - Dashboard";
        
        // Register data loading every 10 minutes.
        const tenMinutes = 1000 * 60 * 10 ;
        this.loadDataInterval = setInterval(this.props.onStartLoadData, tenMinutes);
    }

    componentWillUnmount() {
        // Tidy up
        clearInterval(this.loadDataInterval);
        this.loadDataInterval = 0;
    }

    render() {
        return <div className='dashboard-container'>
            <Grid className='dashboard-grid'>
                <Row>
                    <Col xs={12} lg={5} sm={8} className='dashboard-left'>
                        <DashboardWallet className='wallet-div'/>
                        <DashboardStats modeFilter={this.props.modeFilter} 
                            currencyFilter={this.props.currencyFilter}  
                            className='stats-div'/>
                    </Col>

                    <Col xs={12} lg={7} sm={4} className='dashboard-right'>
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
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onStartLoadData : () => {
            dispatch((dispatch) => {
                dispatch({type: 'FETCH_DATABASE_PENDING'})
                axios.get(`${window.location.protocol}//${window.location.host}/api/db`)
                    .then((response) => {
                        dispatch({
                            type: 'FETCH_DATABASE_FULFILLED',
                            payload: response.data
                        })
                    })
                    .catch((err) => {
                        dispatch({
                            type: 'FETCH_DATABASE_REJECTED',
                            payload: err
                        })
                    })
            })
        }
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Dashboard);
