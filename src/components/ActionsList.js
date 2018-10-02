import React from 'react'
import { Menu } from 'semantic-ui-react'


const ActionsList = ({takeAction, playerId, turnId, player: { wallet }, phase }) => {

	const enabled = playerId === turnId && wallet < 10 && phase === "take action"
	const coupEnabled = wallet >= 7 && playerId === turnId && phase === "take action"

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
				name='tax'
				onClick={takeAction}
			/>
			<Menu.Item
				disabled = {!enabled}
				name='exchange cards'
				onClick={takeAction}
			/>
			<Menu.Item
				disabled = {!enabled}
				name='assassinate'
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