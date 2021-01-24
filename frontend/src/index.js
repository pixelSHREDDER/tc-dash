import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux'
import store from './redux/store'
import { Auth0Provider } from "@auth0/auth0-react";
import './index.css';
import 'react-sortable-tree/style.css'; // This only needs to be imported once in your app
import { AUTH0 } from './conf';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <Provider store={store}>
      <BrowserRouter>
        <Auth0Provider
          domain={AUTH0.domain}
          clientId={AUTH0.clientID}
          redirectUri={window.location.origin}
          audience={AUTH0.audience}
          scope="read:current_user update:current_user_metadata"
        >
          <App />
        </Auth0Provider>
      </BrowserRouter>
    </Provider>
  , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
