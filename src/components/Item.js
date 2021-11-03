import React, { useState, useEffect } from 'react'
import Ghost from './Ghost'
import styled from 'styled-components'

// Item Stylesheet
const Div = styled.div`
	height: 3em;
	width: 3em;
	border: 0.1px solid black;
	border-radius: 10px;
	background-color: ${props => props.color};
`

// Item Component
const Item = ({ index, onDragStart, onDrag, onDrop, color }) => {
	const [ghost, setGhost] = useState(null)
	const onMouseDown = event => {
		const dom = event.target,
			color = dom.getAttribute('color'),
			mousemoveCb = event => {
				setGhost({
					color,

					event,
				})
				onDrag(color, event)
			},
			mouseupCb = _ => {
				setGhost(false)

				window.removeEventListener('mousemove', mousemoveCb)
				window.removeEventListener('mouseup', mouseupCb)

				onDrop(color, event)
			}

		window.addEventListener('mousemove', mousemoveCb)
		window.addEventListener('mouseup', mouseupCb)

		onDragStart(color, event)
	}

	return (
		<>
			<div data-item={index}>
				<Div onMouseDown={onMouseDown} color={color}></Div>
			</div>
			{ghost ? <Ghost options={ghost} /> : null}
		</>
	)
}

export default Item
