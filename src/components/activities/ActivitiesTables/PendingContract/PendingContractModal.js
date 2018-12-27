import React from "react";
import { connect } from 'react-redux';
import {css} from 'emotion';
import {Button, ControlLabel, Modal} from "react-bootstrap";
import { FormGroup, FormControl } from 'react-bootstrap';
import {getJson} from "../../../../common/api/method/get-json";
import moment from "moment";

import nem from 'nem-sdk';


export class PendingContractModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nem_password: '',
            // divisibility: '',
            // mosaicDefinitionMetaDataPair: {},
            // txn_amount: 0,
            txn_fee: 'Calculating...',

            txn_status: '',
            txn_error: false,
            publisherInfo: null,

            open: false
        }

        this.endpoint = nem.model.objects.create('endpoint')(nem.model.nodes.defaultMainnet, nem.model.nodes.defaultPort);


    }

    componentDidMount() {
        this.getPublisher();
    }

    getPublisher = async () => {
        const { allApis: {getJson}, selectedItem } = this.props;
        let resp = await getJson(`/publisher?role=eq.${selectedItem.publisher}`);
        this.setState({publisherInfo: resp.data[0]})
    };

    handleNemPasswordChange = (event) => {
        this.setState({nem_password: event.target.value});
    };

    toggle = () => {
        this.setState({open: !this.state.open});
    };

    getNemMosaicMetadata = () => {
        let mosaicDefinitionMetaDataPair = nem.model.objects.get('mosaicDefinitionMetaDataPair');

        let divisibility = [6];

        nem.com.requests.namespace.mosaicDefinitions(this.endpoint, 'qchain').then(
            function(res) {
                let xqcDefinition = nem.utils.helpers.searchMosaicDefinitionArray(res.data, ['xqc']);

                if (xqcDefinition === undefined) {
                    return false;
                }

                xqcDefinition = xqcDefinition['qchain:xqc'];

                divisibility[0] = xqcDefinition.properties[0].value;

                mosaicDefinitionMetaDataPair['qchain:xqc'] = {};
                mosaicDefinitionMetaDataPair['qchain:xqc'].mosaicDefinition = xqcDefinition;
                mosaicDefinitionMetaDataPair['qchain:xqc'].supply = xqcDefinition.properties[1].value;
            },
            function(error) {
                console.log(error);
                return false;
            }
        );

        // this.setState({mosaicDefinitionMetaDataPair: mosaicDefinitionMetaDataPair});
        // this.setState({divisibility: divisibility[0]});
        // return true;

        // console.log(mosaicDefinitionMetaDataPair);
        // console.log(divisibility[0]);
        return [mosaicDefinitionMetaDataPair, divisibility[0]];
    };

    submit = async () => {
        const { allApis: { postJson }} = this.props;

        getJson(`https://nis.qchain.co/heartbeat`).then((resp) => {
            console.log(resp);
        });

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

    showFee = () => {
        const selectedItem = this.props.selectedItem;

        let message_length = 76 + selectedItem.name.length + selectedItem.number.toString().length;
        let messageMultiplier = Math.floor(message_length / 32) + 1;
        let totalMosaicQuantity = 375000000 * 10 ** 6;
        // let totalMosaicQuantity = mosaicDefinitionMetaDataPair['qchain:xqc'].supply * 10 ** 6;
        let supplyRelatedAdjustment = Math.floor(0.8 * Math.log(9e15 / totalMosaicQuantity));
        // let supplyRelatedAdjustment = Math.floor(0.8 * Math.log(Math.floor(9e15 / totalMosaicQuantity)));
        let xemEquivalentMultiplier = Math.max(Math.floor(((8999999999 * nem.utils.helpers.cleanTextAmount(selectedItem.payout_cap) * 1e6) / (totalMosaicQuantity)) / 10000), 1);
        let mosaicMultiplier = Math.max(1, xemEquivalentMultiplier - supplyRelatedAdjustment);

        let totalFee = (0 + messageMultiplier + mosaicMultiplier) * 0.05;

        // this.setState({txn_fee: parseFloat(totalFee.toString().slice(0,8))});

        // let txnFeeElement = document.getElementById('txn_fee_text');
        // txnFeeElement.style.display = 'initial';

        return parseFloat(totalFee.toString().slice(0,8));
    };

    afterSendTransaction = async (tx_hash) => {
        // TODO: set Contract status to Active
        // TODO: set Invoice as paid
        // TODO: save Transaction Hash to Invoice
        // TODO: set Date Paid on Invoice

        const { allApis: { patchJson }, selectedItem} = this.props;

        await patchJson(`/contract`, { queryParams: { number: `eq.${selectedItem.number}`}, payload: { status: "Active"}});

        const payload = {
            tx_hash: tx_hash,
            paid: true,
            date_paid: moment().format("YYYY-MM-DDThh:mm:00")
        };

        await patchJson(`/invoice`, { queryParams: { contract: `eq.${selectedItem.number}`}, payload });

        console.log('update invoice');
    };

    sendTxn = () => {
        this.setState({txn_error: false});
        this.setState({txn_status: ''});

        var self = this;
        const selectedItem = this.props.selectedItem;

        let nem_pk;
        let mosaicDefinitionMetaDataPair, divisibility;
        let txn_amount;

        // TODO: replace the hardcoded key 'U2FsdGVkX1853sPFsyqB+B/EaXVllaaZcRqJ02KkoUXPbd3lutbpNZSDqMdRD+KRk1plLW4Y7xnMK5lCK4ctmxVyGHc948rVZJ8p8K1mEwMRNXXFL/THEHq+4SIOOPVq' with nem_pk_enc from Auth0 metadata
        try {
            nem_pk = nem.crypto.js.AES.decrypt(this.props.profile.nem_pk_enc, this.state.nem_password).toString(nem.crypto.js.enc.Utf8);
        } catch(err) {
            console.log(err);
            nem_pk = '';
        }

        if (! nem.utils.helpers.isHexadecimal(nem_pk) || (nem_pk.length !== 64 && nem_pk.length !== 66)) {
            this.setState({txn_error: true});
            this.setState({txn_status: 'Incorrect password'});

            return;
        } else {
            let submitButtonElement = document.getElementById('submit_button');
            submitButtonElement.style.display = 'none';

            this.setState({txn_status: 'Processing...'});
        }

        // TODO: replace hardcoded 'NDH77F-N3SWBC-7TJJ7T-3BNM2Z-KH2MJ7-RXIGUP-VDK4' with the Publisher's NEM address from Postgres
        let txnRecipient;

        try {
            txnRecipient = nem.model.address.clean(this.state.publisherInfo.nem_address);
        } catch(err) {
            console.log(err);
            this.setState({txn_error: true});
            this.setState({txn_status: 'Cannot complete the transaction because the recipient does not have a valid NEM account set up.'});

            return;
        }

        let isValid = nem.model.address.isValid(txnRecipient);
        let isFromNetwork = nem.model.address.isFromNetwork(txnRecipient, nem.model.network.data.mainnet.id);

        if (! (isValid && isFromNetwork)) {
            this.setState({txn_error: true});
            this.setState({txn_status: 'Cannot complete the transaction because the recipient does not have a valid NEM account set up.'});

            return;
        }

        if (nem.utils.helpers.isTextAmountValid(selectedItem.payout_cap)) {
            // this.setState({txn_amount: nem.utils.helpers.cleanTextAmount(selectedItem.payout_cap)});
            txn_amount = nem.utils.helpers.cleanTextAmount(selectedItem.payout_cap);
        } else {
            this.setState({txn_error: true});
            this.setState({txn_status: 'Error: The transaction amount is invalid.'});

            return;
        }

        let mosaicMetadata_divisibility_tuple = this.getNemMosaicMetadata();

        if (mosaicMetadata_divisibility_tuple) {
            mosaicDefinitionMetaDataPair = mosaicMetadata_divisibility_tuple[0];
            divisibility = mosaicMetadata_divisibility_tuple[1];
            // this.setState({divisibility: mosaicMetadata_divisibility_tuple[1]});
        } else {
            this.setState({txn_error: true});
            this.setState({txn_status: 'Error: Failed to retrieve NEM mosaic definition from the network.'})

            return;
        }


        let common = nem.model.objects.create('common')(this.state.nem_password, nem_pk);

        let txnMessage = 'Qchain Marketplace payment for contract "' + selectedItem.name + '" (#' + selectedItem.number +') from ' + selectedItem.start_date.slice(0, 10) + ' to ' + selectedItem.end_date.slice(0, 10) + '.';

        let transferTransaction = nem.model.objects.create('transferTransaction')(txnRecipient, 1, txnMessage);

        let xqcAmount = txn_amount * 10 ** divisibility;

        let mosaicAttachment = nem.model.objects.create('mosaicAttachment')('qchain', 'xqc', xqcAmount);

        transferTransaction.mosaics.push(mosaicAttachment);

        // console.log(transferTransaction);
        // console.log(mosaicDefinitionMetaDataPair);

        var transactionEntity = nem.model.transactions.prepare('mosaicTransferTransaction')(common, transferTransaction, mosaicDefinitionMetaDataPair, nem.model.network.data.mainnet.id);


        // calculate fee in case SDK has issues
        const feeFactor = 0.05;
        let messageMultiplier = Math.floor((transactionEntity.message.payload.length / 2) / 32) + 1;
        let totalMosaicQuantity = 375000000 * 10 ** divisibility;
        // let totalMosaicQuantity = mosaicDefinitionMetaDataPair['qchain:xqc'].supply * 10 ** divisibility;
        let supplyRelatedAdjustment = Math.floor(0.8 * Math.log(9e15 / totalMosaicQuantity));
        // let supplyRelatedAdjustment = Math.floor(0.8 * Math.log(Math.floor(9e15 / totalMosaicQuantity)));
        let xemEquivalentMultiplier = Math.max(Math.floor(((8999999999 * xqcAmount) / (totalMosaicQuantity)) / 10000), 1);
        let mosaicMultiplier = Math.max(1, xemEquivalentMultiplier - supplyRelatedAdjustment);

        transactionEntity.fee = (0 + messageMultiplier + mosaicMultiplier) * feeFactor * 1e6;

        // console.log(transactionEntity);


        nem.model.transactions.send(common, transactionEntity, this.endpoint).then(
            (res) => {
                console.log(res);

                if (res.code === 1) {
                    this.setState({txn_error: 'testing'});
                                                                // this is not adding a line break
                    this.setState({txn_status: 'Payment sent successfully!\nTxn Hash: ' + res.transactionHash.data});
                    this.afterSendTransaction(res.transactionHash.data);

                } else if (res.code >= 2) {
                    this.setState({txn_error: true});
                    this.setState({txn_status: 'Error: ' + res.message});
                } else if (res.code === 0) {
                    this.setState({txn_error: true});
                    this.setState({txn_status: 'Cannot send payment. Please refresh and try again.'});
                }
            }
        );

        if (! this.state.txn_error) {
            // console.log('SUCCESSFUL XQC TXN');
        }
    };

    render () {
        const { open, publisherInfo } = this.state;
        const { selectedItem, afterClose, profile } = this.props;

        return (
            <Modal
                show={open}
                onHide={() => {afterClose()}}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Pending Contract Payment Confirmation</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p style={{ 'fontSize': '15px' }}>
                        {/* TODO: replace $RECIPIENT_ACCOUNT.nem_address with Publisher's NEM address from Postgres */}
                        You’re about to send {selectedItem.payout_cap} {selectedItem.currency} to {selectedItem.publisher_name}
                        ({!publisherInfo ? `Loading...` : publisherInfo.nem_address}) for {selectedItem.name}.
                    </p>

                    <p id="txn_fee_text" style={{ 'fontSize': '13px' }}>
                        {/* Network Fee: {this.state.txn_fee} */}
                        Network Fee: {this.showFee()}
                    </p>

                    <FormGroup>
                        <div style={{ 'fontSize': '15px', 'margin': '24px 0 6px 0' }}>Wallet Password</div>
                        <FormControl type="password" value={this.state.nem_password} onChange={this.handleNemPasswordChange} />
                    </FormGroup>
                </Modal.Body>
                <Modal.Footer>
                    {/* <Button onClick={() => this.toggle()}>Close</Button> */}
                    {/* <Button onClick={() => this.submit()}>Submit</Button> */}
                    <span style={{ 'fontSize': '14px', 'marginRight': '24px' }}>{this.state.txn_status}</span>
                    <Button id="submit_button" onClick={() => this.sendTxn()}>Submit</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}
