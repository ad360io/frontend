/*
Core Libs
*/
import React, { Component } from 'react';
import { connect } from 'react-redux';

/*
Local CSS
*/
import './CreateListingForm.component.css';

/*
Children Components
*/
import RequiredFormFields from './RequiredFormFields/RequiredFormFields.component';
import OptionalFormFields from './OptionalFormFields/OptionalFormFields.component';
import FormConfirmation   from './FormConfirmation/FormConfirmation.component';

/*
Material UI
*/
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';


const styles = theme => ({
    root: {
        width: '90%',
    },
    button: {
        marginTop: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
    actionsContainer: {
        marginBottom: theme.spacing.unit * 2,
    },
    resetContainer: {
        padding: theme.spacing.unit * 3,
    },
});

function getSteps() {
    return ['Required Information', 'Optional Information', 'Confirmation'];
}

/**
 * Create Listing Form Component
 */
class CreateListingForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            description: '',
            topic: '',
            activeStep: 0
        }

        this.handleTopicChange = this.handleTopicChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);

        this.decideFormTitle = this.decideFormTitle.bind(this);
        this.decideDescriptionLabel = this.decideDescriptionLabel.bind(this);

        this.handleSubmitForm = this.handleSubmitForm.bind(this);

        this.getStepContent = this.getStepContent.bind(this);
    }

    getStepContent(step) {
        switch (step) {
            case 0:
                return <RequiredFormFields
                    handleDescriptionChange={this.handleDescriptionChange}
                    handleTopicChange={this.handleTopicChange}
                    decideDescriptionLabel={this.decideDescriptionLabel}
                />                    
            case 1:
                return <OptionalFormFields />;
            case 2:
                return <FormConfirmation />;
            default:
                return 'Unknown step';
        }
    }
    decideFormTitle() {
        return (this.props.modeFilter === 'Advertiser'
            ? 'Request Content Space Availability'
            : 'Create Content Space Listings'
        );
    }

    handleDescriptionChange(event) {
        this.setState({
            ...this.state,
            description: event.target.value
        })
        console.log(this.state)
    }

    handleTopicChange(event) {
        this.setState({
            ...this.state,
            topic: event.target.value
        })
    }

    handleSubmitForm() {
        // build URL to Postgrest
    }

    decideDescriptionLabel() {
        return (this.props.modeFilter === 'Advertiser'
            ? "Content Description"
            : "Listing Description")
    }

    handleNext = () => {
        this.setState({
            ...this.state,
            activeStep: this.state.activeStep + 1,
        });
    };

    handleBack = () => {
        this.setState({
            ...this.state,
            activeStep: this.state.activeStep - 1,
        });
    };

    handleReset = () => {
        this.setState({
            ...this.state,
            activeStep: 0,
        });
    };

    render() {
        const { classes } = this.props;
        const steps = getSteps();
        const { activeStep } = this.state;

        return <div className={classes.root + ' create-listing-form-container'}>
            <h2 className='create-listing-form-title'>{this.decideFormTitle()}</h2>
            <Stepper activeStep={activeStep} orientation="vertical">
                {steps.map((label, index) => {
                    return (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                            <StepContent>
                                <div>{this.getStepContent(index)}</div>
                                <div className={classes.actionsContainer}>
                                    <div>
                                        <Button
                                            disabled={activeStep === 0}
                                            onClick={this.handleBack}
                                            className={classes.button}
                                        >
                                            Back
                      </Button>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={this.handleNext}
                                            className={classes.button}
                                        >
                                            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                        </Button>
                                    </div>
                                </div>
                            </StepContent>
                        </Step>
                    );
                })}
            </Stepper>
            <form className='create-form'>


            </form>
        </div>;
    }
}

const mapStateToProps = (state) => {
    return {
        modeFilter: state.MenuBarFilterReducer.modeFilter,
        currencyFilter: state.MenuBarFilterReducer.currencyFilter
    }
}

const mapDispatchToProps = (dispatch) => {
    return {}
}


export default withStyles(styles)(connect(
    mapStateToProps,
    mapDispatchToProps
)(CreateListingForm))