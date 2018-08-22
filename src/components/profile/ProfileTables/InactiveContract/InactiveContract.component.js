/*
Core Libs
*/
import React, { Component } from 'react';
import axios                from 'axios';

/**
 * InactiveContract Component
 */
class InactiveContract extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            finished: false,
            err: null,
            inactiveContract: []
        }
        this.loadData();
        this.loadData = this.loadData.bind(this);
    }

    componentWillReceiveProps() {
        this.loadData();
    }

    loadData() {
        const inactiveContractURL = "https://qchain-marketplace-postgrest.herokuapp.com/inactive_contract_view";
        const config = {
            headers: { Authorization: "Bearer " + localStorage.getItem('id_token')}
        };
        axios.get(inactiveContractURL, config)
                    .then((response) => {
                        this.setState({
                            ...this.state,
                            finished: true,
                            inactiveContract: response.data
                        })
                    })
                    .catch((err) => {
                        console.log(err);
                        this.setState({
                            ...this.state,
                            finished: true,
                            err: err
                        })
                    })
    }

    render() { 
        return <div className='active-listing-container'>
            <div className='table-responsive' style={{height: '320px', margin:'2%'}}>
                {
                    (this.state.finished && this.state.err === null && this.state.inactiveContract.length === 0)
                        ? (<p style={{textAlign: 'center'}}>There is currently no inactive contract...</p>)
                        : null
                }

                {
                    (this.state.finished && this.state.err === null && this.state.inactiveContract.length > 0)
                        ? (<table className='table table-bordered mb-0'>
                                <thead className='thead-default'>
                                <tr>
                                    <th>Contract Title</th>
                                    <th>Advertiser</th>
                                    <th>Publisher</th>
                                    <th>Start Date</th>
                                    <th>End Date</th>
                                    <th>Price</th>
                                </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.inactiveContract.map((contract, i)=>{
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


export default InactiveContract;