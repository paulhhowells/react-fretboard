import React from 'react';

import { NoteProvider } from '../../context/ScaleContext';
import { SettingsProvider } from '../../context/SettingsContext';
import ControlPlate from '../ControlPlate';
import Neck from '../Neck';
import Settings from '../Settings';

function App () {
	return (
		<div className="app">
			<SettingsProvider>
				<header className="app-header">
					<h1>React Fretboard <span className="h1-section">Prototype</span></h1>
					<Settings />
				</header>
				<NoteProvider>
					<ControlPlate />
					<Neck />
				</NoteProvider>
			</SettingsProvider>
		</div>
	);
}

export default App;
