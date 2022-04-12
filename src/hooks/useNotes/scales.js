import {
	KEY_DEFINITION,
	KEY_SIGN,
	PATTERN_TYPE,
} from '../../constants';

const notation = {
	flat: '♭',
	sharp: '♯',
	natural: '♮',
	doubleFlat: '𝄫'
};

const PATTERN = {
	// Scale. Number matches one of 12 notes.
	scale: {
		//					1  2  3  4  5  6  7
		diatonic: [ 0, 2, 4, 5, 7, 9, 11 ],
	},
	// Diatonic. Number matches one of 7 degrees, and
	// may be shifted by mode.
	diatonic: {
		triad: [ 0, 2, 4 ],
		seventhChord: [ 0, 2, 4, 6 ],

		// TODO: use I II III IV keys
		pentatonic: {
			'0': [ 0, 1, 2, 4, 5 ], // I
			'1': [ 0, 2, 3, 4, 6 ],	// ii-
			'2': [ 0, 2, 3, 4, 6 ],	// iii-
			'3': [ 0, 1, 2, 4, 5 ],	// IV
			'4': [ 0, 1, 2, 4, 5 ],	// V
			'5': [ 0, 2, 3, 4, 6 ],	// vi-
			'6': [ 0, 2, 4, 5, 6 ],	// VII /º ?
		},
	},
	// Modal: interval number matches one of 12 notes.
	modal: {
		dominantSeventhChord: {
			intervals: [ 0, 4, 7, 10 ],
			intervalLabels: [ '1', '3', '5', '♭7' ],
			// mode: 7,
		},
		mixolydian: {
			intervals: [ 0, 2, 4, 5, 7, 9, 10 ],
			intervalLabels: [ '1', '2', '3', '4', '5', '6', '♭7' ],
			// mode: 7,
		},
		majorBlues: {
			intervals: [ 0, 2, 3, 4, 7, 9 ],
			intervalLabels: [ '1', '2', '♭3', '3', '5', '6' ],
			passingNotes: [ 3 ],
		},
		minorBlues: {
			intervals: [ 0, 3, 5, 6, 7, 10 ],
			intervalLabels: [ '1', '♭3', '4', '♭5', '5', '♭7' ],
			passingNotes: [ 6 ],
		},
		powerChord: {
			intervals: [ 0, 7 ],
			intervalLabels: [ '1', '5' ],
		},
		minorTwoChord: {
			// intervals: [ 0, 3, 7, 10 ],
			intervals: [ 2, 5, 9, 0 ],
			intervalLabels: [ '1', '♭3', '5', '♭7' ],
		},
		majorSixthChord: {
			intervals: [ 0, 4, 7, 9 ],
			intervalLabels: [ '1', '3', '5', '6' ],
		},
		// TODO rename to dominant diad
		diad_3_7: {
			intervals: [ 4, 10 ],
			intervalLabels: [ '3', '♭7' ],
			// mode: 7,
		},
	},
};

const ENHARMONIC_LABEL = {
	sharp: [ 'C', 'C♯', 'D', 'D♯', 'E', 'F', 'F♯', 'G', 'G♯', 'A', 'A♯', 'B' ],
	flat: [ 'C', 'D♭', 'D', 'E♭', 'E', 'F', 'G♭', 'G', 'A♭', 'A', 'B♭', 'B' ],
	// doubleFlat: [ 'D𝄫', 'D', 'E𝄫', 'F𝄫', 'Fb', 'G𝄫', 'G', 'A𝄫', 'A', 'B𝄫', 'B', 'C' ],
	// natural: [ 'C♮', 'D♭', 'D♮' ],
};

const patternRegex = /(\w+)(\.)(.*)/i;

// degree of scale is 0 to 7
function getIntervalString (degreeIndex, semitones) {
	const degree = String(degreeIndex + 1);

	if (semitones === 0 || degreeIndex === 0) {
		return degree;
	}

	const sign = (semitones === -2)
		? notation.doubleFlat
		: (semitones > 0)
			? notation.sharp
			: notation.flat;

	return sign.repeat(Math.abs(semitones)) + degree;
}

// TODO: cater for double flats.
const sign = label =>	label && label.includes('♭')
	? 'flat'
	: label && label.includes('♯')
		? 'sharp'
		: '';

const BLUES_INTERVAL = [
	'R',
	'♭2',
	'2',
	'♭3',
	'3',
	'4',
	'♭5',
	'5',
	'♭6',
	'6',
	'♭7',
	'7',
];

export const deriveNotes = ({
	keyRoot,
	patternId = null,
	degreeIndex = 0, // Degree of diatonic scale that mode is built upon.
}) => {
	if (patternId === null) {
		throw new Error('Missing patternId: ' + patternId);
	}

	// A number 0 to 11
	const rootNote = KEY_DEFINITION[keyRoot].note;

	const keySign = (KEY_DEFINITION[keyRoot].flat === true)
		? KEY_SIGN.FLAT
		: KEY_SIGN.SHARP;

	const twelveNoteDescription = ENHARMONIC_LABEL[keySign];
	const pattern = PATTERN_TYPE[patternId];

	if (!pattern) {
		throw new Error('Missing pattern: ' + patternId + ' ' + JSON.stringify(PATTERN_TYPE));
	}

	const patternMatch = pattern.match(patternRegex);
	const patternType = patternMatch[1];
	const patternNotes = PATTERN[patternType][patternMatch[3]];

	if (!patternNotes) {
		throw new Error('Missing pattern notes: ' + pattern + ' : ' + patternType + ' : ' + JSON.stringify(patternMatch));
	}

	const notes = notesFromPattern({
		degreeIndex,
		patternNotes,
		patternType,
		rootNote,
		twelveNoteDescription,
	});

	return {
		notes: new Map(
			notes.map(definition => ([ definition.note, definition ]))
		),
		// TODO: is this used?
		// degrees: new Map([
		// 	[ 0, {
		// 		note: 9,
		// 		intervalLabel: 'null',
		// 		noteLabel: 'null',
		// 	} ],
		// ]),
	};
};

function getModalNoteLabel (note, modeInterval, twelveNoteDescription, diatonic, intervalSemitone) {
	// TODO: cater for double flats and double sharps?

	// Check if note is in diatonic, if it is then use the diatonic note label as it will match its key signature.
	// TODO: should this also check if the scale is major?
	if (diatonic.includes(intervalSemitone)) {
		return twelveNoteDescription[note];
	}

	// If the note does not match a note in the diatonic scale then derive the label from its interval.
	// This logic does not explictly cater for naturals or double flats,
	// however a natural note assigned to flat will still find its natural note
	// within ENHARMONIC_LABEL.
	// This is probably an oversimplification which works at the moment, but may
	// be insufficient as functionality is added.
	const keySign = (sign(modeInterval) === 'sharp') ? 'sharp' : 'flat';

	return ENHARMONIC_LABEL[keySign][note];
}

function notesFromPattern ({
	degreeIndex,
	patternNotes,
	patternType,
	rootNote,
	twelveNoteDescription
}) {
	const diatonic = PATTERN.scale.diatonic; // [ 0, 2, 4, 5, 7, 9, 11 ]

	if (patternType === 'diatonic') {
		// N.B. degreeIndex provides the mode of the diatonic.
		// For II Dorian mode of C, this is D E F G A B C - 2, 4, 5, 7, 9, 11, 0
		const modeScale = (degreeIndex === 0)
			? diatonic
			: [
				...diatonic.slice(degreeIndex),
				...diatonic.slice(0, degreeIndex),
			];

		// Derive intervals from degreeIndex (which created modeScale) so that
		// a #4 or b5 is used correctly.
		// Calculate all the intervals for each degree of the
		// scale, not just those that will be used by the pattern.
		const intervals = modeScale.map((value, index, array) => {
			const intervalSemitone = (value - array[0] + 12) % 12;
			const diatonicSemitones = diatonic[index];
			const difference = intervalSemitone - diatonicSemitones; // -ve for flat, +ve for sharp.
			const intervalLabel = getIntervalString(index, difference);

			return {
				intervalLabel,
				intervalSemitone,
			};
		});

		const diatonicPattern = (Array.isArray(patternNotes))
			? patternNotes
			: patternNotes[degreeIndex];

		const notes = diatonicPattern
			.map(scaleDegree => {
				const {
					intervalLabel,
					intervalSemitone,
				} = intervals[scaleDegree];

				const note = (rootNote + modeScale[scaleDegree]) % 12; // number 0 - 11
				const noteLabel = twelveNoteDescription[note];

				return {
					note,										// Number [0 - 11]
					noteLabel,
					intervalLabel,					// Interval as a string.
					intervalSemitone,				// Interval as semitones.
					degree: scaleDegree,		// Number [0 - 7]
					sign: sign(noteLabel),	// TODO is this needed?
					type: patternType,

					...(note === rootNote && { keyRoot: true }),
					...(intervalSemitone === 0 && { scaleRoot: true }),
				};
			});

		return notes;
	} else if (patternType === 'modal') {
		// N.B. degreeIndex does NOT provide the mode.
		const modalRoot = (rootNote + diatonic[degreeIndex]) % 12;
		const {
			intervals: modalPattern,
			intervalLabels,
			passingNotes = null,
		} = patternNotes;

		const notes = modalPattern
			.map((modalNote, index) => ([
				modalNote,
				(modalNote + modalRoot) % 12,
				intervalLabels[index],
			]))
			.map(([ intervalSemitone, note, intervalLabel ]) => {
				const noteLabel = getModalNoteLabel(note, intervalLabel, twelveNoteDescription, diatonic, intervalSemitone);

				return {
					note,
					noteLabel,
					intervalLabel,
					intervalSemitone,
					sign: sign(noteLabel),
					type: patternType,

					// TODO, use only one interval system
					// TODO:
					// think about picking 1, 4, 5, and then
					// major or minor, and 1, 4, 5, & 1m, 4m, 5m, over 1 4 5
					// and minor blues
					// and what if it's modal not blues and needs sharps,
					// jazz?!
					// interval: bluesInterval({ modalNote, modalRoot, note }),
					bluesIntervalLabel: BLUES_INTERVAL[intervalSemitone],

					// TODO: use these to add css blues classes
					...(note === rootNote && { keyRoot: true }),
					...(intervalSemitone === 0 && { scaleRoot: true }),
					...(passingNotes?.includes(intervalSemitone) && { passingNote: true }),
				};
			});

		return notes;
	} else if (patternType === 'scale') {
		// Derive a set of notes from the key, each number
		// in the pattern being the index of one of the 12 notes available.

		// Scale. Number matches one of 12 notes.
		const modeScale = (degreeIndex === 0)
			? patternNotes
			: [
				...patternNotes.slice(degreeIndex),
				...patternNotes.slice(0, degreeIndex),
			];

		const notes = modeScale.map((modeNote, index, array) => {
			const note = (rootNote + modeNote) % 12;
			const noteLabel = twelveNoteDescription[note];
			const intervalSemitone = (modeNote - array[0] + 12) % 12;
			const difference = intervalSemitone - patternNotes[index]; // -ve for flat, +ve for sharp.
			const intervalLabel = getIntervalString(index, difference);

			return {
				intervalLabel,
				intervalSemitone,
				modeNote,
				note,
				noteLabel,
				degree: (index + degreeIndex) % array.length,
				sign: sign(noteLabel),
				type: patternType,
				...(note === rootNote && { keyRoot: true }),
				...(intervalSemitone === 0 && { scaleRoot: true }),
			};
		});

		return notes;
	}
}
