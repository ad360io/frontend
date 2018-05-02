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

/**
 * 
 */
class DashboardStats extends Component {

    render() {
        return <div className="stats-container">
            <Card className="stats-container-card">
                <CardText>
                    <StatsCard title="IMPRESSION" value="123" trend="-12" />
                </CardText>
            </Card>
        </div>
    }
}


export default DashboardStats;