import React from 'react';
import ControlPlate from '../ControlPlate';
import Neck from '../Neck';
import { useNotes, useSettings } from '../../hooks';
import { TUNING } from '../../constants';

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
		</div>
	);
}

export default App;
