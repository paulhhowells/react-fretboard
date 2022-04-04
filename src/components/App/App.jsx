import React from 'react';
import ControlPlate from '../ControlPlate';
import Neck from '../Neck';
import { useNotes, useSettings } from '../../hooks';
import { TUNING } from '../../constants';

export const NoteContext = React.createContext();

function App () {
	const {
		degree,
		notes,
		pattern,
		styleMode,
		setDegree,
		setPattern,
		setStyleMode,
		keyRoot,
		setKeyRoot,

		patternOptions,
		degreeOptions,
	} = useNotes();
	const { fretMode,	numberOfFrets, numberOfStrings } = useSettings();

	const [ tuning ] = React.useState(TUNING.EADGBE);

	return (
		<div className="app">
			<h1>React Fretboard</h1>
			<NoteContext.Provider value={{
				styleMode, setStyleMode,
				keyRoot, setKeyRoot,
			}}>
			<ControlPlate
					degree={degree}
					pattern={pattern}
					setDegree={setDegree}
					setPattern={setPattern}
					styleMode={styleMode}
					patternOptions={patternOptions}
					degreeOptions={degreeOptions}
			/>
			<Neck
				fretMode={fretMode}
				notes={notes}
				numberOfFrets={numberOfFrets}
				numberOfStrings={numberOfStrings}
				tuning={tuning}
			/>
			</NoteContext.Provider>
		</div>
	);
}

export default App;
