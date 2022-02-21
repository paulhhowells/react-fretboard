import React from 'react';
import Neck from './components/Neck';

function App () {
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

	return (
		<div className="App">
			<h1>React Fretboard</h1>
			<ControlPlate />
			<Neck openStringPitches={openStringPitches} notes={notes} />
		</div>
	);
}

const initialNoteState = {};

function useNotes () {
	const { state, dispatch } = React.useReducer(noteReducer, initialNoteState);

	return {};
}
function noteReducer (state, action) {}

export function ControlPlate () {
	return (
		<div className="control-plate">
			{/*
				Key Chooser
				Vanilla / Blues - Mode Chooser
				Nashville / Alphabetical - Chooser
				Tuning chooser - spanish / Eb / dadgad / dadgbd / mandolin / E9 (with pedals) / C6
				String muting

				Vanilla / Diatonic Mode
				Triad I - VII
				Seventh Chords I - VII
				Diatonic scale / modes I - VII
				Pentatonic I - VI

				Parallel Sixths - string pair chooser E A D

				Blues Mode - major / minor
				I / IV / V
				X Triad
				X Dominant 7th
				X Mixolydian
				Pentatonic
					X Major Pentatonic / Hexatonic
					X Minor Pentatonic / Hexatonic

					optional pentatonics I IV V
				X Diad 3 & 7
			*/}
		</div>
	);
}

export default App;
