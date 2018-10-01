import React, { Component } from 'react';
import { Form, Button } from 'semantic-ui-react' 

export default class Login extends Component {
	
	state = {
		name: ''
	}

	handleChange = e => {
		this.setState({name: e.target.value})
	}
	
	render() {
		
		const { handleSubmit } = this.props

		return (
			<Form onSubmit={() => handleSubmit(this.state.name)}>
				<Form.Field>
					<input placeholder='Name' autoFocus onChange={this.handleChange}/>
				</Form.Field>
				<Button type='submit'>Submit</Button>
			</Form>
		);
	}
}