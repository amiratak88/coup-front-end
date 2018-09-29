import React from 'react'
import { Image, Reveal } from 'semantic-ui-react'

const Card = ({ card: { name, ability, imgURL, desc }, disabled }) => (
	<Reveal animated='move' instant style={{height: '100%'}} disabled={disabled}>
		<Reveal.Content visible>
			<Image src={imgURL} style={{height: '100%'}} rounded/>
		</Reveal.Content>
		<Reveal.Content hidden>
			<p>{name}</p>
			<p>{desc}</p>
		</Reveal.Content>
	</Reveal>
)

export default Card