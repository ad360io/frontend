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
        this.state = {
            mode: 'Advertiser'
        }
        this.getStatsTitles = this.getStatsTitles.bind(this);
        this.getStatsValueByTitle = this.getStatsValueByTitle.bind(this);
    }

    getStatsTitles(){
        if(this.state.mode === 'Advertiser'){
            return ['Impressions', 'Clicks', 'CPM', 'Expenses', 'Balance'];
        }else{
            return ['Impressions', 'Clicks', "RPM", "Revenue", "Balance"];
        }
    }

    getStatsValueByTitle(title){
        if(this.state.mode === 'Advertiser'){
            return fake_24hr_data.adv_24hr_data[title];
        }else{
            return fake_24hr_data.pub_24hr_data[title];
        }
    }

    // for advertiser stats card should contain [ Impressions, Clicks, CPM, Expenses, Balance ]
    // for publisher stats card should contain  [ Impressions, Clicks, RPM, Revenue,  Balance ]

    render() {
        return <div className="stats-container">
            <Card className="stats-container-card">
                <h3 className="stats-title"> Last 24 Hours </h3>
                <CardText>
                {
                    this.getStatsTitles().map((statsTitle, i)=>{
                        return <StatsCard   title={statsTitle} 
                                            value={this.getStatsValueByTitle(statsTitle)} 
                                            trend={this.getStatsValueByTitle(statsTitle+"_trend")}
                                            key={this.state.mode+statsTitle} />
                    })
                }
                </CardText>
            </Card>
        </div>
    }
}


export default DashboardStats;