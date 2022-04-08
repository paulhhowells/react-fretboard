import React from 'react';

import { NOTE_LABELLING_OPTIONS } from '../../constants';
import { NoteProvider } from '../../context/ScaleContext';
import { SettingsProvider } from '../../context/SettingsContext';
import ControlPlate from '../ControlPlate';
import Neck from '../Neck';
import NoteLabellingSelector from '../ControlPlate/NoteLabellingSelector';
import Settings from '../Settings';

export const NoteContext = React.createContext();

function App () {
	// TODO refactor into a context.
	const [ noteLabelling, setNoteLabelling ] = React.useState(NOTE_LABELLING_OPTIONS[0].key);

	return (
		<div className="app">
			<SettingsProvider>
				<header className="app-header">
					<h1>React Fretboard <span className="h1-section">Prototype</span></h1>
					<Settings />
				</header>
				<NoteProvider>
					<ControlPlate>
						<NoteLabellingSelector
							noteLabelling={noteLabelling}
							setNoteLabelling={setNoteLabelling}
						/>
					</ControlPlate>
					<Neck	noteLabelling={noteLabelling} />
				</NoteProvider>
			</SettingsProvider>
		</div>
	);
}

export default App;
