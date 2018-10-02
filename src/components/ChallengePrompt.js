import React, { Component } from 'react'
import { Button, Modal } from 'semantic-ui-react'

class ChallengePrompt extends Component {
	state = { open: false, timer: 10}
	
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
	
	render() {
		console.log("Challenge Prompt STATE", this.state)
		const { open, dimmer } = this.state
		const { players, turnId, action} = this.props
		const turnPlayer = players.find(p => p.id === turnId)

		return (
			<div>

				<Modal dimmer={dimmer} open={open} onClose={this.close}>
					<Modal.Content >
						<p>{turnPlayer.name} is trying to {action}</p>
						<p>Challenege them if you think they're bluffing</p>
					</Modal.Content>
					<Modal.Actions>
						<Button
							negative
							icon='close'
							labelPosition='right'
							content="Nope"
							onClick={this.close}
						/>

						<Button
							positive
							icon='checkmark'
							labelPosition='right'
							content="Challenge"
							onClick={this.close}
						/>
					</Modal.Actions>
				</Modal>
			</div>
		)
	}
}

export default ChallengePrompt
