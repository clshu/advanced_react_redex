import axios from 'axios';
import { browserHistory } from 'react-router';
import { AUTH_USER, AUTH_ERROR, UNAUTH_USER, AUTH_TOKEN_KEY } from './types';

const ROOT_URL = 'http://localhost:3090';

export function signinUser({ email, password }) {
	return function(dispatch) {

	// Submit email/password
		axios.post(`${ROOT_URL}/signin`, { email, password })
		.then(response => {
			// If request is good
			// - Update the application state 
			dispatch({ type: AUTH_USER });
			// - redirect to the route '/feature'
			browserHistory.push('/feature');
			
			// - Save the JWT
			localStorage.setItem(AUTH_TOKEN_KEY, response.data.token);
		})
		.catch(err => dispatch(authError(err.response.data))
		)
	}
}

export function signupUser({ email, password }) {
	return function(dispatch) {

	// Submit email/password
		axios.post(`${ROOT_URL}/signup`, { email, password })
		.then(response => {
			// If request is good
			// - Update the application state 
			dispatch({ type: AUTH_USER });
			// - redirect to the route '/feature'
			browserHistory.push('/feature');
			
			// - Save the JWT
			localStorage.setItem(AUTH_TOKEN_KEY, response.data.token);
		})
		.catch(err => dispatch(authError(err.response.data))
		)
	}
}

export function authError(error) {
	return {
				type:AUTH_ERROR,
				payload: error
				};
}

export function signoutUser() {
	localStorage.removeItem(AUTH_TOKEN_KEY);
	return { type: UNAUTH_USER };
}

export function fetchMessage() {
	return function(dispatch) {
		axios.get(ROOT_URL)
		.then(response => {

		})
		.catch(err => {
			dispatch(authError(err.response.data))
		})
	}
}


