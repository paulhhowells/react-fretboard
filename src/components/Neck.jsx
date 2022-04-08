import React from 'react';
import { useSettingsContext } from '../context/SettingsContext';
import { useFretboard } from '../hooks';
import Notes from './Notes';
import Fretboard from './Fretboard';

export default function Neck ({ noteLabelling }) {
	// numberOfFrets includes the nut as fret 0, so for 1 nut + 24 frets use 25.
	const {
		fretSpacing,
		numberOfFrets = 13,
		numberOfStrings = 6,
		tuning,
	} = useSettingsContext();

	const { fretboardHeight, fretboardWidth, calculateFretX } = useFretboard({ fretSpacing, numberOfFrets, numberOfStrings });

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
