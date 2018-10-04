import React, { Component } from 'react'
import ChallengePrompt from './ChallengePrompt'
import ActionsList from './ActionsList'
import { Grid } from 'semantic-ui-react'
import Player from './Player'

export default class Board extends Component {

	getOpponents() {
		console.log("Board Props:", this.props)		
		const { declareTarget } = this.props
		return this.props.match.players.map(p => {
			if (this.props.playerId !== p.id) {
				return (
					<Grid.Column  key ={p.id} color='red'>
						<Player player={p} disabled={true} isMe={false} declareTarget={declareTarget} handleLoseCard={null} />
					</Grid.Column>
				)
			}
		})
	}

	render() {
		// console.log("Board State:", this.state)
		console.log("Board Props:", this.props)

		const { match: { players, turnId, phase, action }, playerId, takeAction, declareTarget, handleChallenge, handleLoseCard, handleBlock } = this.props
		const player = players.find(p => p.id === playerId)

		return (
			<Grid style={{height: '100vh'}}>

				{(phase === "challenge" || phase === "block") && <ChallengePrompt match={this.props.match} playerId={this.props.playerId} handleChallenge={handleChallenge} handleBlock={handleBlock}/>}

				<Grid.Row columns={3} style={{height: '43%'}}>
					{this.getOpponents()}
				</Grid.Row>

				<Grid.Row style={{height: '57%'}}>
					<Grid.Column color='yellow' width={3}>
						notifications
					</Grid.Column>
					<Grid.Column color='black' width={10}>
						<Player player={players.find(p => p.id === this.props.playerId)} isMe={true} declareTarget={declareTarget} handleLoseCard={handleLoseCard} />
					</Grid.Column>
					<Grid.Column color='pink' width={3}>
						<ActionsList takeAction={takeAction} playerId={playerId} turnId={turnId} player={player} phase={phase} />
					</Grid.Column>
				</Grid.Row>
			</Grid>
		)
	}
}