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


// This should be purely functional.
// This stores no state, no reason to use ES6 classes.

class App extends Component {
  render() {
    return (
      <div className="app-container">
        <Provider store={store}>
            <AppRouter></AppRouter>
        </Provider>
      </div>
    );
  }
}


export default App;
