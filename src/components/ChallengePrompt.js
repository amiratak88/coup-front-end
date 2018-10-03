import React, { Component } from 'react'
import { Button, Modal } from 'semantic-ui-react'

class ChallengePrompt extends Component {
	state = { open: false, timer: 10}
	close = () => this.setState({open: false})
	
	componentDidMount() {
		this.setState({open: true, dimmer: "blurring"})
		this.inv = setInterval(() => this.setState({timer: this.state.timer - 1}), 1000)
	}

	componentDidUpdate() {
		if (this.state.timer === 0) {
			this.setState({open: false, timer: 5})
			clearInterval(this.inv)
		}
	}

	renderRightContent() {
		const { match: { players, turnId, action, challengedId, phase, targetId }, playerId } = this.props
		const turnPlayer = players.find(p => p.id === turnId)

		if (phase === "block" && playerId === targetId) {
			return (
				<p>{turnPlayer.name} is trying to {action}{action === "steal" && " from"} you</p>
			)
		} else if (phase === "challenge" && challengedId === playerId) {
			return <p>Waiting for players to challenge</p>
		} else if (phase === "challenge") {
			return (
				<div>
					<p>{turnPlayer.name} is trying to {action}</p>
					<p>Challenge them if you think they're bluffing</p>
				</div>
			)
		}
	}

	renderButtons() {
		const { match: { phase, targetId, challengedId }, playerId } = this.props
		if ((phase === "block" && playerId === targetId) || (phase === "challenge" && challengedId !== playerId)) {
			return (
				<Modal.Actions>
					<Button
						negative
						icon='close'
						labelPosition='right'
						content="Nope"
						onClick={e => {
							this.close
						}}
					/>

					<Button
						positive
						icon='checkmark'
						labelPosition='right'
						content={phase === "block" ? "Block" : "Challenge"}
						onClick={this.close}
					/>
				</Modal.Actions>
			)
		}
	}
	
	render() {
		console.log("Challenge Prompt STATE", this.state)
		const { open, dimmer } = this.state
		const { match: { players, turnId, action, phase }, playerId } = this.props
		const turnPlayer = players.find(p => p.id === turnId)

		return (
			<div>

				<Modal dimmer={dimmer} open={open} onClose={this.close}>
					<Modal.Content >
						{this.renderRightContent()}
					</Modal.Content>
					{this.renderButtons()}
				</Modal>
			</div>
		)
	}
}

export default ChallengePrompt
