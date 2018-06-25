/*
Core Libs
*/
import React from 'react';
import { connect } from 'react-redux';

/*
React Bootstrap
*/
import { FormGroup, FormControl } from 'react-bootstrap';

/*
Children Components
*/
import AvailabilityPicker from './AvailabilityPicker/AvailabilityPicker.component';
import MarketingTypeDropdown from './MarketingTypeDropdown/MarketingTypeDropdown.component';


const RequiredFormField = ({ modeFilter,
                             handleTopicChange, 
                             decideDescriptionLabel, 
                             handleDescriptionChange 
                            }) => (<div style={{marginLeft: '2%', marginTop: '2%'}}>
        <FormGroup hidden={modeFilter === 'Advertiser'}>
            <p className='control-label'>
                *Select Promotion Duration
            </p>
            <AvailabilityPicker />
        </FormGroup>

        <MarketingTypeDropdown />

        <FormGroup controlId='control-form-topic'>
            <p className='control-label'>
                *Content Topic
                    </p>
            <FormControl type='text' onChange={handleTopicChange} required />
        </FormGroup>

        <FormGroup controlId='control-form-price' hidden={modeFilter === 'Advertiser'}>
            <p className='control-label'>
                *Price per time unit (day/week/month/year)
                    </p>
            <FormControl type='number' style={{ width: '50%', float: 'left' }} />
            <FormControl componentClass='select' style={{ width: '50%' }} required>
                <option value='day'>per day</option>
                <option value='week'>per week</option>
                <option value='month'>per month</option>
                <option value='year'>per year</option>
            </FormControl>

        </FormGroup>

        <FormGroup controlId='control-form-pitch'>
            <p className='control-label'>*{decideDescriptionLabel()} </p>
            <FormControl componentClass='textarea'
                maxLength={280}
                rows={8}
                style={{ resize: 'vertical' }}
                onChange={handleDescriptionChange}
                required
            />
        </FormGroup>
    </div>
)

const mapStateToProps = (state) => {
    return {
        modeFilter: state.MenuBarFilterReducer.modeFilter,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {}
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RequiredFormField);