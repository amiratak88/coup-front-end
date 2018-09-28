import React from 'react'
import { Grid, GridColumn } from 'semantic-ui-react'
import Card from './Card'

const Player = ({player: {name, wallet, cards}, disabled}) => {
	return (
		<Grid style={{height: '100%'}}>
			<Grid.Row style={{height: '12%', boxSizing: 'border-box'}}>
				<Grid.Column color='yellow'>{name}</Grid.Column>
			</Grid.Row>
			<Grid.Row style={{height: '12%', boxSizing: 'border-box'}}>
				<Grid.Column color='blue'>{wallet} coins</Grid.Column>
			</Grid.Row>
			<Grid.Row columns={2} style={{height: '76%', boxSizing: 'border-box'}}>
				<Grid.Column><Card card={cards[0]} disabled={disabled}/></Grid.Column>
				<Grid.Column><Card card={cards[1]} disabled={disabled}/></Grid.Column>
			</Grid.Row>
		</Grid>
	)
}

export default Player