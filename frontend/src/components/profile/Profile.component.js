/*
Core Libs
*/
import React, { Component } from 'react';

/*
Local CSS
*/
import './Profile.component.css';

/*
React Bootstrap
*/
import { Media } from 'react-bootstrap';

/*
Children Component
*/
import ProfileTables   from './ProfileTables/ProfileTables.component'
import Footer          from '../footer/Footer.component';

/*
Avatar Placeholder
*/
import avatar_placeholder from '../../assets/images/profile_avatar_placeholder.png'


/**
 * Profile Component
 */
class Profile extends Component {
    constructor(props){
        super(props);
        this.getProfileCallback = this.getProfileCallback.bind(this);
        this.user_metadata_path = 'https://auth.qchain.co/user_metadata';
        this.state = {
            avatar_url: avatar_placeholder
        }
        const { getProfile } = this.props.auth;
        getProfile(this.getProfileCallback);
    }

    getProfileCallback(err, profile){
        if(!err){
            const name       = profile[this.user_metadata_path].name;
            const email      = profile.email;
            const nickname   = profile.nickname;
            const avatar_url = profile.picture;

            this.setState({
                name,
                email,
                nickname,
                avatar_url
            })
        }else {
            console.log(err);
        }
    }

    render() {
        
        return <div className="profile-container">
            <div className="profile-header">

                <Media style={mediaStyle}>
                    <Media.Left align="middle">
                    <img src={this.state.avatar_url} style={{marginRight: '3vw'}} alt="user-avatar" />
                    </Media.Left>
                    <Media.Body>
                    <Media.Heading style={mediaHeadingStyle}>{this.state.name} (@{this.state.nickname})</Media.Heading>
                    Personal Contact:<br /> {this.state.email}
                    </Media.Body>
                </Media>
            </div>
            <ProfileTables/>
            <Footer />
        </div>
    }
} 

const mediaStyle = {
    marginTop: '235px',
    marginLeft: '8vw',
}

const mediaHeadingStyle = {
    marginBottom: '15px',
    fontSize:"2em",
    marginTop: '25px',
}


export default Profile;
