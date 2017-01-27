import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class Signup extends Component {
  handleFormSubmit = ({email, password}) => {
    this.props.signupUser({email, password});
  };
  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>{this.props.errorMessage}</strong>
        </div>
        )
    }
  }

  handleCleanUp = () => {
    this.props.authError('');
    this.props.reset();
  }

	render() {

  	const { handleSubmit, pristine, reset, submitting } = this.props;
  	
		return (
    <form onSubmit={handleSubmit(this.handleFormSubmit)}>
    	
      <div>
        <label>Email</label>
        <div>
           <Field name="email" component="input" type="email" placeholder="Email"/> 
        </div>
      </div>
      <div>
        <label>Password</label>
        <div>
          <Field name="password" component="input" type="password" placeholder="Password"/>
        </div>
        {/*password.touched && password.error && <div className="error">{password.error}</div> */}
      </div>
      <div>
        <label>Confirm Password</label>
        <div>
          <Field name="passwordConfirm" component="input" type="password" placeholder="Confirm Password"/>
        </div>
      </div>
      {this.renderAlert()}
      <div>
        <button type="submit" disabled={pristine || submitting}>Submit</button>
        <button type="button" disabled={pristine || submitting} onClick={this.handleCleanUp}>Clear Values</button>
      </div>

    </form>
  	)
	}
}

function validate({email, password, passwordConfirm}) {
	let error = {};
	if (password != passwordConfirm) {
		error.password = 'Passwords and confirmed password did not match'
	}
	return error;
}
function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}
export default connect(mapStateToProps, actions)(reduxForm({
  form: 'signup', // a unique identifier for this form
  validate: validate
})(Signup))
