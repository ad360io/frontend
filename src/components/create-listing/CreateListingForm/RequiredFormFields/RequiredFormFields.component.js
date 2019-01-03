/*
Core Libs
*/
import React, {Fragment} from 'react';
import { connect } from 'react-redux';

/*
React Bootstrap
*/
import { FormGroup, FormControl } from 'react-bootstrap';

/*
Children Components
*/
import AvailabilityPicker from './AvailabilityPicker/AvailabilityPicker.component';
import AdFormatSelect from './AdFormatSelect/AdFormatSelect.component';
import {AdFormatSelection} from "./AdFormatSelect/AdFormatSelection";
import {isEmpty} from "lodash";
import Slider from "@material-ui/lab/Slider";
import "./RequiredFormFields.component.css";

export let getRequiredData;

class RequiredFormField extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ...(props.modeFilter !== 'Advertiser' ? {
                from: props.newListing.from || null,
                to: props.newListing.to || null,
                price: props.newListing.price || '',
                quantity: props.newListing.quantity || ''
            } : {
                pay: props.newListing.pay || null
            }),

            adFormat: props.newListing.adFormat || null,
            mediumFormat: props.newListing.mediumFormat || null,
            description: props.newListing.description || '',
            topic: props.newListing.topic || ''
        };

        getRequiredData = this.getData;
    }

    valid = () => {
        const { adFormat, mediumFormat, description, topic, pay } = this.state;

        let stateFieldValidate = this.props.modeFilter !== 'Advertiser' ?
            this.state :
            { adFormat, mediumFormat, description, topic, pay }
        ;

        for (let key in stateFieldValidate) {
            const value = stateFieldValidate[key];
            if(value == null || (typeof value === "string" && isEmpty(value))) return false;
        }
        return true;
    };

    getData = () => this.state;

    render() {
        let { modeFilter = 'Advertiser', formInfo } = this.props;
        let { from, to, adFormat, mediumFormat, price, description, topic, quantity, pay } = this.state;

        formInfo && formInfo({valid: this.valid()});

        return (
            <div style={{marginLeft: '2%', marginTop: '2%'}}>

                { modeFilter !== 'Advertiser' && (
                    <FormGroup>
                        <p className='control-label'>
                            Promotion Duration
                        </p>
                        <AvailabilityPicker
                            {...{
                                from, to,
                                onChange: ({ from, to }) => this.setState({ from, to })
                            }}
                        />
                    </FormGroup>
                )}

                <AdFormatSelection
                    { ... { adFormat, mediumFormat, onChange: (value) => this.setState(value) }}
                />

                <FormGroup controlId='control-form-topic'>
                    <p className='control-label'>
                        Content Topic (80 characters max)
                    </p>
                    <FormControl
                        type='text'
                        maxLength={80}
                        onChange={(e) => this.setState({topic: e.target.value})}
                        required
                        value={topic}
                    />
                </FormGroup>

                { modeFilter === 'Advertiser' && (
                    <Fragment>
                        <FormGroup>
                            <div className="control-label">
                                Pay
                            </div>
                            <FormControl
                                value={pay}
                                type='number' min='1' onChange={(e) => this.setState({pay: e.target.value})}
                                style={{width: '49%'}}
                            />
                        </FormGroup>

                        <FormGroup>
                            <div className="control-label">
                                Payment Due
                            </div>
                            <div className="form-range-slider">
                                <Slider className='range-slider'
                                        onChange={(e, value) => console.log(e, value)}
                                        onDragEnd={() => {}}
                                        min={10}
                                        max={100}
                                        step={10}
                                />
                            </div>
                        </FormGroup>
                    </Fragment>

                )}

                { modeFilter !== 'Advertiser' && (
                    <Fragment>
                        <FormGroup controlId='control-form-price' >
                            <p className='control-label'>
                                Price
                            </p>
                            <FormControl
                                value={price}
                                type='number' min='1' step='1' onChange={(e) => this.setState({price: e.target.value})}
                                style={{width: '49%'}}
                            />
                            <FormControl componentClass='select' style={{width: '49%', float: 'right', display: 'none'}} required>
                                <option value='one-time'>one time</option>
                                <option value='day'>per day</option>
                                {/* <option value='week'>per week</option> */}
                                {/* <option value='month'>per month</option> */}
                                {/* <option value='year'>per year</option> */}
                            </FormControl>
                        </FormGroup>

                        <FormGroup>
                            <p className='control-label'>
                                Availabilities
                            </p>
                            <FormControl
                                value={quantity}
                                type='number' min='1' onChange={(e) => this.setState({quantity: e.target.value})}
                                style={{width: '49%'}}
                            />
                        </FormGroup>
                    </Fragment>
                )}

                <FormGroup controlId='control-form-pitch'>
                    <p className='control-label'>
                        {
                            modeFilter === 'Advertiser'
                                ? "Content Description"
                                : "Listing Description"
                        } (1024 characters max)

                    </p>
                    <FormControl componentClass='textarea'
                                 value={description}
                                 maxLength={1024}
                                 rows={8}
                                 style={{resize: 'vertical'}}
                                 onChange={(e) => this.setState({description: e.target.value})}
                                 required
                    />
                </FormGroup>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        from: state.CreateListingFormReducer.publisherForm.dateFrom,
        to: state.CreateListingFormReducer.publisherForm.dateTo
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    const { modeFilter } = ownProps;
    return {
        onDescriptionChange: (event) => {
            if (modeFilter === 'Advertiser') {
                dispatch({
                    type: 'SET_ADV_FORM_DESCRIPTION',
                    description: event.target.value
                })
            } else {
                dispatch({
                    type: 'SET_PUB_FORM_DESCRIPTION',
                    description: event.target.value
                })
            }

        },
        onTopicChange: (event) => {
            if (modeFilter === 'Advertiser') {
                dispatch({
                    type: 'SET_ADV_FORM_TOPIC',
                    topic: event.target.value
                })
            } else {
                dispatch({
                    type: 'SET_PUB_FORM_TOPIC',
                    topic: event.target.value
                })
            }
        },
        onPriceChange: (event) => {
            dispatch({
                type: 'SET_PUB_FORM_PRICE',
                price: event.target.value,
            })
        }
    }
}


export default RequiredFormField;
