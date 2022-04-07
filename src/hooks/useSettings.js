import React from 'react';
import { FRET_SPACING } from '../constants';

export function useSettings () {
	// Includes the nut as fret 0, so for 1 nut + 24 frets use 25.
	const [ numberOfFrets, setNumberOfFrets ] = React.useState(16);

	const [ numberOfStrings, setNumberOfStrings ] = React.useState(6);
	const [ fretMode, setFretMode ] = React.useState(FRET_SPACING.EVEN);

	return {
		fretMode,
		numberOfFrets,
		numberOfStrings,
		setFretMode,
		setNumberOfFrets,
		setNumberOfStrings,
	 };
}
