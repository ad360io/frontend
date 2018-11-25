/*
Core Libs
*/
import React, { Component } from 'react';
import axios from 'axios';

import './ActiveRequest.component.css';
import {LoadingPanel} from "../../../../common/components/LoadingPanel";
import isEqual from "lodash/isEqual";

/**
 * ActiveRequest Component
 * @param {string} listingType passed by props to decide label
 */
class ActiveRequest extends Component {

    constructor(props) {
        super(props);
        this.state = {
            // finished: false,
            // err: null,
            activeListing: null,
            order: '?order=name.asc',

            orderBy: {
                value: 'name',
                asc: true
            }
        }

        this.loadData(this.state.orderBy);
    }

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


    // componentWillMount() {
    //     this.loadData();
    // }
    //
    // componentWillUpdate(prevProps){
    //     if(prevProps.reader !== this.props.reader
    //     || prevProps.userId !== this.props.userId){
    //         this.loadData();
    //     }
    // }

    decideURL = () => {
        if(this.props.reader) {
            return "https://marketplacedb.qchain.co/active_content_request" + this.state.order + `&owner=eq.${this.props.userId}`;
        }
        else {
            return "https://marketplacedb.qchain.co/my_active_content_request" + this.state.order;
        }
    }

    loadData = async (orderBy) => {
        let { allApis : { getJson }} = this.props;

        let queryParams = orderBy ? { order: `${orderBy.value}.${orderBy.asc ? `asc` : `desc`}`} : {};

        let resp = await getJson(`/my_active_content_request`, {queryParams} );

        this.setState({activeListing: resp.data});

        /*
        const activeListingURL = this.decideURL();
        const config = {
            headers: { Authorization: "Bearer " + localStorage.getItem('id_token') }
        };
        axios.get(activeListingURL, config)
            .then((response) => {
                this.setState({
                    ...this.state,
                    finished: true,
                    activeListing: response.data
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

        */
    }

    render() {
        const {activeListing} = this.state;

        if(activeListing == null) return <LoadingPanel/>;

        return <div className='active-listing-container'>
            <div className='table-responsive' style={{ height: '100%', margin: '2%', minHeight: '320px' }}>

                {(activeListing.length === 0)
                    ? (<p style={{ textAlign: 'center' }}>There is currently no active request...</p>)
                    : (<table className='table table-bordered mb-0'>
                        <thead className='thead-default'>
                            <tr>
                                <th
                                    className='active-request-th'
                                    onClick={() => this.toggleSort('name')}>Content Space Title</th>
                                <th
                                    className='active-request-th'
                                    onClick={() => this.toggleSort('ad_format')}>Ad Format</th>
                                <th
                                    className='active-request-th'
                                    onClick={() => this.toggleSort('medium')}>Medium</th>
                            </tr>
                        </thead>
                        <tbody>
                        { activeListing.map((listing, i) => (
                            <tr key={'listingtr' + i}>
                                <td>{listing.name}</td>
                                <td>{listing.ad_format}</td>
                                <td>{listing.medium}</td>
                            </tr>
                        ))
                        }
                        </tbody>
                    </table>
                )
                }
            </div>
        </div>
    }
}


export default ActiveRequest;
