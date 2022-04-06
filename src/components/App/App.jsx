import React from 'react';
import ControlPlate from '../ControlPlate';
import Neck from '../Neck';
import TuningSelector from '../ControlPlate/TuningSelector';
import { TUNING } from '../../constants';
import { NoteProvider } from '../../context/ScaleContext';

export const NoteContext = React.createContext();

function App () {
	const [ tuning, setTuning ] = React.useState(TUNING.EADGBE);

	return (
		<div className="app">
			<h1>React Fretboard</h1>
			<NoteProvider>
				<ControlPlate>
					<TuningSelector tuning={tuning} setTuning={setTuning} />
				</ControlPlate>
				<Neck tuning={tuning} />
			</NoteProvider>
		</div>
	);
}

export default App;
