/*
Core Libs
*/
import React, { Component } from 'react';
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
Material UI
*/
import CircularProgress from 'material-ui/CircularProgress';

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
import Footer from '../footer/Footer.component';
import DashboardWallet from './DashboardWallet/DashboardWallet.component';
import DashboardStats from './DashboardStats/DashboardStats.component';
import DashboardCharts from './DashboardCharts/DashboardCharts.component';


/**
 * Dashboard container manages the layout of each children components
 * ! Caution: when changing css, be aware dashboard-right may overlap to left on screen resize
 */
class Dashboard extends Component {

    constructor(props) {
        super(props);
        props.onStartLoadData();
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

    render() {
        return <div>
            {
                this.props.fetched 
                ? <DashboardRenderer 
                    modeFilter={this.props.modeFilter} 
                    currencyFilter={this.props.currencyFilter} 
                />
                : <ProgressRenderer />
            }
        </div>
    }
}

const DashboardRenderer = ({ modeFilter, currencyFilter }) => (
    <div className='dashboard-container'>
        <Grid className='dashboard-grid'>
            <Row>
                <Col xs={12} lg={5} sm={8} className='dashboard-left'>
                    <DashboardWallet className='wallet-div' />
                    <DashboardStats
                        modeFilter={modeFilter}
                        currencyFilter={currencyFilter}
                        className='stats-div' />
                </Col>

                <Col xs={12} lg={7} sm={4} className='dashboard-right'>
                    <DashboardCharts
                        modeFilter={modeFilter}
                        currencyFilter={currencyFilter} />
                </Col>
            </Row>
        </Grid>
        <Footer />
    </div>
)

const ProgressRenderer = () => (
    <div className="progress-renderer">
        <CircularProgress style={{ color: 'purple' }} size={100} thickness={6} />
    </div>
)

const mapStateToProps = (state) => {
    return {
        modeFilter: state.MenuBarFilterReducer.modeFilter,
        currencyFilter: state.MenuBarFilterReducer.currencyFilter,
        fetched: state.DatabaseReducer.fetched
    }
}

const mapDispatchToProps = (dispatch) => {
    const proxyURL = `${window.location.protocol}//${window.location.host}/api/db`;
    //const trueURL = "https://d9aubk6q99.execute-api.us-east-1.amazonaws.com/production/db/fake/db";
    return {
        onStartLoadData: () => {
            dispatch((dispatch) => {
                dispatch(fetchPending())
                axios.get(proxyURL)
                    .then((response) => {
                        dispatch(fetchFulfilled(response.data))
                    })
                    .catch((err) => {
                        console.log(err)
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
