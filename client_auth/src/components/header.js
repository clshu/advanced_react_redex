import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class Header extends Component {
	renderLink() {
		if (this.props.authenticated) {
			return (
				<li className="nav-item">
					<Link to="signout">Sign Out</Link>
				</li>
				)
		} else {
			return ([
				<li className="nav-item" key={1}>
					<Link to="signin">Sign In</Link>
				</li>,

				<li className="nav-item" key={2}>
					<Link to="signup">Sign Up</Link>
				</li>
			]);
		}
	}
	render() {
		return (
			<nav className="navbar navbar-light">
				<Link to="/" className="navbar-brand">Redux Auth</Link>
				<ul className="nav navbar-nav">
					{this.renderLink()}
				</ul>
			</nav>
			)
	}
}

function mapsStateToProps(state) {
	return { authenticated: state.auth.authenticated };
}
export default connect(mapsStateToProps)(Header);