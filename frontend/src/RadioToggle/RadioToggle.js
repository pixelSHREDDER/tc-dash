import React from 'react';
import RadioToggleControls from './RadioToggleControls';
import { TextField } from '@material-ui/core';

class RadioToggle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          formOpen: false,
        };
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

export default RadioToggle;