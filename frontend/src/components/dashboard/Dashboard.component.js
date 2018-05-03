/*
Core Libs
*/
import React, { Component } from 'react';

/*
Local CSS
*/
import './Dashboard.component.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

/*
React Bootstrap Components
*/
import { Grid, Col, Row } from 'react-bootstrap';

/*
Custom Components
*/
import Footer from '../footer/Footer.component';
import DashboardWallet from './DashboardWallet/DashboardWallet.component';
import DashboardStats from './DashboardStats/DashboardStats.component';
import DashboardCharts from './DashboardCharts/DashboardCharts.component';

/**
 * 
 */
class Dashboard extends Component {
    render() {
        return <div className="dashboard-container">
            <MuiThemeProvider>
                <div className="dashboard-theme-supplier">

                <Row>
                    <Col xs={12} md={2} className="dashboard-left">
                        <DashboardWallet/>
                        <DashboardStats />
                    </Col>

                    <Col xs={12} md={8} className="dashboard-right">
                        <DashboardCharts />
                    </Col>
                </Row>
                
                </div>
            </MuiThemeProvider>
            <Footer />
        </div>;
    }
}


export default Dashboard;