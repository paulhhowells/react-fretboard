import {
	FRET_SPACING,
	NOTE_LABELLING_OPTIONS,
	TUNING,
} from '../constants';
import { usePersistence } from '../hooks';

export function useSettings () {
	const { persistState, currentState } = usePersistence({
		id: 'settings',
		defaultState: {
			fretSpacing: FRET_SPACING.EVEN,
			noteLabelling: NOTE_LABELLING_OPTIONS[0].key,

			// numberOfFrets includes the nut as fret 0, so for 1 nut + 24 frets use 25.
			numberOfFrets: 16,

			numberOfStrings: 6,
			tuningKey: 'EADGBE',
		}
	});

	const setFretSpacing = fretSpacing => persistState('fretSpacing', fretSpacing);
	const setNoteLabelling = noteLabelling => persistState('noteLabelling', noteLabelling);
	const setNumberOfFrets = numberOfFrets => persistState('numberOfFrets', numberOfFrets);
	const setNumberOfStrings = numberOfStrings => persistState('numberOfStrings', numberOfStrings);
	const setTuningKey = tuningKey => persistState('tuningKey', tuningKey);

	const {
		fretSpacing,
		noteLabelling,
		numberOfFrets,
		numberOfStrings,
		tuningKey,
	 } = currentState;
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
