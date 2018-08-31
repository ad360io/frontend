/*
Core Libs
*/
import React, { Component } from 'react';
import axios from 'axios';
import './ActiveContract.component.css';

/**
 * ActiveContract Component
 */
class ActiveContract extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fetching: false,
            finished: false,
            err: null,
            activeContract: [],
            order: ''
        }
        this.loadData = this.loadData.bind(this);
    }

    componentWillReceiveProps() {
        this.loadData();
    }

    componentDidMount() {
        this.loadData();
    }

    loadData() {
        this.setState({ ...this.state, fetching: true })
        const activeContractURL = "https://qchain-marketplace-postgrest.herokuapp.com/active_contract_view" + this.state.order;
        const config = {
            headers: { Authorization: "Bearer " + localStorage.getItem('id_token') }
        };
        axios.get(activeContractURL, config)
            .then((response) => {
                this.setState({
                    ...this.state,
                    finished: true,
                    fetching: false,
                    activeContract: response.data
                })
            })
            .catch((err) => {
                console.log(err);
                this.setState({
                    ...this.state,
                    finished: true,
                    fetching: false,
                    err: err
                })
            })
    }

    handleThClick = (header) => {
        new Promise((resolve) => {
            if (this.state.order.includes(header)) {
                if (this.state.order.includes(".desc")) {
                    resolve(this.setState({ ...this.state, order: `?order=${header}` }))
                } else {
                    resolve(this.setState({ ...this.state, order: `?order=${header}.desc` }))
                }
            } else {
                resolve(this.setState({ ...this.state, order: `?order=${header}` }))
            }
        }).then(() => {
            this.loadData();
        })
    }

    render() {

        return <div className='active-listing-container'>
            <div className='table-responsive' style={{ height: '320px', margin: '2%' }}>
                {
                    (this.state.finished && this.state.err === null && this.state.activeContract.length === 0)
                        ? (<p style={{ textAlign: 'center' }}>There is currently no active contract...</p>)
                        : null
                }

                {
                    (this.state.finished && this.state.err === null && this.state.activeContract.length > 0)
                        ? (<table className='table table-bordered mb-0'>
                            <thead className='thead-default'>
                                <tr>
                                    <th
                                        className='active-contract-th'
                                        onClick={() => this.handleThClick('name')}>Contract Title</th>
                                    <th
                                        className='active-contract-th'
                                        onClick={() => this.handleThClick('advertiser_name')}>Advertiser</th>
                                    <th
                                        className='active-contract-th'
                                        onClick={() => this.handleThClick('publisher_name')}>Publisher</th>
                                    <th
                                        className='active-contract-th'
                                        onClick={() => this.handleThClick('start_date')}>Start Date</th>
                                    <th
                                        className='active-contract-th'
                                        onClick={() => this.handleThClick('end_date')}>End Date</th>
                                    <th className='active-contract-th'
                                        onClick={() => this.handleThClick('payout_cap')}>Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.activeContract.map((contract, i) => {
                                        return (<tr key={'contracttr' + i}>
                                            <td>{contract.name}</td>
                                            <td>{contract.advertiser_name}</td>
                                            <td>{contract.publisher_name}</td>
                                            <td>{contract.start_date}</td>
                                            <td>{contract.end_date}</td>
                                            <td>{contract.payout_cap} {contract.currency}</td>
                                        </tr>)
                                    })
                                }
                            </tbody>

                        </table>
                        )
                        : null
                }
            </div>
        </div>
    }

}


export default ActiveContract;