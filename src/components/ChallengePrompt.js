import React, { Component } from 'react'
import { Button, Modal } from 'semantic-ui-react'

class ChallengePrompt extends Component {
	state = { open: false, timer: 5}
	
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

		return (
			<div>

				<Modal dimmer={dimmer} open={open} onClose={this.close}>
					<Modal.Content >
						<p>We've found the following gravatar image associated with your e-mail address.</p>
						<p>Is it okay to use this photo?</p>
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
