import { DropdownButton, MenuItem } from 'react-bootstrap';
import { connect } from 'react-redux';

const mapStateTo_ModeDropdownButton_Props = (state) => {
    return {
        title: state.FilterReducer.modeFilter
    }
}
const mapDispatchTo_ModeDropdownButton_Props = (dispatch) => {
    return null;
}
const ModeDropdownButton = connect(
    mapStateTo_ModeDropdownButton_Props,
    mapDispatchTo_ModeDropdownButton_Props
)(DropdownButton)


const mapStateTo_ModeMenuItem_Props = (state) => {
    return null;
}
const mapDispatchTo_ModeMenuItem_Props = (dispatch, ownProps) => {
    return {
        onClick: ()=>{
            dispatch({
                type: 'SET_MODE_FILTER',
                modeFilter: ownProps.mode
            })
        } 
    }
}
const ModeMenuItem = connect(
    mapStateTo_ModeMenuItem_Props,
    mapDispatchTo_ModeMenuItem_Props
)(MenuItem)


export { ModeDropdownButton, ModeMenuItem };