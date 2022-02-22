import React from 'react';
import ControlPlate from '../ControlPlate';
import Neck from '../Neck';
import { useNotes, useSettings } from '../../hooks';

function App () {
	const { notes, openStringPitches } = useNotes();
	const { fretMode,	numberOfFrets, numberOfStrings } = useSettings();

	return (
		<div className="App">
			<h1>React Fretboard</h1>
			<ControlPlate />
			<Neck
				openStringPitches={openStringPitches}
				notes={notes}
				fretMode={fretMode}
				numberOfFrets={numberOfFrets}
				numberOfStrings={numberOfStrings}
			/>
		</div>
	);
}

export default App;
