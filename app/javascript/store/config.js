import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { enableBatching } from 'redux-batched-actions';
import reducer from './reducers';

export default () => {
  const composeEnhancer =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const middlewares = [thunk];
  if (process.env.NODE_ENV === 'development') {
    middlewares.push(logger);
  }
  const store = createStore(
    enableBatching(reducer),
    composeEnhancer(applyMiddleware(...middlewares))
  );

  return store;
};
