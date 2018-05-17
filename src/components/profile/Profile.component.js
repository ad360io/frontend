/*
Core Libs
*/
import React, { Component } from 'react';
import { connect }          from 'react-redux';

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


/**
 * Profile Component
 */
class Profile extends Component {

    render() {
        return <div className='profile-container'>
            <div className='profile-header'>

                <Media style={mediaStyle}>
                    <Media.Left align='middle'>
                    <img src={this.props.profile.avatar_url} style={{marginRight: '3vw'}} width='120' height='120' alt='user-avatar' />
                    </Media.Left>
                    <Media.Body>
                    <Media.Heading style={mediaHeadingStyle}>{this.props.profile.nickname}</Media.Heading>
                    Personal Contact:<br /> {this.props.profile.email}
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
    fontSize:'2em',
    marginTop: '25px',
}

const mapStateToProps = (state) => {
    return {
        profile: state.ProfileReducer.profile
    }
}

const mapDispatchToProps = (dispatch) => {
    return {}
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Profile) 
