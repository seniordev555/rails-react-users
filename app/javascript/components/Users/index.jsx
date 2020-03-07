import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import * as Actions from '../../store/actions';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  container: {},
  m2: {
    margin: theme.spacing(2),
  },
}));

const columns = [
  {
    id: 'name',
    label: 'Name',
    minWidth: 170,
    format: (_, row) => `${row.first_name} ${row.last_name}`,
  },
  {
    id: 'email',
    label: 'Email',
    minWidth: 170,
  },
];

const Users = ({ history }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.data);

  useEffect(() => {
    dispatch(Actions.loadUsers());
  }, []);

  const handleEdit = (user) => () => {
    history.replace(`/users/${user.id}`);
  };

  const handleDelete = (user) => () => {};

  if (!users) {
    return null;
  }

  return (
    <div>
      <Typography variant="h5">Users</Typography>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table" size="small">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
              <TableCell align="right" />
            </TableRow>
          </TableHead>
          <TableBody>
            {users.length === 0 && (
              <TableRow>
                <TableCell colSpan={1} align="center">
                  No Users
                </TableCell>
              </TableRow>
            )}
            {users.map((row) => (
              <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                {columns.map((column) => {
                  const value = row[column.id];
                  return (
                    <TableCell key={column.id} align={column.align}>
                      {column.format ? column.format(value, row) : value}
                    </TableCell>
                  );
                })}
                <TableCell align="right">
                  <IconButton onClick={handleEdit(row)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={handleDelete(row)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Users;
