import React from 'react'

const Card = ({card: {name, ability}}) => (
		<div>
			<p>{name}</p>
			<p>Ability: {ability}</p>
			<img src={ "" /* src destructed from props */ } />
		</div>
	)

export default Card