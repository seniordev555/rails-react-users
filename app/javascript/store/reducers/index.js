import { combineReducers } from 'redux';
import users from './users';
import ui from './ui';

export default combineReducers({ ui, users });
