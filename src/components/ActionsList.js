import React from 'react'
import { Menu } from 'semantic-ui-react'

const ActionsList = ({takeAction}) => (

	<Menu secondary vertical>
		<Menu.Item
			name='income'
			onClick={takeAction}
		/>
		<Menu.Item
			name='foreign aid'
			onClick={takeAction}
		/>
		<Menu.Item
			name='coup'
			onClick={takeAction}
		/>
		<Menu.Item
			name='exchange cards'
			onClick={takeAction}
		/>
		<Menu.Item
			name='assasinate'
			onClick={takeAction}
		/>
		<Menu.Item
			name='steal'
			onClick={takeAction}
		/>
	</Menu>
)

export default ActionsList