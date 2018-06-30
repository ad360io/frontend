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
import FormConfirmation from './FormConfirmation/FormConfirmation.component';

/*
Material UI
*/
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';

/*
React Bootstrap
*/
import { Alert } from 'react-bootstrap';


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
    iconContainer: { // define styles for icon container
        transform: 'scale(1.3)',
        marginLeft: '3px',
        marginRight: '3px',
    },
    label: {
        fontSize: '18px'
    }
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
            activeStep: 0
        }

        this.decideFormTitle = this.decideFormTitle.bind(this);
        this.handleSubmitForm = this.handleSubmitForm.bind(this);
        this.getStepContent = this.getStepContent.bind(this);
        this.isFormFilled = this.isFormFilled.bind(this)
    }

    componentWillReceiveProps() {
        this.handleReset();
    }

    getStepContent(step) {
        switch (step) {
            case 0:
                return <RequiredFormFields modeFilter={this.props.modeFilter}/>;
            case 1:
                return <OptionalFormFields modeFilter={this.props.modeFilter}/>;
            case 2:
                return <FormConfirmation   modeFilter={this.props.modeFilter} currencyFilter={this.props.currencyFilter} />;
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

    handleSubmitForm() {
        // build URL to Postgrest
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

    isFormFilled() {
        if (this.props.modeFilter === 'Advertiser') {
            return this.props.advertiserForm.marketingType.length > 0
                && this.props.advertiserForm.marketingMedium.length > 0
                && this.props.advertiserForm.description.length > 0
                && this.props.advertiserForm.topic.length > 0
        }
        else {
            return this.props.publisherForm.marketingType.length > 0
                && this.props.publisherForm.marketingMedium.length > 0
                && this.props.publisherForm.description.length > 0
                && this.props.publisherForm.topic.length > 0
                && this.props.publisherForm.price.length > 0
                && typeof this.props.publisherForm.dateFrom !== undefined
                && typeof this.props.publisherForm.dateTo.length !== undefined
        }
    }

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
                            <StepLabel classes={{
                                iconContainer: classes.iconContainer,
                                label: classes.label
                            }}
                            >
                                {label}
                            </StepLabel>
                            <StepContent>
                                <div>{this.getStepContent(index)}</div>
                                <div className={classes.actionsContainer}>
                                    <div
                                        hidden={activeStep === 0 && !this.isFormFilled()}
                                    >
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
                                            {activeStep === steps.length - 1 ? 'Confirm' : 'Next'}
                                        </Button>

                                    </div>
                                    <Alert
                                        bsStyle='danger'
                                        hidden={this.isFormFilled()}
                                        style={{marginLeft: '2%'}}
                                    >
                                        All information above is required to proceed to next step!
                                    </Alert>
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
        modeFilter      : state.MenuBarFilterReducer.modeFilter,
        currencyFilter  : state.MenuBarFilterReducer.currencyFilter,
        advertiserForm  : state.CreateListingFormReducer.advertiserForm,
        publisherForm   : state.CreateListingFormReducer.publisherForm
    }
}

const mapDispatchToProps = (dispatch) => {
    return {}
}


export default withStyles(styles)(connect(
    mapStateToProps,
    mapDispatchToProps
)(CreateListingForm))