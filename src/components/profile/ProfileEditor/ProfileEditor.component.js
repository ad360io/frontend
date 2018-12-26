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

//TODO: refactor
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
            nem_wlt_name: this.props.nem_wlt_name,
            nem_pk_enc: this.props.nem_pk_enc,

            NEM_password: '',

            eth_address: this.props.eth_address,

            updated_success: false
        }

        // this.handleHideModal = this.handleHideModal.bind(this);
        // this.handleShowModal = this.handleShowModal.bind(this);
        // // this.handleConfirmEdit = this.handleConfirmEdit.bind(this);
        // this.handleNicknameChange = this.handleNicknameChange.bind(this);
        // this.handleEmailChange = this.handleEmailChange.bind(this);
        // this.handleAvatarUrlChange = this.handleAvatarUrlChange.bind(this);
        // this.handleNemAddressChange = this.handleNemAddressChange.bind(this);
        // this.handleEthAddressChange = this.handleEthAddressChange.bind(this);
        //
        // // this.handleEthAddressChange = this.handleEthAddressChange.bind(this);
        //
        // this.read_NEM_wlt_file = this.read_NEM_wlt_file.bind(this);
        // this.NEM_wlt_base64_txt = null;
        // this.NEM_wlt_JSON = null;
        //
        // this.handleNemPasswordChange = this.handleNemPasswordChange.bind(this);
        // this.handleNemPasswordSubmit = this.handleNemPasswordSubmit.bind(this);

        this.NEM_priv_key = null;
        // this.handleNemPkEncChange = this.handleNemPkEncChange.bind(this);



        /* CONFIG */
        this.mainnet_NIS = 'http://san.nem.ninja';
        this.testnet_NIS = 'http://192.3.61.243';

        this.NEM_port = 7890;

        this.NEM_mainnet_networkId = 104;
        this.NEM_testnet_networkId = -104;

        this.NEM_node_URI = this.mainnet_NIS;
        // this.NEM_node_URI = this.testnet_NIS;

        this.NEM_networkId = nem.model.network.data.mainnet.id;
        // this.NEM_networkId = nem.model.network.data.testnet.id;


        /* Create connection to NIS supernode */
        this.endpoint = nem.model.objects.create('endpoint')(this.NEM_node_URI, this.NEM_port);

        console.log(this.endpoint);
    }

    componentWillMount() {
        this.setState({
            // profile: this.props.auth.userProfile.user_metadata,

            name: this.props.name,
            nickname: this.props.nickname,
            email: this.props.email,
            avatar_url: this.props.avatar_url,
            show: true,
            nem_address: this.props.nem_address,
            eth_address: this.props.eth_address,
        });
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
        });

        // console.log('123456');
        // console.log(this.state);
        // console.log(this.props);
    }

    handleHideModal = () => {
        this.setState({ ...this.state, show: false });
    }

    handleConfirmEdit = () => {
        const { updateUserMetadata } = this.props.auth;
        let newMetadata = {
            name: this.state.name,
            nickname: this.state.nickname,
            email: this.state.email,
            picture: this.state.avatar_url,

            nem_address: this.state.nem_address,
            nem_wlt_name: this.state.nem_wlt_name,
            nem_pk_enc: this.state.nem_pk_enc,

            eth_address: this.state.eth_address,
        };


        updateUserMetadata(newMetadata).then(() => {
            this.setState({updated_success: true}, () => {
                setTimeout(() => this.handleHideModal(), 2 * 1000)
            })
        });
        // this.handleHideModal();
    }

    handleNicknameChange = (e) => {
        this.setState({ ...this.state, nickname: e.target.value });
    }

    handleEmailChange = (e) => {
        this.setState({ ...this.state, email: e.target.value });
    }

    handleAvatarUrlChange = (e) => {
        this.setState({ ...this.state, avatar_url: e.target.value });
    }

    handleNemAddressChange = (e) => {
        this.setState({ ...this.state, nem_address: e.target.value });
    }

    handleEthAddressChange(e) {
        this.setState({ ...this.state, eth_address: e.target.value });
    }

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
        event.preventDefault();

        // console.log('asdf ' + this.state.NEM_password + ' 123');

        // create variable to store password/private key object
        var common = nem.model.objects.create('common')(this.state.NEM_password, '');

        // console.log(common);

        // select primary account of wallet
        var walletAccount = this.NEM_wlt_JSON.accounts[0];

        // decrypt wallet account to `common` variable
        nem.crypto.helpers.passwordToPrivatekey(common, walletAccount, walletAccount.algo);

        // get private key
        var privateKey = common.privateKey;

        // console.log(privateKey);

        // create key pair
        var keyPair = nem.crypto.keyPair.create(privateKey);

        // get public key
        var publicKey = keyPair.publicKey.toString();

        // convert public key to address, validate
        var address = nem.model.address.toAddress(publicKey, this.NEM_networkId);  // networkId = 104,-104,96 main,test,mijin
        var isValid = nem.model.address.isValid(address);
        var isFromNetwork = nem.model.address.isFromNetwork(address, this.NEM_networkId);

        var i;
        var len;
        var address_ = [];

        for (i = 0, len = address.length; i < len; i += 6) {
            address_.push(address.substr(i, 6));
        }

        address = address_.join('-');

        console.log(address);

        if (isValid && isFromNetwork) {
            this.setState({nem_address: address});

            // console.log('asdf');
            // console.log(this.state.nem_address);

            // AES encrypt private key with wallet password
            var nem_pk_enc = nem.crypto.js.AES.encrypt(common.privateKey, this.state.NEM_password).toString();
            this.setState({nem_pk_enc: nem_pk_enc});

            // console.log(this.state.nem_pk_enc);

            var NEM_wlt_input = document.getElementById('NEM_wlt_input');
            NEM_wlt_input.style.display = 'none';

            var NEM_password_input = document.getElementById('NEM_password_input');
            NEM_password_input.style.display = 'none';

            // var NEM_wlt_subtext = document.getElementById('NEM_wlt_subtext');
            // NEM_wlt_subtext.style.display = 'none';

            var NEM_wlt_name_address = document.getElementById('NEM_wlt_name_address');
            NEM_wlt_name_address.style.display = 'initial';

        } else {
            alert('This wallet file does not contain a valid NEM account. Please try another wallet file.');
        }
    }

    render() {
        // let NEM_wlt_formgroup;
        //
        // // if (this.state.nem_pk_enc === 'undefined' || this.state.nem_pk_enc === '') {
        // if (this.state.nem_address === 'undefined' || this.state.nem_address === '') {
        //     NEM_wlt_formgroup = <FormGroup controlId='control-form-title'>
        //         <h4>NEM Account</h4>
        //         {/* <p id="NEM_wlt_subtext" style={{ 'margin': '-6px 0 12px 0', 'fontSize': '13px', 'fontStyle': 'italic' }}>Only standard (i.e. password/brain) wallets are supported.</p> */}
        //
        //         <input id="NEM_wlt_input" style={{ 'fontSize': '12px' }} type="file" accept=".wlt" onChange={this.read_NEM_wlt_file} />
        //
        //         <form id="NEM_password_input" style={{ 'display': 'none', 'fontSize': '14px', 'marginTop': '24px' }} onSubmit={this.handleNemPasswordSubmit}>
        //             <label>
        //                 Password:&nbsp;&nbsp;
        //                 <input type="text" style={{ 'fontWeight': 'normal', 'borderRadius': '3px' }} value={this.state.NEM_password} onChange={this.handleNemPasswordChange} />
        //             </label>
        //
        //             <input type="submit" value="Submit" />
        //         </form>
        //
        //         <p id="NEM_wlt_name_address" style={{ 'display': 'none', 'fontSize': '13px' }}>
        //             NEM wallet name: {this.state.nem_wlt_name}
        //             <br />
        //             NEM address: {this.state.nem_address}
        //         </p>
        //     </FormGroup>
        // } else {
        //     NEM_wlt_formgroup = <FormGroup controlId='control-form-title'>
        //         <h4>NEM Account</h4>
        //         {/* <p id="NEM_wlt_subtext" style={{ 'margin': '-6px 0 12px 0', 'fontSize': '13px', 'fontStyle': 'italic' }}>Only standard (i.e. password/brain) wallets are supported.</p> */}
        //
        //         <p id="NEM_wlt_name_address" style={{ 'fontSize': '13px' }}>
        //             NEM wallet name: {this.state.profile.nem_wlt_name}
        //             <br />
        //             NEM address: {this.state.nem_address}
        //
        //             <br />
        //             <br />
        //             To change your NEM account:
        //         </p>
        //
        //         <input id="NEM_wlt_input" style={{ 'fontSize': '12px' }} type="file" accept=".wlt" onChange={this.read_NEM_wlt_file} />
        //
        //         <form id="NEM_password_input" style={{ 'display': 'none', 'fontSize': '14px', 'marginTop': '24px' }} onSubmit={this.handleNemPasswordSubmit}>
        //             <label>
        //                 Password:&nbsp;&nbsp;
        //                 <input type="text" style={{ 'fontWeight': 'normal', 'borderRadius': '3px' }} value={this.state.NEM_password} onChange={this.handleNemPasswordChange} />
        //             </label>
        //
        //             <input type="submit" value="Submit" />
        //         </form>
        //     </FormGroup>
        // }

        return (
            <div style={{ maxWidth: '600px', margin: '40px 0 110px 145px' }}>
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
                    <h4>Profile Picture URL</h4>
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

                {/*{NEM_wlt_formgroup}*/}

                {/*<div style={{ height: '25px' }}></div>*/}

                {this.state.updated_success && (
                    <Alert bsStyle="success">
                        <p style={{'fontSize': '13px'}}>
                            Profile updated successfully. Redirecting to the login page...
                        </p>
                    </Alert>
                )}

                {!this.state.updated_success && (
                    <Alert bsStyle="danger">
                        <p style={{marginBottom: '10px', 'fontSize': '13px'}}>
                            Any changes to the profile require you to log in again to take effect.
                        </p>

                        <Button bsStyle="danger" onClick={this.handleConfirmEdit}>Save</Button>
                    </Alert>
                )}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        name: state.ProfileReducer.profile.name,
        nickname: state.ProfileReducer.profile.nickname,
        email: state.ProfileReducer.profile.email,
        avatar_url: state.ProfileReducer.profile.avatar_url,
        nem_address: state.ProfileReducer.profile.nem_address,
        nem_wlt_name: state.ProfileReducer.profile.nem_wlt_name,
        nem_pk_enc: state.ProfileReducer.profile.nem_pk_enc,

        eth_address: state.ProfileReducer.profile.eth_address,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {}
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProfileEditor);
