import React from 'react';

const initialNoteState = {};

export function useNotes () {
	const { state, dispatch } = React.useReducer(noteReducer, initialNoteState);


	const openStringPitches = [ 4, 9, 2, 7, 11, 4 ].reverse(); // E A D G B E

	const scale = [
		{ note: 0, label: 'C' },
		{ note: 2, label: 'D' },
		{ note: 4, label: 'E' },
		{ note: 5, label: 'F' },
		{ note: 7, label: 'G' },
		{ note: 9, label: 'A' },
		{ note: 11, label: 'B' },
	];

	const notes = new Map(
		scale.map(({ note, label }) => ([ note, label ]))
	);

	return {
		// values
		notes,
		openStringPitches,
		// functions
	};
}

function noteReducer (state, action) {}
