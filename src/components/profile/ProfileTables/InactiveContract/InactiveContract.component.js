/*
Core Libs
*/
import React, {Component} from 'react';

import './InactiveContract.component.css';
import {LoadingPanel} from "../../../../common/components/LoadingPanel";
import isEqual from 'lodash/isEqual';

/**
 * InactiveContract Component
 */
class InactiveContract extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // finished: false,
            // err: null,
            inactiveContract: null,
            // order: '?order=name.asc',
            //
            orderBy: {
                value: 'name',
                asc: true
            }
        };

        this.loadData(this.state.orderBy);
    }


    loadData = async (orderBy) => {
        let { allApis : { getJson } } = this.props;
        let queryParams = orderBy ? { order: `${orderBy.value}.${orderBy.asc ? `asc` : `desc`}`} : {};

        let resp = await getJson(`/inactive_contract_view`, { queryParams });

        this.setState({inactiveContract: resp.data});
    };

    componentDidUpdate(prevProps, prevState) {
        if(!isEqual(prevState.orderBy, this.state.orderBy)) {
            this.loadData(this.state.orderBy);
        }
    }

    toggleSort = (sortValue) => {
        let { orderBy } = this.state;

        if (orderBy == null || orderBy.value !== sortValue) {
            this.setState({orderBy: {value: sortValue, asc: true}});
        } else {
            if (orderBy.asc) {
                this.setState({orderBy: {value: sortValue, asc: false}});
            } else {
                this.setState({orderBy: {value: sortValue, asc: true}});
            }
        }
    };

    render() {
        let { inactiveContract } = this.state;

        if(inactiveContract == null) return <LoadingPanel/>;

        return (
            <div className='active-listing-container'>
                <div className='table-responsive' style={{ height: '100%', margin: '2%', minHeight: '320px' }}>
                    { (inactiveContract.length === 0)
                        ? (<p style={{ textAlign: 'center' }}>There is currently no inactive contract...</p>)
                        : (<table className='table table-bordered mb-0'>
                                <thead className='thead-default'>
                                <tr>
                                    <th
                                        className='inactive-contract-th'
                                        onClick={() => this.toggleSort('name')}>Contract Title</th>
                                    <th
                                        className='inactive-contract-th'
                                        onClick={() => this.toggleSort('advertiser_name')}>Advertiser</th>
                                    <th
                                        className='inactive-contract-th'
                                        onClick={() => this.toggleSort('publisher_name')}>Publisher</th>
                                    <th
                                        className='inactive-contract-th'
                                        onClick={() => this.toggleSort('start_date')}>Start Date</th>
                                    <th
                                        className='inactive-contract-th'
                                        onClick={() => this.toggleSort('end_date')}>End Date</th>
                                    <th
                                        className='inactive-contract-th'
                                        onClick={() => this.toggleSort('payout_cap')}>Payout Cap</th>
                                </tr>
                                </thead>
                                <tbody>
                                { inactiveContract.map((contract, i) => (
                                    <tr key={'contracttr' + i}>
                                        <td>{contract.name}</td>
                                        <td>{contract.advertiser_name}</td>
                                        <td>{contract.publisher_name}</td>
                                        <td>{contract.start_date.slice(0, 10)}</td>
                                        <td>{contract.end_date.slice(0, 10)}</td>
                                        <td>{contract.payout_cap} {contract.currency}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        )
                    }
                </div>
            </div>
        )
    }
}


export default InactiveContract;
