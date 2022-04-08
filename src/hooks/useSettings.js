import React from 'react';
import {
	FRET_SPACING,
	NOTE_LABELLING_OPTIONS,
	TUNING,
} from '../constants';

export function useSettings () {
	const [ noteLabelling, setNoteLabelling ] = React.useState(NOTE_LABELLING_OPTIONS[0].key);

	// numberOfFrets includes the nut as fret 0, so for 1 nut + 24 frets use 25.
	const [ numberOfFrets, setNumberOfFrets ] = React.useState(16);

	const [ numberOfStrings, setNumberOfStrings ] = React.useState(6);
	const [ fretSpacing, setFretSpacing ] = React.useState(FRET_SPACING.EVEN);
	const [ tuningKey, setTuningKey ] = React.useState('EADGBE');

	const tuning = TUNING[tuningKey];

	return {
		fretSpacing,
		noteLabelling,
		numberOfFrets,
		numberOfStrings,
		setFretSpacing,
		setNoteLabelling,
		setNumberOfFrets,
		setNumberOfStrings,
		setTuningKey,
		tuning,
		tuningKey,
	 };
}
