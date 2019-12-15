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
  constructor(props) {
    super(props);

    this.state = {
      passIsMasked: true,
      validators: ['required'],
    };
  }

  togglePasswordMask = () => {
    this.setState(prevState => ({
      passIsMasked: !prevState.passIsMasked,
    }));
  };

  render() {
    const { classes, fields, index, form, errors, inputChangeHandler } = this.props;
    const { passIsMasked, validators } = this.state;
    const field = fields[index];

    if (!('label' in field)) { field.label = 'Password'; }
    if (!('id' in field)) { field.id = field.label.replace(/ /g, '_'); }

    return (
      <Grid item xs={12}>
        <FormControl error={field.id in errors} fullWidth>
            <TextField
                id={field.id}
                type={passIsMasked ? 'password' : 'text'}
                label={field.label}
                defaultValue={form.text}
                onBlur={e => inputChangeHandler(e.target.value, field.id, validators)}
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
        <FormControl error={`${field.id}_confirm` in errors} fullWidth>
            <TextField
                id={`${field.id}_confirm`}
                type={passIsMasked ? 'password' : 'text'}
                label={`Confirm ${field.label.charAt(0).toLowerCase()}${field.label.substring(1)}`}
                defaultValue={form.text}
                onBlur={e => inputChangeHandler(e.target.value, `${field.id}_confirm`, validators)}
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
                {(`${field.id}_confirm` in errors) && <span>{errors[`${field.id}_confirm`]}</span>}
            </FormHelperText>
        </FormControl>
      </Grid>
      );
  }
}

PasswordFormField.propTypes = {
  fields: PropTypes.array.isRequired,
  index: PropTypes.number.isRequired,
  form: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  inputChangeHandler: PropTypes.func.isRequired,
};

export default withStyles(styles, { withTheme: true })(PasswordFormField);