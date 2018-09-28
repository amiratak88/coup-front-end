import React, { Component } from 'react'
import ChallengePrompt from './ChallengePrompt'
import Hand from './Hand'
import ActionsList from './ActionsList'
import cards from './../cardsData'
import { Grid } from 'semantic-ui-react'
import Player from './Player'

export default class Board extends Component {

	getOpponents() {
		return this.props.game.players.map(p => {
			if (this.props.playerId !== p.id) {
				return (
					<Grid.Column color='red'>
						<Player player={p} disabled={true}/>
					</Grid.Column>
				)
			}
		})
	}

	render() {
		// console.log("Board State:", this.state)
		// console.log("Board Props:", this.props)

		const {game: {players}, playerId} = this.props

		return (
			<Grid style={{height: '100vh'}}>
					<Grid.Row columns={3} style={{height: '43%'}}>
						{this.getOpponents()}
					</Grid.Row>

					<Grid.Row style={{height: '67%'}}>
						<Grid.Column color='yellow' width={3}>
							notifications
						</Grid.Column>
						<Grid.Column color='black' width={10}>
							<Player player={players.find(p => p.id === this.props.playerId)} disabled={false}/>
						</Grid.Column>
						<Grid.Column color='pink' width={3}>
							ActionsList
						</Grid.Column>
					</Grid.Row>
				</Grid>
		)
	}
}