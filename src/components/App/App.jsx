import React from 'react';
import ControlPlate from '../ControlPlate';
import Neck from '../Neck';
import { useNotes } from '../../hooks';

function App () {
	const { notes, openStringPitches } = useNotes();

	return (
		<div className="App">
			<h1>React Fretboard</h1>
			<ControlPlate />
			<Neck openStringPitches={openStringPitches} notes={notes} />
		</div>
	);
}

export default App;
