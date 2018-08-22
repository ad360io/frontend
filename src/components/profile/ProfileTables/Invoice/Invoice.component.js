/*
Core Libs
*/
import React, { Component } from 'react';
import axios from 'axios';
import { Modal, Alert } from 'react-bootstrap';
import { Divider } from 'material-ui';
/**
 * ActiveContract Component
 */
class Invoice extends Component {

    constructor(props) {
        super(props);
        this.state = {
            finished: false,
            err: null,
            invoices: [],
            show: false,
            modalInvoice: {}
        }
        this.loadData();
        this.loadData = this.loadData.bind(this);
    }

    componentWillReceiveProps() {
        this.loadData();
    }

    handleShowModal = (invoice) => {
        this.setState({
            ...this.state,
            modalInvoice: invoice,
            show: true
        })
    }

    handleHideModal = () => {
        this.setState({
            ...this.state,
            modalInvoice: {},
            show: false
        })
    }

    loadData() {
        const invoicesURL = "https://qchain-marketplace-postgrest.herokuapp.com/my_invoices";
        const config = {
            headers: { Authorization: "Bearer " + localStorage.getItem('id_token') }
        };
        axios.get(invoicesURL, config)
            .then((response) => {
                this.setState({
                    ...this.state,
                    finished: true,
                    invoices: response.data
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
            <div className='table-responsive' style={{ height: '320px', margin: '2%' }}>
                {
                    (this.state.finished && this.state.err === null && this.state.invoices.length === 0)
                        ? (<p style={{ textAlign: 'center' }}>There is currently no invoices...</p>)
                        : null
                }

                {
                    (this.state.finished && this.state.err === null && this.state.invoices.length > 0)
                        ? (<table className='table table-bordered mb-0'>
                            <thead className='thead-default'>
                                <tr>
                                    <th>Listing Title</th>
                                    <th>Publisher</th>
                                    <th>Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.invoices.map((invoice, i) => {
                                        return (<tr key={'invoices' + i}>
                                            <td 
                                            onClick={() => this.handleShowModal(invoice)}
                                            style={{color: '#3366BB', cursor: 'pointer'}}
                                            >
                                            {invoice.listing_title}
                                            </td>
                                            <td>{invoice.publisher_name}</td>
                                            <td>{invoice.amount} {invoice.currency}</td>
                                        </tr>)
                                    })
                                }
                            </tbody>

                        </table>
                        )
                        : null
                }

            </div>
            <Modal show={this.state.show} onHide={this.handleHideModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Invoice Detail - {this.state.modalInvoice.listing_title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4>Publisher</h4><h5>{this.state.modalInvoice.publisher_name}</h5>
                    <Divider />
                    <h4>Date Created</h4><h5>{this.state.modalInvoice.date}</h5>
                    <Divider />
                    <h4>Amount Due</h4><h5>{this.state.modalInvoice.amount} {this.state.modalInvoice.currency}</h5>
                    <Divider />
                    <h4>Invoice Due Date</h4><h5>{this.state.modalInvoice.due_date}</h5>
                </Modal.Body>
                <Alert bsStyle={(this.state.modalInvoice.paid ? 'success' : 'danger')}>
                    <p>
                        This invoice is {(this.state.modalInvoice.paid ? 'already paid!' : 'not paid yet!')}
                    </p>
                </Alert>
            </Modal>
        </div>
    }
}


export default Invoice;