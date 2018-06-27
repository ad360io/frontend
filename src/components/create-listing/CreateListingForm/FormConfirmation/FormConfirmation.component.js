/*
Core Libs
*/
import React from 'react';
import { connect } from 'react-redux'

/*
Material UI
*/
import Button from '@material-ui/core/Button';


const FormConfirmation = ({ modeFilter, advertiserForm, publisherForm }) => (
    <div>
    {
        (
            modeFilter === 'Advertiser' 
                ? <AdvertiserFormConfirmation fields={advertiserForm} />
                : <PublisherFormConfirmation  fields={publisherForm } />
        )
    }
    </div>
)

const AdvertiserFormConfirmation = ({fields}) => (
    <div>
        <table className='table table-bordered mb-0'>
                <tbody className='tbody-default'>
                <tr>
                    <td>Marketing Type </td>
                    <td>{fields.marketingType}</td>
                </tr>
                <tr>
                    <td>Marketing Medium </td>
                    <td>{fields.marketingMedium}</td>
                </tr>
                <tr>
                    <td>Description </td>
                    <td>{fields.description}</td>
                </tr>
                <tr>
                    <td>Content Topic </td>
                    <td>{fields.topic}</td>
                </tr>
                <tr>
                    <td>Image URL </td>
                    <td>{fields.imgFile}</td>
                </tr>
                </tbody>
        </table>
    </div>
)

const PublisherFormConfirmation = ({fields}) => (
    <div>

    </div>
)

const mapStateToProps = (state) => {
    return {
        modeFilter      : state.MenuBarFilterReducer.modeFilter,
        advertiserForm  : state.CreateListingFormReducer.advertiserForm,
        publisherForm   : state.CreateListingFormReducer.publisherForm
    }
}

const mapDispatchToProps = (dispatch) => {
    return {}
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FormConfirmation);