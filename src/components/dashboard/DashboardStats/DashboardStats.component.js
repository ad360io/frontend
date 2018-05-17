/*
Core Libs and Children Components
*/
import React, { Component } from 'react';

/*
Custom Components
*/
import StatsCard from './StatsCard/StatsCard.component';

/*
Material UI Card
*/
import { Card, CardText } from 'material-ui/Card';

/*
Local CSS
*/
import './DashboardStats.component.css'
import fake_24hr_data from '../../../assets/fakeData/fakeDashboardData/fake-24-hr';

/**
 *
 */
class DashboardStats extends Component {

    constructor(props){
        super(props);
        this.getStatsCardTitles = this.getStatsCardTitles.bind(this);
        this.getStatsCardValueByTitle = this.getStatsCardValueByTitle.bind(this);
    }

    getStatsCardTitles() {
        return (this.props.modeFilter === 'Advertiser' ?
            ['Impressions', 'Expenses', 'Balance']:
            ['Impressions', 'Revenue' , 'Balance'])
    }

    getStatsCardValueByTitle(title) {
        // TODO(ahuszagh) Change to use an API call in the constructor.
        return (this.props.modeFilter === 'Advertiser' ?
            fake_24hr_data.adv_24hr_data[title]:
            fake_24hr_data.pub_24hr_data[title])
    }

    render() {
        return <div className='stats-container'>
            <Card className='stats-container-card'>
                <h2 className='stats-title'>Last 24 Hours</h2>
                <CardText>
                {
                    this.getStatsCardTitles().map((statsTitle, i)=>{
                        return <StatsCard   title={statsTitle}
                                            value={this.getStatsCardValueByTitle(statsTitle)}
                                            trend={this.getStatsCardValueByTitle(statsTitle+'_trend')}
                                            key={this.props.modeFilter+statsTitle} />
                    })
                }
                </CardText>
            </Card>
        </div>
    }
}


export default DashboardStats;
