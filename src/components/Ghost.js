import React from 'react'
import styled from 'styled-components'

// Item Stylesheet
const Div = styled.div`
	position: absolute;
	left: ${props => props.x}px;
	top: ${props => props.y}px;
	height: 3em;
	width: 3em;
	border: 0.1px solid black;
	border-radius: 10px;
	background-color: ${props => props.color};
	opacity: 0.5;
`

const Ghost = ({ options }) => {
	console.log(options.event)
	return (
		<Div
			color={options.color}
			x={options.event.pageX}
			y={options.event.pageY}
		/>
	)
}

export default Ghost
