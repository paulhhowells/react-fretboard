import React from 'react';
import { useNotes } from '../hooks/useNotes/useNotes';

const ScaleNoteContext = React.createContext();
const ScaleOptionsContext = React.createContext();

function NoteProvider ({ children }) {
	const {
		notes,
		...scaleOptionsValue
	} = useNotes();

	return (
		<ScaleNoteContext.Provider value={ notes }>
			<ScaleOptionsContext.Provider value={ scaleOptionsValue }>
				{ children }
			</ScaleOptionsContext.Provider>
		</ScaleNoteContext.Provider>
	);
}

function useScaleNotes () {
	const context = React.useContext(ScaleNoteContext);

	if (context === undefined) {
		throw new Error('useScaleNotes must be used within a NoteProvider');
	}

	return context;
}

function useScaleOptions () {
	const context = React.useContext(ScaleOptionsContext);

	if (context === undefined) {
		throw new Error('useScaleOptions must be used within a NoteProvider');
	}

	return context;
}

export { NoteProvider, useScaleNotes, useScaleOptions };
