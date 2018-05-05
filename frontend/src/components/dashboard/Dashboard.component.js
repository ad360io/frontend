/*
Core Libs
*/
import React, { Component } from 'react';

/*
Local CSS
*/
import './Dashboard.component.css';

/*
Material-UI Theme
*/
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

/*
React Bootstrap Components
*/
import { Grid, Col, Row } from 'react-bootstrap';

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
    render() {
        return <div className="dashboard-container">
           
            {/*MuiThemeProvider is solely used and required for Material-UI Card, shall be changed/optimized after*/}
            <MuiThemeProvider> 
                <div className="dashboard-theme-supplier">
                    <Row>
                        <Col xs={12} md={2} className="dashboard-left">
                            <DashboardWallet/>
                            <DashboardStats />
                        </Col>

                        <Col xs={12} md={10} className="dashboard-right">
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