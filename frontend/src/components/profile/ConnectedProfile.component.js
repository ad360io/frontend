import Profile from './Profile.component'
import { connect } from 'react-redux';


const mapStateToProps = (state) => {
    return {
        profile: state.ProfileReducer.profile
    }
}

const mapDispatchToProps = (dispatch) => {
    return {}
}

const ConnectedProfile = connect(
    mapStateToProps,
    mapDispatchToProps
)(Profile)


export default ConnectedProfile;