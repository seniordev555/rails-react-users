import React from 'react';
import { makeStyles } from '@material-ui/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  mb2: {
    marginBottom: theme.spacing(2),
  },
}));

const FormTextField = ({ field, form, ...props }) => {
  const classes = useStyles();
  const error = form.errors[field.name];
  const touched = form.touched[field.name];
  const hasError = Boolean(error && touched);

  return (
    <TextField
      {...field}
      {...props}
      fullWidth
      error={hasError}
      helperText={hasError ? error : ''}
      InputLabelProps={{ shrink: true }}
      className={classes.mb2}
    />
  );
};

export default FormTextField;
