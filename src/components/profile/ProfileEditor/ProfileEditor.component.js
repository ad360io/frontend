/*
Core Libs
*/
import React, { Component } from 'react';
import { connect } from 'react-redux';

/*
React Bootstrap
*/
import { Modal, Button } from 'react-bootstrap';
import { FormGroup, FormControl } from 'react-bootstrap';
import { Alert } from 'react-bootstrap';

/*
Local CSS
*/
import './ProfileEditor.component.css';

/*
Children Component
*/
// import NemEndpoint from '../../nem-endpoint/NemEndpoint.component';

/*
NEM SDK
*/
import nem from 'nem-sdk';


/**
 * Profile Editor Component
 */
class ProfileEditor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: this.props.name,
            nickname: this.props.nickname,
            email: this.props.email,
            avatar_url: this.props.avatar_url,
            show: false,
            nem_address: this.props.nem_address,
            eth_address: this.props.eth_address,

            // eth_addressa: this.props.eth_addressa,

            nem_wlt_name: this.props.nem_wlt_name,
            nem_pk_enc: this.props.nem_pk_enc,
        }

        this.handleHideModal = this.handleHideModal.bind(this);
        this.handleShowModal = this.handleShowModal.bind(this);
        this.handleConfirmEdit = this.handleConfirmEdit.bind(this);
        this.handleNicknameChange = this.handleNicknameChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleAvatarUrlChange = this.handleAvatarUrlChange.bind(this);
        this.handleNemAddressChange = this.handleNemAddressChange.bind(this);
        this.handleEthAddressChange = this.handleEthAddressChange.bind(this);

        // this.handleEthAddressChange = this.handleEthAddressChange.bind(this);

        this.read_NEM_wlt_file = this.read_NEM_wlt_file.bind(this);
        this.NEM_wlt_base64_txt = null;
        this.NEM_wlt_JSON = null;

        this.NEM_password = null;
        this.handleNemPasswordChange = this.handleNemPasswordChange.bind(this);
        this.handleNemPasswordSubmit = this.handleNemPasswordSubmit.bind(this);

        this.NEM_priv_key = null;
        // this.handleNemPkEncChange = this.handleNemPkEncChange.bind(this);



        /* CONFIG */
        this.mainnet_NIS = 'http://san.nem.ninja';
        this.testnet_NIS = 'http://192.3.61.243';

        this.NEM_port = 7890;

        this.NEM_mainnet_networkId = 104;
        this.NEM_testnet_networkId = -104;

        // this.NEM_node_URI = mainnet_NIS;
        this.NEM_node_URI = this.testnet_NIS;

        // this.NEM_networkId = nem.model.network.data.mainnet.id;
        this.NEM_networkId = nem.model.network.data.testnet.id;


        /* Create connection to NIS supernode */
        this.endpoint = nem.model.objects.create('endpoint')(this.NEM_node_URI, this.NEM_port);

    }

    handleShowModal() {
        this.setState({
            name: this.props.name,
            nickname: this.props.nickname,
            email: this.props.email,
            avatar_url: this.props.avatar_url,
            show: true,
            nem_address: this.props.nem_address,
            eth_address: this.props.eth_address,

            // eth_addressa: this.props.eth_addressa,
        });

        // console.log('123456');
        // console.log(this.state);
        // console.log(this.props);
    }

    handleHideModal() {
        this.setState({ ...this.state, show: false });
    }

    handleConfirmEdit() {
        const { updateUserMetadata } = this.props.auth;
        let newMetadata = {
            name: this.state.name,
            nickname: this.state.nickname,
            email: this.state.email,
            picture: this.state.avatar_url,
            nem_address: this.state.nem_address,
            eth_address: this.state.eth_address,

            // eth_addressa: this.state.eth_addressa,

            nem_wlt_name: this.state.nem_wlt_name,
            nem_pk_enc: this.state.nem_pk_enc,
        }
        updateUserMetadata(newMetadata);
        this.handleHideModal();
    }

    handleNicknameChange(e) {
        this.setState({ ...this.state, nickname: e.target.value });
    }

    handleEmailChange(e) {
        this.setState({ ...this.state, email: e.target.value });
    }

    handleAvatarUrlChange(e) {
        this.setState({ ...this.state, avatar_url: e.target.value });
    }

    handleNemAddressChange(e) {
        this.setState({ ...this.state, nem_address: e.target.value });
    }

    handleEthAddressChange(e) {
        this.setState({ ...this.state, eth_address: e.target.value });
    }


    // handleEthAddressChange(e) {
    //     this.setState({ ...this.state, eth_addressa: e.target.value });
    // }



    read_NEM_wlt_file(e) {
        var input = e.target.files[0];

        var reader = new FileReader();

        const self = this;

        reader.onload = function() {
            self.NEM_wlt_base64_txt = [];
            self.NEM_wlt_base64_txt.push(reader.result);
            self.NEM_wlt_base64_txt = self.NEM_wlt_base64_txt.join('');

            // console.log(self.NEM_wlt_base64_txt);


            // // decode Base64 .wlt text to word array
            var word_array = nem.crypto.js.enc.Base64.parse(self.NEM_wlt_base64_txt);

            // // convert word array to UTF8 string, i.e. stringified JSON, then parse to JSON array
            self.NEM_wlt_JSON = JSON.parse(nem.crypto.js.enc.Utf8.stringify(word_array));


            // check wallet format
            // base64 basic checks
            // plain text only
            // certain character types only
            // equal sign at end

            // check multisig -- single sig only


            // show error if address is invalid
            // show error if network is wrong


            // if (self.NEM_wlt_JSON.accounts[0].brain !== true) {
            //     alert('Only standard (i.e. password/brain) wallets are supported. Please select another wallet file.');
            // }

            self.setState({nem_wlt_name: self.NEM_wlt_JSON.name});

            console.log(JSON.stringify(self.NEM_wlt_JSON));


            var NEM_password_input = document.getElementById('NEM_password_input');
            NEM_password_input.style.display = 'initial';

        };

        reader.readAsText(input);
    }


    handleNemPasswordChange(event) {
        this.setState({NEM_password: event.target.value});
    }

    handleNemPasswordSubmit(event) {
        console.log('asdf ' + this.NEM_password + ' 123');
        event.preventDefault();

        // create variable to store password/private key object
        var common = nem.model.objects.create('common')(this.NEM_password, '');

        // select primary account of wallet
        var walletAccount = this.NEM_wlt_JSON.accounts[0];

        // decrypt wallet account to `common` variable
        nem.crypto.helpers.passwordToPrivatekey(common, walletAccount, walletAccount.algo);

        // get private key
        var privateKey = common.privateKey;

        // create key pair
        var keyPair = nem.crypto.keyPair.create(privateKey);

        // get public key
        var publicKey = keyPair.publicKey.toString();

        // convert public key to address, validate
        var address = nem.model.address.toAddress(publicKey, this.NEM_networkId);  // networkId = 104,-104,96 main,test,mijin
        var isValid = nem.model.address.isValid(address);
        var isFromNetwork = nem.model.address.isFromNetwork(address, this.NEM_networkId);

        if (isValid && isFromNetwork) {
            // AES encrypt private key with wallet password
            nem.crypto.js.AES.encrypt(common.privateKey, this.NEM_password).toString();


            var NEM_wlt_input = document.getElementById('NEM_wlt_input');
            NEM_wlt_input.style.display = 'none';

            var NEM_password_input = document.getElementById('NEM_password_input');
            NEM_password_input.style.display = 'none';

        } else {
            alert('This wallet file does not contain a valid NEM mainnet account. Please try another wallet file.');
        }
    }

    render() {
        return <div>
            <i className="fas fa-pen-square profile-editor-icon" onClick={this.handleShowModal}></i>
            <Modal show={this.state.show} onHide={this.handleHideModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Profile</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <FormGroup controlId='control-form-title'>
                        <h4>Preferred Nickname</h4>
                        <FormControl type='text'
                            defaultValue={this.state.nickname}
                            onChange={this.handleNicknameChange}
                        />
                    </FormGroup>

                    <FormGroup controlId='control-form-title'>
                        <h4>Email</h4>
                        <FormControl type='text'
                            defaultValue={this.state.email}
                            onChange={this.handleEmailChange}
                        />
                    </FormGroup>

                    <FormGroup controlId='control-form-title'>
                        <h4>Avatar URL</h4>
                        <FormControl type='text'
                            defaultValue={this.state.avatar_url}
                            onChange={this.handleAvatarUrlChange}
                        />
                    </FormGroup>

                    <FormGroup controlId='control-form-title'>
                        <h4>NEM Address</h4>
                        <FormControl type='text'
                            defaultValue={this.state.nem_address}
                            onChange={this.handleNemAddressChange}
                        />
                    </FormGroup>

                    {/* <FormGroup controlId='control-form-title'>
                        <h4>ETH Address</h4>
                        <FormControl type='text'
                            defaultValue={this.state.eth_addressa}
                            onChange={this.handleEthAddressChange}
                        />
                    </FormGroup> */}

                    <FormGroup controlId='control-form-title'>
                        <h4>NEM Account</h4>
                        <p style={{ 'margin': '-6px 0 12px 0', 'fontSize': '13px' }}>Only standard (i.e. password/brain) wallets are supported.</p>

                        <input id="NEM_wlt_input" style={{ 'fontSize': '12px' }} type="file" accept=".wlt" onChange={this.read_NEM_wlt_file} />

                        <form id="NEM_password_input" style={{ 'display': 'none', 'fontSize': '14px', 'marginTop': '24px' }} onSubmit={this.handleNemPasswordSubmit}>
                            <label>
                                Password:&nbsp;&nbsp;
                                <input type="text" style={{ 'fontWeight': 'normal', 'borderRadius': '3px' }} value={this.state.NEM_password} onChange={this.handleNemPasswordChange} />
                            </label>

                            <input type="submit" value="Submit" />
                        </form>

                        <p>NEM wallet name: {this.state.nem_wlt_name}</p>
                        <p>NEM address: {this.state.nem_address}</p>
                    </FormGroup>

                </Modal.Body>

                <Alert bsStyle="danger">
                    <p style={{ marginBottom: '10px', 'fontSize': '13px' }}>
                        Any changes to the profile require you to login again to take effect.
                    </p>

                    <Button bsStyle="danger" onClick={this.handleConfirmEdit}>Save</Button>
                    <Button style={{ marginLeft: '10px' }} onClick={this.handleHideModal}>Cancel</Button>
                </Alert>


            </Modal>
        </div>
    }
}

const mapStateToProps = (state) => {
    return {
        name: state.ProfileReducer.profile.name,
        nickname: state.ProfileReducer.profile.nickname,
        email: state.ProfileReducer.profile.email,
        avatar_url: state.ProfileReducer.profile.avatar_url,
        nem_address: state.ProfileReducer.profile.nem_address,
        eth_address: state.ProfileReducer.profile.eth_address,

        // eth_addressa: state.ProfileReducer.profile.eth_addressa,

        nem_wlt_name: state.ProfileReducer.profile.nem_wlt_name,
        nem_pk_enc: state.ProfileReducer.profile.nem_pk_enc,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {}
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProfileEditor);
