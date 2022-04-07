import React from 'react';
import Notes from './Notes';
import Fretboard from './Fretboard';
import { FRET_MODE } from '../constants';
import { useFretboard, useSettings } from '../hooks';

export default function Neck ({	tuning, noteLabelling }) {
	const {
		fretMode = FRET_MODE.EVEN,
		numberOfStrings = 6,

		// Includes the nut as fret 0, so for 1 nut + 24 frets use 25.
		numberOfFrets = 13,
	} = useSettings();

	const { fretboardHeight, fretboardWidth, calculateFretX } = useFretboard({ fretMode, numberOfFrets, numberOfStrings });

	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox={'0 0 ' + fretboardWidth + ' ' + fretboardHeight}
			style={{ width: fretboardWidth * 2, height: 'auto', margin: '1rem' }}
		>
			<Fretboard
				fretboardWidth={fretboardWidth}
				fretboardHeight={fretboardHeight}
				numberOfFrets={numberOfFrets}
				numberOfStrings={numberOfStrings}
				calculateFretX={calculateFretX}
				tuning={tuning}
			/>
			<Notes
				numberOfFrets={numberOfFrets}
				calculateFretX={calculateFretX}
				tuning={tuning}
				noteLabelling={noteLabelling}
			/>
		</svg>
	);
}
