import React, { useRef } from 'react'
import Item from './Item'
import styled from 'styled-components'

// DefinitionView Stylesheet
const Div = styled.div`
	width: 98%;
	height: 4em;
	margin-left: auto;
	margin-right: auto;
	border-radius: 10px;
	border: 1px solid black;
	display: grid;
	grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
	justify-items: center;
	align-items: center;
	background-color: gray;
`

// DefinitionView Component
const DefinitionView = ({ setColors, colors }) => {
	// Pick colors
	const ref = useRef(null),
		items = [
			{ color: 'purple' },
			{ color: 'green' },
			{ color: 'yellow' },
			{ color: 'blue' },
			{ color: 'black' },
			{ color: 'pink' },
		],
		collisionDetection = (ignoreColor, source) => {
			items.forEach((item, i) => {
				if (item.color === ignoreColor) {
					return
				}
				if (
					source.pageX >= item.bcr.x &&
					source.pageX <= item.bcr.x + item.bcr.width
				) {
					if (
						source.pageY >= item.bcr.y &&
						source.pageY <= item.bcr.y + item.bcr.height
					) {
						console.log('stop touching me: ' + i)
					}
				}
			})
		},
		onDragStart = (color, event) => {
			ref.current.querySelectorAll('[data-item]').forEach(item => {
				const i = +item.getAttribute('data-item')
				items[i].bcr = item.getBoundingClientRect()
			})
			console.log(items)
			// collisionDetection(
			// 	event,
			// 	ref.current.querySelectorAll('[data-item]')
			// )
		},
		onDrag = (color, event) => {
			collisionDetection(color, event)
		},
		onDrop = (color, event) => {}

	// Render
	return (
		<Div ref={ref}>
			{items.map((item, i) => {
				return (
					<Item
						key={i}
						index={i}
						onDragStart={onDragStart}
						onDrag={onDrag}
						onDrop={onDrop}
						color={item.color}
						test={item.color}
					/>
				)
			})}
		</Div>
	)
}

export default DefinitionView
