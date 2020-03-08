import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import FormGroup from '@material-ui/core/FormGroup';
import InputLabel from '@material-ui/core/InputLabel';
import Photo from './Photo';

const useStyles = makeStyles((theme) => ({
  mb2: {
    marginBottom: theme.spacing(2),
  },
  avatar: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

const FormFileField = ({ field, form, ...props }) => {
  const classes = useStyles();
  const [photo, setPhoto] = useState(null);
  const name =
    (form.values.first_name[0] || '') + (form.values.last_name[0] || '');

  const handleChange = (event) => {
    const file = event.target.files[0];
    let url = null;
    if (file) {
      url = URL.createObjectURL(file);
      setPhoto(url);
      form.setFieldValue(field.name, file);
    }
  };

  return (
    <FormGroup className={classes.mb2}>
      <InputLabel shrink={true}>{props.label || field.name}</InputLabel>
      <div className={classes.avatar}>
        <Photo text={name} photo={photo || field.value} />
      </div>
      <input type="file" accept="images/*" onChange={handleChange} />
    </FormGroup>
  );
};

export default FormFileField;
