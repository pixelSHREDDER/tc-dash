import React from 'react';
import PropTypes from 'prop-types';
import {
    FormControl,
    FormHelperText,
    Grid,
    InputLabel,
    MenuItem,
    Select
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
});
  

class StateFormField extends React.Component {
    state = {
        currentValue: '',
    };

    //TODO: Replace with real data
    //componentDidMount = () => this.setState({ currentValue: this.props.fields[this.props.index].value });

    handleInput = (value, id, name, validators, parents) => {
        if (value === this.state.currentValue) return;
        this.props.inputChangeHandler(value, id, name, ['required', ...validators], parents);
        this.setState({ currentValue: value });
    };

    render() {
        const { errors, fields, index } = this.props;
        const field = fields[index];
    
        return (
            <Grid item sm={12}>
                <FormControl component="fieldset" error={field.id in errors} fullWidth>
                    <InputLabel>{field.label}</InputLabel>
                    <Select
                        labelid={`${field.id}_label`}
                        id={field.id}
                        value={this.state.currentValue}
                        onChange={e => this.handleInput(e.target.value, field.id, field.name, field.validators, field.parents)}
                    >
                        <MenuItem value={'AL'}>Alabama</MenuItem>
                        <MenuItem value={'AK'}>Alaska</MenuItem>
                        <MenuItem value={'AZ'}>Arizona</MenuItem>
                        <MenuItem value={'AR'}>Arkansas</MenuItem>
                        <MenuItem value={'CA'}>California</MenuItem>
                        <MenuItem value={'CO'}>Colorado</MenuItem>
                        <MenuItem value={'CT'}>Connecticut</MenuItem>
                        <MenuItem value={'DE'}>Delaware</MenuItem>
                        <MenuItem value={'DC'}>District Of Columbia</MenuItem>
                        <MenuItem value={'FL'}>Florida</MenuItem>
                        <MenuItem value={'GA'}>Georgia</MenuItem>
                        <MenuItem value={'HI'}>Hawaii</MenuItem>
                        <MenuItem value={'ID'}>Idaho</MenuItem>
                        <MenuItem value={'IL'}>Illinois</MenuItem>
                        <MenuItem value={'IN'}>Indiana</MenuItem>
                        <MenuItem value={'IA'}>Iowa</MenuItem>
                        <MenuItem value={'KS'}>Kansas</MenuItem>
                        <MenuItem value={'KY'}>Kentucky</MenuItem>
                        <MenuItem value={'LA'}>Louisiana</MenuItem>
                        <MenuItem value={'ME'}>Maine</MenuItem>
                        <MenuItem value={'MD'}>Maryland</MenuItem>
                        <MenuItem value={'MA'}>Massachusetts</MenuItem>
                        <MenuItem value={'MI'}>Michigan</MenuItem>
                        <MenuItem value={'MN'}>Minnesota</MenuItem>
                        <MenuItem value={'MS'}>Mississippi</MenuItem>
                        <MenuItem value={'MO'}>Missouri</MenuItem>
                        <MenuItem value={'MT'}>Montana</MenuItem>
                        <MenuItem value={'NE'}>Nebraska</MenuItem>
                        <MenuItem value={'NV'}>Nevada</MenuItem>
                        <MenuItem value={'NH'}>New Hampshire</MenuItem>
                        <MenuItem value={'NJ'}>New Jersey</MenuItem>
                        <MenuItem value={'NM'}>New Mexico</MenuItem>
                        <MenuItem value={'NY'}>New York</MenuItem>
                        <MenuItem value={'NC'}>North Carolina</MenuItem>
                        <MenuItem value={'ND'}>North Dakota</MenuItem>
                        <MenuItem value={'OH'}>Ohio</MenuItem>
                        <MenuItem value={'OK'}>Oklahoma</MenuItem>
                        <MenuItem value={'OR'}>Oregon</MenuItem>
                        <MenuItem value={'PA'}>Pennsylvania</MenuItem>
                        <MenuItem value={'RI'}>Rhode Island</MenuItem>
                        <MenuItem value={'SC'}>South Carolina</MenuItem>
                        <MenuItem value={'SD'}>South Dakota</MenuItem>
                        <MenuItem value={'TN'}>Tennessee</MenuItem>
                        <MenuItem value={'TX'}>Texas</MenuItem>
                        <MenuItem value={'UT'}>Utah</MenuItem>
                        <MenuItem value={'VT'}>Vermont</MenuItem>
                        <MenuItem value={'VA'}>Virginia</MenuItem>
                        <MenuItem value={'WA'}>Washington</MenuItem>
                        <MenuItem value={'WV'}>West Virginia</MenuItem>
                        <MenuItem value={'WI'}>Wisconsin</MenuItem>
                        <MenuItem value={'WY'}>Wyoming</MenuItem>
                        <MenuItem value={'AS'}>American Samoa</MenuItem>
                        <MenuItem value={'GU'}>Guam</MenuItem>
                        <MenuItem value={'MP'}>Northern Mariana Islands</MenuItem>
                        <MenuItem value={'PR'}>Puerto Rico</MenuItem>
                        <MenuItem value={'UM'}>United States Minor Outlying Islands</MenuItem>
                        <MenuItem value={'VI'}>Virgin Islands</MenuItem>
                        <MenuItem value={'AA'}>Armed Forces Americas</MenuItem>
                        <MenuItem value={'AP'}>Armed Forces Pacific</MenuItem>
                        <MenuItem value={'AE'}>Armed Forces Others</MenuItem>
                    </Select>
                    <FormHelperText id={`${field.id}-helper-text`}>
                        {(field.id in errors) && <span>{errors[field.id]}</span>}
                    </FormHelperText>
                </FormControl>
            </Grid>
        );
    }
}

StateFormField.propTypes = {
    errors: PropTypes.object.isRequired,
    fields: PropTypes.array.isRequired,
    index: PropTypes.number.isRequired,
    inputChangeHandler: PropTypes.func.isRequired,
};

export default withStyles(styles, { withTheme: true })(StateFormField);