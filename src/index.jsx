import React from 'react';
import { render } from "react-dom";
import { HashRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from './configureStore.jsx';
import App from './components/App.jsx';
import "./sass/index.sass";


const store = configureStore();

render(
  <Provider store={store}>
    <HashRouter>
      <Route exact path="/" component={App} />
      <Route path="/:lat/:lon" component={App} />
    </HashRouter>
  </Provider>,
  document.getElementById('root')
);