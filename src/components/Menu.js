import React, { Component } from 'react'
import LoginMenu from './LoginMenu'
import SignupMenu from './SignupMenu'

export default class Menu extends Component {

	state = {
		username: ''
		// password: ''
	}

	handleChange = e => {
		console.log("changed")
		this.setState({
			[e.target.name]: e.target.value.toLowerCase()
		})
	}

	handleSubmit = e => {
		e.preventDefault()
		fetch(this.props.API + "users", {
			method: "POST",
			headers: {"Content-Type": "application/json"},
			body: JSON.stringify({name: this.state.username})
		})
		.then(res => res.json()).then(console.log)
	}

	renderForm() {
		if ( true /* Some Condition */ ) {
			return <SignupMenu handleChange={this.handleChange} handleSubmit={this.handleSubmit}/>
		} else {
			return <SignupMenu />
		}
	}
	
	render() {
		console.log(this.state)
		return (
			<div>
				{this.renderForm()}
			</div>
		)
	}
}