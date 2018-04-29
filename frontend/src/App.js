/*
React, Redux, Router Cores
*/
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import AppRouter from './router/AppRouter';
import store from './store/index';

/*
Local CSS
*/
import './App.css';


class App extends Component {
  render() {
    return (
      <Provider store={store}>
          <AppRouter></AppRouter>
      </Provider>
    );
  }
}


export default App;
