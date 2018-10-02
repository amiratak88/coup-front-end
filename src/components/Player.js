import React from 'react'
import { Grid, Container, Segment } from 'semantic-ui-react'
import Card from './Card'

const Player = ({ player: {id, name, wallet, cards}, isMe, declareTarget }) => {
	return (
		<Container style={{height: '100%'}}>
			<Container style={{height: '17%'}} textAlign='center' onClick={e => declareTarget(id)}>
				{name}
			</Container>
			<Container style={{height: '16%'}} textAlign='center'>
				{wallet} coins
			</Container>

			<Grid style={{height: '67%'}}>
				<Grid.Row columns={2} style={{height: '100%', boxSizing: 'border-box'}}>
					<Grid.Column><Card card={cards[0]} isMe={isMe} /></Grid.Column>
					<Grid.Column><Card card={cards[1]} isMe={isMe} /></Grid.Column>
				</Grid.Row>
			</Grid>
		</Container>
	)
}

export default Player