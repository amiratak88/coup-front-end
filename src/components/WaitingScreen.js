import React from 'react'
import {Container} from 'semantic-ui-react'

const WaitingScreen = ({ players }) => (
	<Container>
		<p>Players in room:</p>
		{players.map(p => <p>{p.user.username}</p>)}
		<p>Waiting for { 4 - players.length } more player(s)</p>
	</Container>
)

export default WaitingScreen