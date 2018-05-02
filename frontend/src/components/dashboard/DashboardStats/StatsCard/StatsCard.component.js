/*
Core Libs and Children Components
*/
import React, { Component } from 'react';

/*
Material UI Components
*/
import { Card, CardText } from 'material-ui/Card';

/*
Local CSS
*/
import './StatsCard.component.css'

/**
 * 
 */
class StatsCard extends Component {

    render() {
        return <div className="wallet-container">
            <Card className="wallet-info-card">
                <CardText>
                    <div>
                        <span className="stats-card-title"> { this.props.title } </span>
                        <span className="stats-card-trend float-right label"> { this.props.trend } </span>
                    </div>
                    <h2 className="stats-card-value"> { this.props.value } </h2>
                </CardText>
            </Card>
        </div>
    }
}


export default StatsCard;