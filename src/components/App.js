import React, { useState, useEffect } from 'react'
import StrengthLogic from '../logic'
import Toast from './Toast'
import StrengthView from './StrengthView'
import DefinitionView from './DefinitionView'
import './App.css'

const App = () => {
	// StrengthLogic.defineStronger("purple", "green");
	// StrengthLogic.getHierarchy();
	const [colors, setColors] = useState([])

	// Define the stronger color
	useEffect(() => {
		console.log('Color added to App.js:', colors)
		if (colors.length === 2) {
			StrengthLogic.defineStronger(colors[0], colors[1])
			console.log(StrengthLogic.getHierarchy())
			setColors([])
		}
	}, [colors])

	return (
		<div>
			<Toast />
			<StrengthView colors={colors} />
			<DefinitionView
				colors={colors}
				setColors={setColors}
				StrengthLogic={StrengthLogic}
			/>
		</div>
	)
}

export default App
