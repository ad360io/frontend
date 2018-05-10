/*
React, Redux, Router Cores
*/
import React from 'react';
import { Provider } from 'react-redux';
import AppRouter from './router/AppRouter';
import store from './store/index';

/*
Local CSS
*/
import './App.css';


const App = () => (
    <div className="app-container">
      <Provider store={store}>
          <AppRouter></AppRouter>
      </Provider>
    </div>
);

export default App;
