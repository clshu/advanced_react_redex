import React, { Component }  from 'react';
import { connect } from 'react-redux';

import * as actions from '../actions';

class CommentBox extends Component {
	constructor(props) {
		super(props);
		this.state = {
			comment: ''
		};
	}

	handleChange(event) {
		this.setState({
			comment: event.target.value
		});
	}

	handleSubmit(event) {
		event.preventDefault();
		this.props.saveComment(this.state.comment);
		this.setState({
			comment: ''
		})
	}
	render() {
		return (
			<form className='comment-box' onSubmit={(e) => this.handleSubmit(e)}>
				<textarea value={this.state.comment} onChange={(ev) => this.handleChange(ev)}/>
				<button >Submit</button>		
			</form>
			)
	};
}

export default connect(null, actions)(CommentBox);