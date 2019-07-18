import React from 'react';
import PropTypes from 'prop-types';
import RadioToggleControls from './RadioToggleControls';
import { TextField } from '@material-ui/core';

class RadioToggle extends React.Component {
    state = {
        formOpen: false,
    };

    handleRadioToggle = (inputKey, data) => {
        const { radioChangeCallback } = this.props;
        let inputVal = data[inputKey];
        inputVal = (inputVal === 'true') ? true : (inputVal === 'false') ? false : null;
        this.setState({ formOpen: inputVal });
        radioChangeCallback(inputVal);
    };

    render() {
        const { title, description, labels, formChangeCallback } = this.props;
        const { formOpen } = this.state;
        const inputKey = title.replace(/ /g, '_');

        return (
            <React.Fragment>
                <RadioToggleControls title={title} description={description} labels={labels} inputKey={inputKey} sendRadio={(data) => this.handleRadioToggle(inputKey, data)} />
                {
                formOpen &&
                    <React.Fragment>
                        <br></br>
                        <fieldset>
                            <TextField
                                id="standard-name"
                                label="Name"
                                //className={classes.textField}
                                //value={this.state.name}
                                onChange={formChangeCallback}
                                margin="normal"
                            />
                        </fieldset>
                    </React.Fragment>
                }
            </React.Fragment>
        );
    }
}

RadioToggle.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    labels: PropTypes.array,
    formChangeCallback: PropTypes.func.isRequired,
};

export default RadioToggle;