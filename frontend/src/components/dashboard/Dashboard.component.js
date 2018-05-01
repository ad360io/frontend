/*
Core Libs
*/
import React, { Component } from 'react';

/*
Local CSS
*/
import './Dashboard.component.css';

/*
Custom Components
*/
import Footer from '../footer/Footer.component';
import WallofText from '../../components/WallofText';

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
            <WallofText />
            <Footer />
        </div>;
    }
}


export default Dashboard;