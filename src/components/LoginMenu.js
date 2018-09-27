import React from 'react'

const LoginMenu = ({handleChange, handleSubmit}) => (
	<div>
		<form onSubmit={handleSubmit}>
			<label for="username">Username: </label>
			<input type="text" name="username" id ="username" onChange={handleChange}></input><br />

			<label for="password">Password: </label>
			<input type="text" name="password" id ="password" onChange={handleChange}></input><br />

			<input type="submit"></input>
		</form>
	</div>
)

export default LoginMenu