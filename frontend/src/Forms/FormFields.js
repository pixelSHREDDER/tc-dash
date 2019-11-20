const radio = (fields, index, form, errors) => {
    let field = fields[index];
    
    return (
        <Grid item sm={12} md={6}>
            <FormControl component="fieldset" error={field.id in errors} fullWidth>
                <FormLabel component="legend">{field.label}</FormLabel>
                {
                    field.description &&
                    <FormHelperText>{field.description}</FormHelperText>
                }
                <RadioGroup
                    aria-label={field.label}
                    name={field.id}
                    onChange={e => this.handleFormChange(e.target.value, field.id, field.validators)}
                    aria-describedby={`${field.id}-helper-text`}
                    row
                >
                    {field.options.map(option => (
                        <FormControlLabel key={`${field.id}_${option.value}`}
                            id={`${field.id}_${option.value}`}
                            value={option.value}
                            control={<Radio color="primary" />}
                            label={option.label}
                        />
                    ))}
                </RadioGroup>
            </FormControl>
        </Grid>
    );
};

const radioToggle = (fields, index, form, errors) => {
    const { classes } = this.props;
    const { openForms } = this.state;
    let field = fields[index];
    
    return (
        <Grid item xs={12} lg={6}>
            <React.Fragment>
                <RadioToggleControls title={field.title} description={field.description || ''} labels={field.labels} inputKey={field.title.replace(/ /g, '_')} sendRadio={(data) => this.handleRadioToggle(data, field.title.replace(/ /g, '_'))} />
                {
                ((field.title.replace(/ /g, '_') in openForms) && (openForms[field.title.replace(/ /g, '_')] === true)) &&
                    <React.Fragment>
                        <fieldset className={classes.fieldset}>
                            <div className={classes.grid}>
                                <Grid container spacing={2}>
                                    {field.fields.map((subField, index) => (
                                        <React.Fragment key={subField.id}>
                                            {
                                            (subField.type === 'text') &&
                                                <React.Fragment>    
                                                    {this.renderTextField(field.fields, index, form, errors)}
                                                </React.Fragment>
                                            }
                                            {
                                            (subField.type === 'radio') &&
                                                <React.Fragment>    
                                                    {this.renderRadioField(field.fields, index, form, errors)}
                                                </React.Fragment>
                                            }
                                            {
                                            (subField.type === 'radioToggle') &&
                                                <React.Fragment>    
                                                    {this.renderRadioToggleField(field.fields, index, form, errors)}
                                                </React.Fragment>
                                            }
                                        </React.Fragment>
                                    ))}
                                </Grid>
                            </div>
                        </fieldset>
                    </React.Fragment>
                }
            </React.Fragment>
        </Grid>
    );
};

const password = (fields, index, form, errors) => {
    const { classes } = this.props;
    let field = fields[index];
    
    return (
        <Grid item xs={12}>
            <FormControl error={field.id in errors} fullWidth>
                <InputLabel htmlFor={field.id}>{field.label}</InputLabel>
                <Input
                    id={field.id}
                    defaultValue={form.text}
                    onBlur={e => this.handleFormChange(e.target.value, field.id, field.validators)}
                    aria-describedby={`${field.id}-helper-text`}
                />
                <FormHelperText id={`${field.id}-helper-text`} className={(index === (fields.length - 1)) ? classes.formHelperText : ''}>
                    {(field.id in errors) && <span>{errors[field.id]}</span>}
                </FormHelperText>
            </FormControl>
        </Grid>
    );
};

export {
    text,
    radio,
    radioToggle,
    password,
};