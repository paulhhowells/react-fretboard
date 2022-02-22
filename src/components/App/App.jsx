import React from 'react';
import Neck from '../Neck';
import { useNotes } from '../../hooks';

function App () {
	const { notes, openStringPitches } = useNotes();

	return (
		<div className="App">
			<h1>React Fretboard</h1>
			<ControlPlate />
			<Neck openStringPitches={openStringPitches} notes={notes} />
		</div>
	);
}

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
