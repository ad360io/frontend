/*
Core Libs
*/
import React from 'react';
import { connect } from 'react-redux';

/*
Local CSS
*/
import './Dashboard.component.css';

/*
React Bootstrap Components
*/
import { Col, Row, Grid } from 'react-bootstrap';

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
const Dashboard = () =>
    <div className='dashboard-container'>
        <Grid className='dashboard-grid'>
            <Row>
                <Col xs={12} lg={5} sm={8} className='dashboard-left'>
                    <DashboardWallet className='wallet-div'/>
                    <StatsProvider   className='stats-div'/>
                </Col>

                <Col xs={12} lg={7} sm={4} className='dashboard-right'>
                    <ChartsProvider />
                </Col>
            </Row>
        </Grid>
        <Footer />
    </div>

const mapStateToProps = (state) => {
    return {
        modeFilter      : state.MenuBarFilterReducer.modeFilter,
        currencyFilter  : state.MenuBarFilterReducer.currencyFilter,
    }
}
const StatsProvider = connect(
    mapStateToProps,
    {}
)(DashboardStats)

const ChartsProvider = connect(
    mapStateToProps,
    {}
)(DashboardCharts)


export default Dashboard;
