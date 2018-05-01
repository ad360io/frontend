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

/**
 * 
 */
class Dashboard extends Component {
    render() {
        return <div className="dashboard-container">
            {/* <div class="dashboard-left">
                <app-adv-dashboard-wallet></app-adv-dashboard-wallet>
                <app-adv-dashboard-stats></app-adv-dashboard-stats>
            </div>
    
            <div class="dashboard-right">
                <div class="charts">
                    <app-adv-dashboard-charts></app-adv-dashboard-charts>
                </div>
            </div>

            <div class="tables">
                <app-adv-dashboard-tables></app-adv-dashboard-tables>
            </div> */}
            <MuiThemeProvider>
                <DashboardWallet/>
                <WallofText />
            </MuiThemeProvider>
            <Footer />
        </div>;
    }
}


export default Dashboard;