import React, { Component } from 'react'
import LoginMenu from './LoginMenu'
import SignupMenu from './SignupMenu'

export default class Menu extends Component {

	state = {
		username: '',
		password: ''
	}

	handleChange = e => this.setState({
		[e.target.name]: e.target.value
	})

	handleSubmit = e => {
		e.preventDefault()
		console.log("Submitted")
	}

	renderForm() {
		if ( true /* Some Condition */ ) {
			return <LoginMenu handleChange={this.handleChange} handleSubmit={this.handleSubmit}/>
		} else {
			return <SignupMenu />
		}
	}
	
	render() {
		return (
			<div>
				{this.renderForm()}
			</div>
		)
	}
}