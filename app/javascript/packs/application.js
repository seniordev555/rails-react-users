// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

require('@rails/ujs').start();
require('turbolinks').start();
require('@rails/activestorage').start();
require('channels');

// Uncomment to copy all static images under ../images to the output folder and reference
// them with the image_pack_tag helper in views (e.g <%= image_pack_tag 'rails.png' %>)
// or the `imagePath` JavaScript helper below.
//
// const images = require.context('../images', true)
// const imagePath = (name) => images(name, true)

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import configureStore from '../store/config';
import history from '../common/history';
import App from '../components/App';
import 'normalize.css';

const store = configureStore();

const theme = createMuiTheme();

document.addEventListener('DOMContentLoaded', () => {
  render(
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <App history={history} />
      </ThemeProvider>
    </Provider>,
    document.querySelector('#root')
  );
});
