import React from 'react'
import { Menu } from 'semantic-ui-react'


const ActionsList = ({takeAction, playerId, turnId, player: { wallet }}) => {

	const enabled = playerId === turnId && wallet < 10
	const coupEnabled = wallet >= 7 && enabled

	return (
		<Menu secondary vertical style={{fontSize: '1.5em'}} >
			<Menu.Item
				disabled={!enabled}
				name='income'
				onClick={takeAction}
			/>
			<Menu.Item
				disabled = {!enabled}
				name='foreign aid'
				onClick={takeAction}
			/>
			<Menu.Item
				disabled = {!coupEnabled}
				name='coup'
				onClick={takeAction}
			/>
			<Menu.Item
				disabled = {!enabled}
				name='exchange cards'
				onClick={takeAction}
			/>
			<Menu.Item
				disabled = {!enabled}
				name='assasinate'
				onClick={takeAction}
			/>
			<Menu.Item
				disabled = {!enabled}
				name='steal'
				onClick={takeAction}
			/>
		</Menu>
	)
}

export default ActionsList