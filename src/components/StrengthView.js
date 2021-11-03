import React, { useState } from 'react'
import ReactFlow from 'react-flow-renderer'

const elements = [
	{
		id: '1',
		type: 'input', // input node
		data: { label: 'Input Node' },
		position: { x: 250, y: 25 },
	},
	// default node
	{
		id: '2',
		// you can also pass a React component as a label
		data: { label: <div>Default Node</div> },
		position: { x: 100, y: 125 },
	},
	{
		id: '3',
		type: 'output', // output node
		data: { label: 'Output Node' },
		position: { x: 250, y: 250 },
	},
]

const StrengthView = ({ colors }) => {
	const test = ['red']
	console.log('StrengthView:', colors)
	const flowData = test.map(color => {
		let itemID = 1

		return {
			id: itemID++,
			label: color,
			data: { label: color },
			position: { x: 250, y: 25 },
		}
	})
	const [flow, setFlow] = useState(flowData)

	return (
		<div style={{ height: 300 }}>
			<button>Reset</button>
			<ReactFlow elements={flow} />
		</div>
	)
}

export default StrengthView
