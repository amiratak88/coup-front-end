import React from 'react'

const SignupMenu = ({handleChange, handleSubmit}) => (
	<div>
		<form onSubmit={handleSubmit}>
			<label for="username"></label>
			<input type="text" name="username" id ="username" onChange={handleChange}></input><br />

			<label for="password"></label>
			<input type="password" name="password" id ="password" onChange={handleChange}></input><br />

			<label for="confirm-password"></label>
			<input type="password" name="confrim-password" id ="confirm-password" onChange={handleChange}></input><br />

			<input type="submit"></input>
		</form>
	</div>
)

export default SignupMenu