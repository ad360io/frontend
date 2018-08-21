import React from 'react';
import './DashboardNavigation.component.css';
import VisibilityIcon from '@material-ui/icons/VisibilityRounded';
import ShareIcon from '@material-ui/icons/ShareRounded';
import PlayArrowIcon from '@material-ui/icons/PlayArrowRounded';
import MoneyIcon from '@material-ui/icons/AttachMoneyRounded';
import RevenueIcon from '@material-ui/icons/TrendingUpRounded';
import InvoiceIcon from '@material-ui/icons/CalendarTodayRounded';

class DashboardNavigation extends React.Component {
    render() {
        return <div className='dashboard-navigation-container'>
            <div className='dashboard-nav-item noselect'>
                <p><VisibilityIcon className='material-icon' />Impression</p>
            </div>
            <div className='dashboard-nav-item noselect'>
                <p><ShareIcon className='material-icon' />Shares</p>
            </div>
            <div className='dashboard-nav-item noselect'>
                <p><PlayArrowIcon className='material-icon' />Click-throughs</p>
            </div>
            <div className='dashboard-nav-item noselect'>
                <p><MoneyIcon className='material-icon' />Placement Cost</p>
            </div>
            <div className='dashboard-nav-item noselect'>
                <p><RevenueIcon className='material-icon' />Revenue</p>
            </div>
            <div className='dashboard-nav-item noselect'>
                <p><InvoiceIcon className='material-icon' />Total Invoice Due</p>
            </div>
        </div>
    }
}

// return (this.props.modeFilter === 'Advertiser'
//             ? ['Impressions', 'Shares', 'Click-throughs', 'Conversions', 'Placement_Cost','Balance', 'Purchased_Contract', 'Total_Invoice_Due']
//             : ['Impressions', 'Shares', 'Click-throughs', 'Conversions', 'Revenue' , 'Balance', 'Active_Contract', 'Total_Invoice_Due'])

export default DashboardNavigation;