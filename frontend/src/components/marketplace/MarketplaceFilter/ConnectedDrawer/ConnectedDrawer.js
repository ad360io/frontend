import { connect } from 'react-redux';
import Drawer from 'material-ui/Drawer';

const mapStateToProps = (state) => {
    return {
        open: state.MarketplaceDrawerReducer.open

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onRequestChange: (open)=>{
            dispatch({type: 'SET_DRAWER', value: open})
        }
    }
}

const ConnectedDrawer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Drawer)

export default ConnectedDrawer;