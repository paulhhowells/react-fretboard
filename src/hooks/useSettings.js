import React from 'react';
import {
	FRET_SPACING,
	TUNING,
} from '../constants';

export function useSettings () {
	// numberOfFrets includes the nut as fret 0, so for 1 nut + 24 frets use 25.
	const [ numberOfFrets, setNumberOfFrets ] = React.useState(16);

	const [ numberOfStrings, setNumberOfStrings ] = React.useState(6);
	const [ fretSpacing, setFretSpacing ] = React.useState(FRET_SPACING.EVEN);
	const [ tuningKey, setTuningKey ] = React.useState('EADGBE');

	const tuning = TUNING[tuningKey];

	return {
		fretSpacing,
		numberOfFrets,
		numberOfStrings,
		setFretSpacing,
		setNumberOfFrets,
		setNumberOfStrings,
		setTuningKey,
		tuning,
		tuningKey,
	 };
}
