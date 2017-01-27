import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';

export default function (ComposedComponent) {
	class Authentication extends Component {
		// First time to mount this component
		componentWillMount() {
		
			if (!this.props.authenticated) {
				browserHistory.push('/');
			}
		}
		// Try to rerender this component
		componentWillUpdate(nextProps) {
			if (!nextProps.authenticated) {
				browserHistory.push('/');
			}	
		}	
		
		render() {
			return <ComposedComponent {...this.props} />
		}
	}

	function mapStateToProps(state){
		return { authenticated: state.authenticated };
	}

	return connect(mapStateToProps)(Authentication);
}
