import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { AUTH_USER, AUTH_TOKEN_KEY } from './actions/types';

import App from './components/app';
import Signin from './components/auth/signin';
import Signout from './components/auth/signout';
import Signup from './components/auth/signup';
import RequireAuth from './components/auth/require_auth';
import Feature from './components/feature';
import Home from './components/home';
import reducers from './reducers';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const store = createStoreWithMiddleware(reducers);

const token = localStorage.getItem(AUTH_TOKEN_KEY);
if (token) {
  store.dispatch({type: AUTH_USER});
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory} >
    	<Route path='/' component={App}>
        <IndexRoute component={Home} />
    		<Route path='signin' component={Signin}/>
    		<Route path='signout' component={Signout}/>
    		<Route path='signup' component={Signup}/>
        <Route path='feature' component={RequireAuth(Feature)}/>
    	</Route>
    </Router>
  </Provider>
  , document.querySelector('.container'));

// Application state 
// Changed when signed up, in, or out
/*
{
	auth: {
		authenticated: BOOLEAN,
		error: STRING
	}
}

*/