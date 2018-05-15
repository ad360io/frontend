import React, { Component } from 'react';
import './DashboardTables.component.css';

import ActiveListing  from './ActiveListing/ActiveListing.component';
import ActiveContract from './ActiveContract/ActiveContract.component';

import {Card, CardText} from 'material-ui';

import {Tabs, Tab} from 'react-bootstrap';

class DashboardTables extends Component {
    constructor(props){
        super(props);
        this.state = {
            activeTabKey: 1
        }

        this.getListingType = this.getListingType.bind(this);
        this.handleTabOnSelect = this.handleTabOnSelect.bind(this);
    }

    getListingType() {
        return this.props.modeFilter === 'Advertiser' ? 'Ad' : 'Adspace';
    }

    handleTabOnSelect(key) {
        this.setState({activeTabKey: key})
    }

    render(){
        return <div className="dashboard-tables-container">
        
                <Card className="table-card table-left" style={{background: '#fafafa'}}>
                    <h2 className="dashboard-tables-title">Participating Activities</h2>
                    <CardText>
                        <Tabs activeKey={this.state.activeTabKey}
                            onSelect={this.handleTabOnSelect}
                            id="dashboard-tables-tabs"
                            style={{paddingLeft: '5%', paddingRight:'5%'}}
                            className="table-tabs"
                        >
                            <Tab eventKey={1} title="Active Listing">
                                <ActiveListing listingType={this.getListingType()} />
                            </Tab>

                            <Tab eventKey={2} title="Active Contracts">
                                <ActiveContract listingType={this.getListingType()} />
                            </Tab>
                        </Tabs>
                        
                    </CardText>
                </Card>
          
        </div>
    }
}


export default DashboardTables;