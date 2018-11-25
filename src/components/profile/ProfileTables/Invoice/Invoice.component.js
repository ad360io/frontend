/*
Core Libs
*/
import React, {Component} from 'react';

import './Invoice.component.css';
import {LoadingPanel} from "../../../../common/components/LoadingPanel";
import {invoiceModal, InvoiceViewModal} from "./InvoiceViewModal";
import isEqual from "lodash/isEqual";


/**
 * ActiveContract Component
 */
class Invoice extends Component {

    constructor(props) {
        super(props);
        this.state = {
            // finished: false,
            // err: null,
            invoices: null,
            orderBy: {
                value: 'listing_title',
                asc: true
            }
        };

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

    loadData = async (orderBy) => {
        let { allApis : { getJson } } = this.props;

        let queryParams = orderBy ? { order: `${orderBy.value}.${orderBy.asc ? `asc` : `desc`}`} : {};

        let resp = await getJson(`/my_invoices`, { queryParams });

        this.setState({invoices: resp.data});
    };

    render() {
        let { invoices } = this.state;

        if( invoices == null ) return <LoadingPanel/>;

        return (
            <div className='active-listing-container'>
                <div className='table-responsive' style={{ height: '100%', margin: '2%', minHeight: '320px' }}>
                    {(invoices.length === 0)
                        ? (<p style={{ textAlign: 'center' }}>There is currently no invoices...</p>)
                        :(<table className='table table-bordered mb-0'>
                                <thead className='thead-default'>
                                <tr>
                                    <th
                                        className='invoice-th'
                                        onClick={() => this.toggleSort('listing_title')}>Listing Title</th>
                                    <th
                                        className='invoice-th'
                                        onClick={() => this.toggleSort('publisher_name')}>Publisher</th>
                                    <th
                                        className='invoice-th'
                                        onClick={() => this.toggleSort('amount')}>Amount</th>
                                </tr>
                                </thead>
                                <tbody>
                                { invoices.map((invoice, i) => (
                                    <tr key={'invoices' + i}>
                                        <td
                                            onClick={() => invoiceModal.openModal(invoice)}
                                            style={{ color: '#3366BB', cursor: 'pointer' }}
                                        >
                                            {invoice.listing_title}
                                        </td>
                                        <td>{invoice.publisher_name}</td>
                                        <td>{invoice.amount} {invoice.currency}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        )
                    }
                </div>

                <InvoiceViewModal/>
            </div>
        )
    }
}


export default Invoice;
