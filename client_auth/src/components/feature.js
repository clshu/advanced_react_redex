import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Feature extends Component {
	componentWillUnmount() {
		this.props.fetchMessage();
	}
	render() {
		return (
			<h3> {this.props.message}</h3>
			)
	}
}

function mapStateToProps(state) {
	return { message: state.backend.message };
}
export default connect(mapStateToProps, actions)(Feature);