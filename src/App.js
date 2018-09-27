import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import cards from './cardsData'
import Board from './components/Board'

class App extends Component {

	state = {
		cards: {
			myHand: [],
			deck: []
		}
	}

	componentDidMount() {
		this.setState({
			cards: {
				myHand: [cards[1], cards[4]],
				deck: []
			}
		})
	}

	render() {
		return (
			<div> {/* there was className="App" here before */}
				<Board cards={this.state.cards}/>
			</div>
		)
	}
}

export default App;