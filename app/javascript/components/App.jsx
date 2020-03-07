import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Router, Switch, Route, Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import PeopleOutlinedIcon from '@material-ui/icons/PeopleOutline';
import * as Actions from '../store/actions';
import UsersList from './Users';
import UserEditor from './Users/editor';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

const App = ({ history }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const isLeftDrawerOpened = useSelector(({ ui }) => ui.isLeftDrawerOpened);

  const handleDrawerOpen = () => {
    dispatch(Actions.toggleDrawer(true));
  };

  const handleDrawerClose = () => {
    dispatch(Actions.toggleDrawer(false));
  };

  const handleMenu = (attr) => () => {
    switch (attr) {
      case 'users':
        history.push('/users');
        break;
      default:
        break;
    }
    handleDrawerClose();
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={handleDrawerOpen}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title} noWrap>
            App
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        classes={{
          paper: classes.drawerPaper,
        }}
        open={isLeftDrawerOpened}
        onClose={handleDrawerClose}
      >
        <div className={classes.toolbar} />
        <List>
          <ListItem button onClick={handleMenu('users')}>
            <ListItemIcon>
              <PeopleOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Users" />
          </ListItem>
        </List>
      </Drawer>
      <main className={classes.content}>
        <Router history={history}>
          <Switch>
            <Route exact path="/users" component={UsersList} />
            <Route path="/users/:id?" component={UserEditor} />
            <Redirect to="/users" />
          </Switch>
        </Router>
      </main>
    </div>
  );
};

export default App;
