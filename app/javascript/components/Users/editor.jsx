import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import HomeIcon from '@material-ui/icons/Home';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import FormTextField from './FormTextField';
import * as Actions from '../../store/actions';

const useStyles = makeStyles((theme) => ({
  container: {},
  p2: {
    padding: theme.spacing(2),
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
    marginBottom: theme.spacing(2),
  },
  breadcrumb: {
    fontSize: '0.75rem',
    color: '#666',
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(1),

    '& > svg': {
      marginRight: theme.spacing(1),
      fontSize: '1rem',
    },

    '& > a': {
      margin: `0 ${theme.spacing(1)}px`,
    },
  },
}));

const newUser = () => ({
  email: '',
  first_name: '',
  last_name: '',
});

const formSchema = Yup.object().shape({
  email: Yup.string()
    .email()
    .required('Required'),
  first_name: Yup.string().required('Required'),
  last_name: Yup.string().required('Required'),
});

const Editor = ({ history, match }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.data);
  const [form, setForm] = useState(null);
  const userId = match.params.id;

  useEffect(() => {
    const fetchData = async () => {
      const index = users.findIndex((e) => e.id === userId);
      if (userId !== 'new' && index === -1) {
        await dispatch(Actions.getUser(userId));
      }
    };
    fetchData();
  }, [userId, users, dispatch]);

  useEffect(() => {
    if (!form && userId === 'new') {
      setForm(newUser());
    } else {
      const index = users.findIndex((e) => e.id === userId);
      const user = users[index];
      if ((user && !form) || (user && form && user.id !== form.id)) {
        setForm(user);
      }
    }
  }, [form, users, setForm, userId]);

  const handleSave = async (data) => {
    if (userId === 'new') {
      await dispatch(Actions.createUser(data));
    } else {
      await dispatch(Actions.updateUser({ id: form.id, ...data }));
    }

    history.push('/users');
  };

  if (!form) {
    return null;
  }

  return (
    <div>
      <div className={classes.header}>
        <div className={classes.breadcrumb}>
          <HomeIcon />/<Link to="/users">Users</Link>
        </div>
        <Typography variant="h5">
          {userId === 'new' ? 'New User' : 'Edit User'}
        </Typography>
      </div>
      <Paper className={classes.p2}>
        <Formik
          initialValues={form}
          validationSchema={formSchema}
          onSubmit={(values, actions) => {
            handleSave(values);
            actions.resetForm();
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <Field
                type="email"
                name="email"
                placeholder="Please enter your email"
                label="Email"
                component={FormTextField}
              />
              <Field
                name="first_name"
                placeholder="Please enter your first name"
                label="First name"
                component={FormTextField}
              />
              <Field
                name="last_name"
                placeholder="Please enter your last name"
                label="Last name"
                component={FormTextField}
              />

              <Button
                variant="contained"
                color="primary"
                disabled={isSubmitting}
                type="submit"
              >
                Submit
              </Button>
              <Button component={Link} to="/users">
                Cancel
              </Button>
            </Form>
          )}
        </Formik>
      </Paper>
    </div>
  );
};

export default Editor;
