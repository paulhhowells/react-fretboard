import React from 'react';
import ControlPlate from '../ControlPlate';
import Neck from '../Neck';
import { TUNING } from '../../constants';
import { NoteProvider } from '../../context/ScaleContext';

export const NoteContext = React.createContext();

function App () {
	const [ tuning ] = React.useState(TUNING.EADGBE);

	return (
		<div className="app">
			<h1>React Fretboard</h1>
			<NoteProvider>
				<ControlPlate />
				<Neck tuning={tuning} />
			</NoteProvider>
		</div>
	);
}

export default App;
