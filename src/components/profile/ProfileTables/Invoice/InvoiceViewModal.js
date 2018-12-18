import React from "react";
import Divider from '@material-ui/core/Divider';
import {Alert, Modal} from "react-bootstrap";

export let invoiceModal = { openModal: null };

export class InvoiceViewModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            invoice: null
        };

        invoiceModal.openModal = this.openModal;
    }

    openModal = (invoice) => {
        this.setState({
            open: true,
            invoice
        })
    };

    render () {
        const {invoice, open} = this.state;

        if(invoice == null) return <div/>;

        return (
            <Modal show={open} onHide={() => this.setState({open: false, invoice: null})}>
                <Modal.Header closeButton>
                    <Modal.Title>Invoice Detail - {invoice.listing_title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4>Publisher</h4><h5>{invoice.publisher_name}</h5>
                    <Divider />
                    <h4>Date Created</h4><h5>{invoice.date}</h5>
                    <Divider />
                    <h4>Amount Due</h4><h5>{invoice.amount} {invoice.currency}</h5>
                    <Divider />
                    <h4>Invoice Due Date</h4><h5>{invoice.due_date}</h5>
                </Modal.Body>
                <Alert bsStyle={(invoice.paid ? 'success' : 'success')}>
                    <p>
                        This invoice is {(invoice.paid ? 'already paid!' : 'not paid yet!')}
                    </p>
                </Alert>
            </Modal>
        )
    }
}
