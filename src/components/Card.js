import React from 'react'
import { Image, Reveal, Container } from 'semantic-ui-react'

const getImgURL = name => require(`./../assets/images/${name.toLowerCase()}.png`)
const getBackImg  = () => require('./../assets/images/back.png')

const revealedCard = ({ deck: { card:{ name, desc, ability } } }) => (
		<Reveal animated='small fade' instant style={{height: '100%', width: '100%'}} >
			<Reveal.Content visible style={{height: '100%', width: '100%'}}>
				<Image src={getImgURL(name)} rounded centered style={{height: '100%'}}/>
			</Reveal.Content>
			<Reveal.Content hidden style={{height: '100%', width: '100%'}} >
				<Container textAlign='center' style={{width: '40%'}}>
					<p>{name}</p>
					<p>{ability}</p>
					<p>{desc}</p>
				</Container>
			</Reveal.Content>
		</Reveal>
)

const opponentCard = (card) => {
	if (card.active) {
		return <Image src={getBackImg()} style={{height: '100%'}} rounded centered/>
	} else {
		return revealedCard(card)
	}
}

const Card = ({ hand, isMe }) => {
	if (isMe) {
		return revealedCard(hand)
	} else {
		return opponentCard(hand)
	}
}

export default Card