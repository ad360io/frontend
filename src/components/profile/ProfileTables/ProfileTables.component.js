/*
Core Libs
*/
import React, { Component } from 'react';

/*
Local CSS
*/
import './ProfileTables.component.css';

/*
Children Components
*/
import ActiveListing from './ActiveListing/ActiveListing.component';
import ActiveRequest from './ActiveRequest/ActiveRequest.component';
import ActiveContract from './ActiveContract/ActiveContract.component';
import OfferList from './OfferList/OfferList.component';
import InactiveContract from './InactiveContract/InactiveContract.component';
import Invoice from './Invoice/Invoice.component';

/*
React Bootstrap
*/
import { Tabs, Tab } from 'react-bootstrap';


class ProfileTables extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTabKey: 0
        };

        this.getListingType = this.getListingType.bind(this);
        this.handleTabOnSelect = this.handleTabOnSelect.bind(this);
    }

    componentDidMount() {
        if (this.props.reader === true) {
            this.setState({ ...this.state, activeTabKey: 1 });
        }
    }

    getListingType() {
        return this.props.modeFilter === 'Advertiser' ? 'Ad' : 'Adspace';
    }

    handleTabOnSelect(key) {
        this.setState({ activeTabKey: key })
    }

    render() {
        const { allApis } = this.props;

        return <div className='dashboard-tables-container'>
            <h2 className='dashboard-tables-title'>Participating Activities</h2>
            <Tabs
                activeKey={this.state.activeTabKey}
                onSelect={this.handleTabOnSelect}
                id='dashboard-tables-tabs'
                style={{ paddingLeft: '10%', paddingRight: '10%' }}
                className='table-tabs'
                unmountOnExit={true}
            >
                {
                    this.props.reader
                        ? null
                        : <Tab eventKey={0} title='Offers'>
                            <OfferList
                                { ...{ allApis } }
                            />
                        </Tab>
                }
                <Tab eventKey={1} title='Active Listing'>
                    <ActiveListing
                        { ...{ allApis } }
                        reader={this.props.reader} userId={this.props.userId}
                    />
                </Tab>
                <Tab eventKey={2} title='Active Request'>
                    <ActiveRequest reader={this.props.reader} userId={this.props.userId} />
                </Tab>
                <Tab eventKey={3} title='Active Contracts'>
                    <ActiveContract reader={this.props.reader} userId={this.props.userId} />
                </Tab>
                {
                    this.props.reader
                        ? null
                        : <Tab eventKey={4} title='Inactive Contracts'>
                            <InactiveContract { ...{ allApis } } />
                        </Tab>
                }

                {
                    this.props.reader
                        ? null
                        : <Tab eventKey={5} title='Invoices'>
                            <Invoice />
                        </Tab>

                }
            </Tabs>
        </div>
    }
}


export default ProfileTables;
