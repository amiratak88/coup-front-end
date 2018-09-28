import React from 'react'

const LoginMenu = ({handleChange, handleSubmit}) => (
	<div>
		<form onSubmit={handleSubmit}>
			<label htmlFor="username">Username: </label>
			<input type="text" name="username" id ="username" onChange={handleChange}></input><br />

			<label htmlFor="password">Password: </label>
			<input type="password" name="password" id ="password" onChange={handleChange}></input><br />

			<input type="submit"></input>
		</form>
	</div>
)

export default LoginMenu