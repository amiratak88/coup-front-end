import React from 'react'
import { Input } from 'semantic-ui-react'

const SignupMenu = ({handleChange, handleSubmit}) => (
	<div>
		<form onSubmit={handleSubmit}>
			<label htmlFor="username">Username: </label>
			<input type="text" name="username" id ="username" onChange={handleChange}></input><br />

			<label htmlFor="password">Password: </label>
			<input type="password" name="password" id ="password" onChange={handleChange}></input><br />

			<label htmlFor="confirm-password">Confirm password: </label>
			<input type="password" name="confrim-password" id ="confirm-password" onChange={handleChange}></input><br />

			<input type="submit"></input>
		</form>
	</div>
)

export default SignupMenu