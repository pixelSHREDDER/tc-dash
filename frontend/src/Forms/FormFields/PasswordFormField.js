import React from 'react';
import PropTypes from 'prop-types';
import {
  FormControl,
  FormHelperText,
  Grid,
  InputAdornment,
  TextField
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { HidePasswordIcon, ShowPasswordIcon } from '../../Icons';

const styles = theme => ({
  eye: {
    cursor: 'pointer',
  },
});

class PasswordFormField extends React.Component {
  state = {
    currentConfirmValue: '',
    currentValue: '',
    passIsMasked: true,
  };

  //TODO: Replace with real data
  componentDidMount = () => this.setState({ currentValue: this.props.form.text || '' });

  handleOnBlur = (value, id, name, validators) => {
      if (value === this.state.currentValue) return;
      this.props.inputChangeHandler(value, id, name, ['required', ...validators]);
      this.setState({ currentValue: value });
  };

  handleConfirmOnBlur = value => value !== this.state.currentConfirmValue && this.setState({ currentConfirmValue: value });

  togglePasswordMask = () => this.setState(prevState => ({ passIsMasked: !prevState.passIsMasked }));

  render() {
    const { classes, errors, fields, index } = this.props;
    const { currentConfirmValue, currentValue, passIsMasked } = this.state;
    const field = fields[index];
    const noMatch = !!(currentValue.length && currentConfirmValue !== currentValue);

    if (!('label' in field)) { field.label = 'Password'; }
    if (!('id' in field)) { field.id = field.label.replace(/ /g, '_'); }

    return (
      <Grid item xs={12}>
        <FormControl error={field.id in errors} fullWidth>
            <TextField
                id={field.id}
                type={passIsMasked ? 'password' : 'text'}
                label={field.label}
                defaultValue={currentValue}
                onBlur={e => this.handleOnBlur(e.target.value, field.id, field.name, field.validators)}
                aria-describedby={`${field.id}-helper-text`}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      {
                      (!passIsMasked) &&
                        <HidePasswordIcon
                          className={classes.eye}
                          onClick={(e) => this.togglePasswordMask()}
                        />
                      }
                      {
                      (passIsMasked) &&
                        <ShowPasswordIcon
                          className={classes.eye}
                          onClick={(e) => this.togglePasswordMask()}
                        />
                      }
                    </InputAdornment>
                  ),
                }}
            />
            <FormHelperText id={`${field.id}-helper-text`}>
                {(field.id in errors) && <span>{errors[field.id]}</span>}
            </FormHelperText>
        </FormControl>
        <FormControl error={noMatch} fullWidth>
            <TextField
                id={`${field.id}_confirm`}
                type={passIsMasked ? 'password' : 'text'}
                label={`Confirm ${field.label.charAt(0).toLowerCase()}${field.label.substring(1)}`}
                defaultValue={''}
                onBlur={e => this.handleConfirmOnBlur(e.target.value, `${field.id}_confirm`, field.validators)}
                aria-describedby={`${field.id}_confirm-helper-text`}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      {
                      (!passIsMasked) &&
                        <HidePasswordIcon
                          className={classes.eye}
                          onClick={(e) => this.togglePasswordMask()}
                        />
                      }
                      {
                      (passIsMasked) &&
                        <ShowPasswordIcon
                          className={classes.eye}
                          onClick={(e) => this.togglePasswordMask()}
                        />
                      }
                    </InputAdornment>
                  ),
                }}
            />
            <FormHelperText id={`${field.id}_confirm-helper-text`} className={(index === (fields.length - 1)) ? classes.formHelperText : ''}>
                {noMatch && <span>Passwords do not match</span>}
            </FormHelperText>
        </FormControl>
      </Grid>
      );
  }
}

PasswordFormField.propTypes = {
  errors: PropTypes.object.isRequired,
  fields: PropTypes.array.isRequired,
  form: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  inputChangeHandler: PropTypes.func.isRequired,
};

export default withStyles(styles, { withTheme: true })(PasswordFormField);