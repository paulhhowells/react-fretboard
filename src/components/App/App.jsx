import React from 'react';
import ControlPlate from '../ControlPlate';
import Neck from '../Neck';
import TuningSelector from '../ControlPlate/TuningSelector';
import { TUNING } from '../../constants';
import { NoteProvider } from '../../context/ScaleContext';

export const NoteContext = React.createContext();

function App () {
	const [ tuningKey, setTuningKey ] = React.useState('EADGBE');
	const tuning = TUNING[tuningKey];

	return (
		<div className="app">
			<h1>React Fretboard</h1>
			<NoteProvider>
				<ControlPlate>
					<TuningSelector tuningKey={tuningKey} setTuningKey={setTuningKey} />
				</ControlPlate>
				<Neck tuning={tuning} />
			</NoteProvider>
		</div>
	);
}

export default App;
