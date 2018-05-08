import { connect } from 'react-redux';
import Slider from 'material-ui/Slider';

const mapStateToProps = (state) => {
    return {value: state.MarketplaceDrawerReducer.sliderValue}
}

const mapDispatchToProps = (dispatch) => {
    return {
        onChange: (event, sliderValue)=>{
            dispatch({
                type:"SET_SLIDER_VALUE",
                value: sliderValue
            })
        }
    }
}

const ConnectedSlider = connect(
    mapStateToProps,
    mapDispatchToProps
)(Slider)

export default ConnectedSlider;