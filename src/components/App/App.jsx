import React from 'react';

import { FRET_SPACING, TUNING, NOTE_LABELLING_OPTIONS } from '../../constants';
import { NoteProvider } from '../../context/ScaleContext';
import ControlPlate from '../ControlPlate';
import Neck from '../Neck';
import TuningSelector from '../ControlPlate/TuningSelector';
import NoteLabellingSelector from '../ControlPlate/NoteLabellingSelector';
import Settings from '../Settings';
import FretSpacingSelector from '../FretSpacingSelector';

export const NoteContext = React.createContext();

function App () {
	const [ tuningKey, setTuningKey ] = React.useState('EADGBE');
	const tuning = TUNING[tuningKey];

	// TODO refactor into a context.
	const [ noteLabelling, setNoteLabelling ] = React.useState(NOTE_LABELLING_OPTIONS[0].key);

	const [ fretSpacing, setFretSpacing ] = React.useState(FRET_SPACING.EVEN);

	return (
		<div className="app">
			<header className="app-header">
				<h1>React Fretboard <span className="h1-section">Prototype</span></h1>
				<Settings>
					<div className="row">
						<TuningSelector tuningKey={tuningKey} setTuningKey={setTuningKey} />
					</div>
					<div className="row">
						<FretSpacingSelector fretSpacing={fretSpacing} setFretSpacing={setFretSpacing} />
					</div>
				</Settings>
			</header>
			<NoteProvider>
				<ControlPlate>
					<NoteLabellingSelector
						noteLabelling={noteLabelling}
						setNoteLabelling={setNoteLabelling}
					/>
				</ControlPlate>
				<Neck
					fretSpacing={fretSpacing}
					tuning={tuning}
					noteLabelling={noteLabelling}
				/>
			</NoteProvider>
		</div>
	);
}

export default App;
