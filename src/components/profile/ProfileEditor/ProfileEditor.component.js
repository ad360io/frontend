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
import NemEndpoint from '../../nem-endpoint/NemEndpoint.component';

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

            // eth_addressa: this.props.eth_addressa

            NEM_password: ''
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

        this.NEM_wlt_base64_txt = [];
        this.handleNemPasswordChange = this.handleNemPasswordChange.bind(this);
        this.handleNemPasswordSubmit = this.handleNemPasswordSubmit.bind(this);
    }

    handleShowModal() {
        this.setState({
            name: this.props.name,
            nickname: this.props.nickname,
            email: this.props.email,
            avatar_url: this.props.avatar_url,
            show: true,
            nem_address: this.props.nem_address,
            eth_address: this.props.eth_address

            // eth_addressa: this.props.eth_addressa

        });
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
            eth_address: this.state.eth_address

            // eth_addressa: this.state.eth_addressa

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

        reader.onload = function(){
            this.NEM_wlt_base64_txt = [];
            this.NEM_wlt_base64_txt.push(reader.result);

            console.log(reader.result.substring(0, 1000));
        };

        reader.readAsText(input);

        // var NEM_wlt_input = document.getElementById('NEM_wlt_input');
        // NEM_wlt_input.style.display = 'none';

        var NEM_password_input = document.getElementById('NEM_password_input');
        NEM_password_input.style.display = 'initial';
    }

    handleNemPasswordChange(event) {
        this.setState({NEM_password: event.target.value});
    }

    handleNemPasswordSubmit(event) {
        console.log('asdf ' + this.state.NEM_password + ' 123');
        // alert('asdf ' + this.state.NEM_password + ' 123');
        event.preventDefault();
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
                        <p style={{ 'margin': '-6px 0 12px 0', 'font-size': '13px' }}>Only standard (i.e. password/brain) wallets are supported.</p>

                        <input id="NEM_wlt_input" style={{ 'font-size': '12px' }} type="file" accept=".wlt" onChange={this.read_NEM_wlt_file} />

                        <form id="NEM_password_input" style={{ 'display': 'none', 'font-size': '14px', 'margin-top': '12px' }} onSubmit={this.handleNemPasswordSubmit}>
                            <label>
                                Password:&nbsp;&nbsp;
                                <input type="text" style={{ 'font-weight': 'normal' }} value={this.state.NEM_password} onChange={this.handleNemPasswordChange} />
                            </label>

                            <input type="submit" value="Submit" />
                        </form>
                    </FormGroup>

                </Modal.Body>

                <Alert bsStyle="danger">
                    <p style={{ marginBottom: '10px', 'font-size': '13px' }}>
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
        eth_address: state.ProfileReducer.profile.eth_address

        // eth_addressa: state.ProfileReducer.profile.eth_addressa

    }
}

const mapDispatchToProps = (dispatch) => {
    return {}
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProfileEditor);

