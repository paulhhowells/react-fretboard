import React from 'react';
import ControlPlate from '../ControlPlate';
import Neck from '../Neck';
import TuningSelector from '../ControlPlate/TuningSelector';
import NoteLabellingSelector from '../ControlPlate/NoteLabellingSelector';
import { TUNING, NOTE_LABELLING_OPTIONS } from '../../constants';
import { NoteProvider } from '../../context/ScaleContext';

export const NoteContext = React.createContext();

function App () {
	const [ tuningKey, setTuningKey ] = React.useState('EADGBE');
	const tuning = TUNING[tuningKey];

	// TODO refactor into a context.
	const [ noteLabelling, setNoteLabelling ] = React.useState(NOTE_LABELLING_OPTIONS[0]);

	return (
		<div className="app">
			<h1>React Fretboard <span className="h1-section">Prototype</span></h1>
			<NoteProvider>
				<ControlPlate>
					<TuningSelector tuningKey={tuningKey} setTuningKey={setTuningKey} />
					<NoteLabellingSelector
						noteLabelling={noteLabelling}
						setNoteLabelling={setNoteLabelling}
					/>
				</ControlPlate>
				<Neck
					tuning={tuning}
					noteLabelling={noteLabelling}
				/>
			</NoteProvider>
		</div>
	);
}

export default App;
