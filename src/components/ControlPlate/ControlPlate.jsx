import React from 'react';
import KeySelector from './KeySelector';

export default function ControlPlate ({
	keySign,
	rootNote,
	rootNoteChoices,
	setKeySign,
	setRootNote,
}) {
	return (
		<div className="control-plate">
			<KeySelector
				keySign={keySign}
				setKeySign={setKeySign}
				rootNote={rootNote}
				rootNoteChoices={rootNoteChoices}
				setRootNote={setRootNote}
			/>

			{/*
				Key Chooser
				Vanilla / Blues - Mode Chooser
				Nashville / Alphabetical - Chooser
				Tuning chooser - spanish / Eb / dadgad / dadgbd / mandolin / E9 (with pedals) / C6 / banjo 5th string & ties?
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
