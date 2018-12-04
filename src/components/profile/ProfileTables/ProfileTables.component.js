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
            activeIdx: 0
        };

        // this.getListingType = this.getListingType.bind(this);
        // this.handleTabOnSelect = this.handleTabOnSelect.bind(this);
    }

    // componentDidMount() {
    //     if (this.props.reader === true) {
    //         this.setState({ ...this.state, activeTabKey: 1 });
    //     }
    // }

    // getListingType() {
    //     return this.props.modeFilter === 'Advertiser' ? 'Ad' : 'Adspace';
    // }

    componentDidUpdate(prevProps) {
        if(prevProps.modeFilter !== this.props.modeFilter) {
            this.setState({activeIdx: 0})
        }
    }

    render() {
        const { allApis, modeFilter } = this.props;
        const { activeIdx } = this.state;

        let list = [
            {
                title: "Offers",
                render: () => <OfferList/>,
                condition: modeFilter === "Advertiser"
            },
            {
                title: "Active Listing",
                render: () => <ActiveListing/>,
                condition: true
            },
            {
                title: "Active Request",
                render: () => <ActiveRequest/>,
                condition: true
            },
            {
                title: "Active Contracts",
                render: () => <ActiveContract/>,
                condition: true
            },
            {
                title: "Inactive Contracts",
                render: () => <InactiveContract/>,
                condition: true
            },
            {
                title: "Invoices",
                render: () => <Invoice/>,
                condition: true
            },
        ];

        return <div className='dashboard-tables-container'>
            <h2 className='dashboard-tables-title'>Participating Activities</h2>
            <Tabs
                activeKey={activeIdx}
                onSelect={(activeIdx) => this.setState({ activeIdx })}
                id='dashboard-tables-tabs'
                style={{ paddingLeft: '10%', paddingRight: '10%' }}
                className='table-tabs'
                unmountOnExit={true}
            >
                { list
                    .filter((l) => l.condition)
                    .map((l, key) => (
                        <Tab eventKey={key} title={l.title} key={key}>
                            {React.cloneElement(l.render(), { allApis })}
                        </Tab>
                    ))
                }

            </Tabs>
        </div>
    }
}


export default ProfileTables;
