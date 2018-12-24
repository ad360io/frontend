import React from "react";
import {css} from 'emotion';
import {Button, ControlLabel, Modal} from "react-bootstrap";
import { FormGroup, FormControl } from 'react-bootstrap';

export class PendingContractModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        }
    }

    toggle = () => {
        this.setState({open: !this.state.open})
    };

    submit = async () => {
        const { allApis: { postJson }} = this.props;

        this.toggle();
        return await true;
        //TODO: apply API
        // let resp = await postJson( $URL, { queryParams: {}, payload: {}})
        // if(resp) {
        //     // success
        // } else {
        //     // error
        // }
    };

    render () {
        const { open } = this.state;
        const { selectedItem, afterClose } = this.props;

        return (
            <Modal
                show={open}
                onHide={() => {afterClose()}}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Pending Contract Confirmation</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>
                        You’re about to send {selectedItem.payout_cap} {selectedItem.currency} to ‘$PUBLISHER_NEM/ETH_ADDRESS’ for {selectedItem.name}.
                    </p>
                    <FormGroup>
                        <div>Password</div>
                        <FormControl type="password"/>
                    </FormGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => this.toggle()}>Close</Button>
                    <Button onClick={() => this.submit()}>Submit</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}
