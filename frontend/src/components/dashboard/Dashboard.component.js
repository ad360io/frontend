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
Custom Components
*/
import Footer from '../footer/Footer.component';
import WallofText from '../../components/WallofText';
import DashboardWallet from './DashboardWallet/DashboardWallet.component';
import DashboardStats from './DashboardStats/DashboardStats.component';

/**
 * 
 */
class Dashboard extends Component {
    render() {
        return <div className="dashboard-container">
            <MuiThemeProvider>
                <div className="dashboard-theme-supplier">
                    <DashboardWallet/>
                    <DashboardStats />
                </div>
            </MuiThemeProvider>
            <Footer />
        </div>;
    }
}


export default Dashboard;