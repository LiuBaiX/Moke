import React from 'react';
import './App.scss';
import { Provider } from 'react-redux';
import { HashRouter, Switch } from 'react-router-dom';
import { HomePage as Application } from './views';
import store from './redux';

function App() {
  return (
    <Provider store={store}>
      <HashRouter>
        <Switch>
          <Application />
        </Switch>
      </HashRouter>
    </Provider>
  );
}

export default App;
