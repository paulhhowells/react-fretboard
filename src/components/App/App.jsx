import React from 'react';
import ControlPlate from '../ControlPlate';
import Neck from '../Neck';
import { useNotes, useSettings } from '../../hooks';

function App () {
	const {
		keySign,
		notes,
		tuning,
		rootNote,
		rootNoteChoices,
		setKeySign,
		setRootNote,
	} = useNotes();
	const { fretMode,	numberOfFrets, numberOfStrings } = useSettings();

	return (
		<div className="App">
			<h1>React Fretboard</h1>
			<ControlPlate
				keySign={keySign}
				rootNote={rootNote}
				rootNoteChoices={rootNoteChoices}
				setKeySign={setKeySign}
				setRootNote={setRootNote}
			/>
			<Neck
				fretMode={fretMode}
				notes={notes}
				numberOfFrets={numberOfFrets}
				numberOfStrings={numberOfStrings}
				tuning={tuning}
			/>
		</div>
	);
}

export default App;
