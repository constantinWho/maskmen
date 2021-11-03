import React from 'react'
import styled from 'styled-components'

// Toast stylesheet
const Div = styled.div`
	margin-top: 2em;
	margin-left: auto;
	margin-right: auto;
	width: 15em;
	height: 5em;
	border: black 0.1em solid;
	border-radius: 1em;
	background-color: yellow;
	text-align: center;
`

// Toast component
const Tost = () => {
	return <Div>Now drag and drop to the weaker wrestler</Div>
}

export default Tost
