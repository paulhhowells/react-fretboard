import {
	KEY_DEFINITION,
	KEY_SIGN,
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

		// TODO use I II III IV keys
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
	// Modal: Number matches one of 12 notes.
	modal: {
		dominantSeventhChord: [ 0, 4, 7, 10 ],
		mixolydian: [ 0, 2, 4, 5, 7, 9, 10 ],
		majorBlues: [ 0, 2, 3, 4, 7, 9 ],
		minorBlues: [ 0, 3, 5, 6, 7, 10 ],
		diad_3_7: [ 4, 10 ],
	}
};

const ENHARMONIC = {
	sharp: [ 'C', 'C♯', 'D', 'D♯', 'E', 'F', 'F♯', 'G', 'G♯', 'A', 'A♯', 'B' ],
	flat: [ 'C', 'D♭', 'D', 'E♭', 'E', 'F', 'G♭', 'G', 'A♭', 'A', 'B♭', 'B' ],
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
	pattern,
	degreeIndex = 0, // Degree of diatonic scale that mode is built upon.
}) => {
	// A number 0 to 11
	const rootNote = KEY_DEFINITION[keyRoot].note;

	const keySign = (KEY_DEFINITION[keyRoot].flat === true)
		? KEY_SIGN.FLAT
		: KEY_SIGN.SHARP;

	const twelveNoteDescription = ENHARMONIC[keySign];

	const patternMatch = pattern.match(patternRegex);
	const patternType = patternMatch[1];
	const patternNotes = PATTERN[patternType][patternMatch[3]];

	if (!patternNotes) {
		throw new Error('Missing pattern: ' + pattern);
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

function notesFromPattern ({
	degreeIndex,
	patternNotes,
	patternType,
	rootNote,
	twelveNoteDescription
}) {
	const diatonic = PATTERN.scale.diatonic; // [ 0, 2, 4, 5, 7, 9, 11

	if (patternType === 'diatonic') {
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
			const intervalSemitones = (value - array[0] + 12) % 12;
			const diatonicSemitones = diatonic[index];
			const difference = intervalSemitones - diatonicSemitones; // -ve for flat, +ve for sharp.
			const label = getIntervalString(index, difference);

			return {
				label,
				semitones: intervalSemitones,
			};
		});

		const diatonicPattern = (Array.isArray(patternNotes))
			? patternNotes
			: patternNotes[degreeIndex];

		const notes = diatonicPattern
			.map(scaleDegree => {
				const {
					label: intervalLabel,
					semitones,
				} = intervals[scaleDegree];

				const note = (rootNote + modeScale[scaleDegree]) % 12; // number 0 - 11
				const noteLabel = twelveNoteDescription[note];

				return {
					note,										// Number [0 - 11]
					noteLabel,
					intervalLabel,					// Interval as a string.
					semitones,							// Interval as semitones.
					degree: scaleDegree,		// Number [0 - 7]
					sign: sign(noteLabel),	// TODO is this needed?
					type: patternType,

					...(note === rootNote && { keyRoot: true }),
				};
			});

		return notes;
	} else if (patternType === 'modal') {
		const modalRoot = (rootNote + diatonic[degreeIndex]) % 12;

		// TODO: LUT for all intervals?

		const modalPattern = (Array.isArray(patternNotes))
			? patternNotes
			: patternNotes[degreeIndex];

		const notes = modalPattern
			.map(modalNote => ([
				modalNote,
				(modalNote + modalRoot) % 12,
			]))
			.map(([ modalNote, note ]) => ({
				note,
				noteLabel: twelveNoteDescription[note],
				sign: sign(twelveNoteDescription[note]),
				type: patternType,

				// TODO:
				// think about picking 1, 4, 5, and then
				// major or minor, and 1, 4, 5, & 1m, 4m, 5m, over 1 4 5
				// and minor blues
				// and what if it's modal not blues and needs sharps,
				// jazz?!
				// interval: bluesInterval({ modalNote, modalRoot, note }),
				interval: BLUES_INTERVAL[modalNote],

				// TODO: use these to add css blues classes
				...(note === rootNote && { keyRoot: true }),
				...(modalNote === 0 && { scaleRoot: true }),
			}));

		return notes;
	} else if (patternType === 'scale') {
		// Derive a set of notes from the key, each number
		// in the pattern being the index of one of the 12 notes available.

		// TODO: check, does degreeIndex work?

		const scale = (degreeIndex === 0)
			? patternNotes
			: [
				...patternNotes.slice(degreeIndex),
				...patternNotes.slice(0, degreeIndex),
			];

		const notes = scale
			.map(note => ((rootNote + note) % 12))
			.map((note, index) => ({
				note,
				noteLabel: twelveNoteDescription[note],
				degree: (index + degreeIndex) % scale.length,
				sign: sign(twelveNoteDescription[note]),
				type: patternType,
			}));

		return notes;
	}
}
