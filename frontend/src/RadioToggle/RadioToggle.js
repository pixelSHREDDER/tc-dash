import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
  TextField
} from '@material-ui/core';

const styles = theme => ({
  root: {
    display: 'flex',
  },
  formControl: {
    margin: theme.spacing(3),
  },
  group: {
    margin: [theme.spacing(1), 0],
    //margin: theme.spacing(1),
  },
});

class RadioButtonsGroup extends React.Component {
  state = {
    value: '',
  };

  handleChange = event => {
    this.setState({ value: event.target.value });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <FormControl component="fieldset" className={classes.formControl}>
          <FormLabel component="legend">Do you already have a Facebook page?</FormLabel>
          <FormHelperText>We'll make one for you if you don't!</FormHelperText>
          <RadioGroup
            aria-label="GenFacebookder"
            name="facebook"
            className={classes.group}
            value={this.state.value}
            onChange={this.handleChange}
          >
            <FormControlLabel
              value="true"
              control={<Radio />}
              label="Yes"
            />
            <FormControlLabel
              value="false"
              control={<Radio color="primary" />}
              label="No"
            />
          </RadioGroup>
        {this.state.value === 'true' &&
          <div>
            <br></br>
            <fieldset>
              <TextField
                id="standard-name"
                label="Name"
                //className={classes.textField}
                //value={this.state.name}
                //onChange={this.handleChange('name')}
                margin="normal"
              />
            </fieldset>
          </div>
        }
        </FormControl>
      </div>
    );
  }
}

RadioButtonsGroup.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RadioButtonsGroup);