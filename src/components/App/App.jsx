import React from 'react';
import ControlPlate from '../ControlPlate';
import Neck from '../Neck';
import { useNotes, useSettings } from '../../hooks';

function App () {
	const {
		keyType,
		notes,
		openStringPitches,
		rootNote,
		rootNoteChoices,
		setKeyType,
		setRootNote,
	} = useNotes();
	const { fretMode,	numberOfFrets, numberOfStrings } = useSettings();

	return (
		<div className="App">
			<h1>React Fretboard</h1>
			<ControlPlate
				keyType={keyType}
				rootNote={rootNote}
				rootNoteChoices={rootNoteChoices}
				setKeyType={setKeyType}
				setRootNote={setRootNote}
			/>
			<Neck
				fretMode={fretMode}
				notes={notes}
				numberOfFrets={numberOfFrets}
				numberOfStrings={numberOfStrings}
				openStringPitches={openStringPitches}
			/>
		</div>
	);
}

export default App;
