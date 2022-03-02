// ROOTS:
// 0   1   2   3   4   5   6   7   8   9   10  11
// C   C#  D   D#  E   F   F#  G   G#  A   A#  B
//     Db      Eb          Gb      Ab      Bb

// Circle of fifths:
// 6   5   4   3   2   1   0   1   2   3   4   5   6  // flats & sharps
// Gb  Db  Ab  Eb  Bb  F   C   G   D   A   E   B   F#
// =                       C                       =

// Ebm Bbm Fm  Cm  Gm  Dm  Am  Em  Bm  F#m C#m G#m D#m

const SCALE_BASIS = {
	MAJOR: [ 0, 2, 4, 5, 7, 9, 11 ],
	MINOR: [ 0, 2, 3, 5, 7,	8, 10	],
	HARMONIC_MINOR: [ 0, 2, 3, 5, 7, 8, 11 ],
	ASCENDING_MELODIC_MINOR: [ 0, 2, 3, 5, 7,	9, 11 ],
	DESCENDING_MELODIC_MINOR: [ 0, 2, 3, 5, 7, 8, 10	],
};

const enharmonic = {
	sharp: [ 'C', 'C♯', 'D', 'D♯', 'E', 'F', 'F♯', 'G', 'G♯', 'A', 'A♯', 'B' ],
	flat: [ 'C', 'D♭', 'D', 'E♭', 'E', 'F', 'G♭', 'G', 'A♭', 'A', 'B♭', 'B' ],
};
const keySignatureSign = {
	B: 'sharp', // B 5
	E: 'sharp', // E 4
	A: 'sharp', // A 3
	D: 'sharp', // D 2
	G: 'sharp', // G 1
	C: 'sharp', // C 0
	F: 'flat',  // F 1
	'B♭': 'flat', // B♭ 2
	'E♭': 'flat', // E♭ 3
	'A♭': 'flat', // A♭ 4
	'D♭': 'flat', // D♭ 5
};
const defaultLabel = [
	'C',
	'D♭',
	'D',
	'E♭',
	'E',
	'F',
	null,
	'G',
	'A♭',
	'A',
	'B♭',
	'B',
	'C',
];

// Use to offer choices in UI according to sign sharp / flat.
export const ROOTS = {
	flat: [
		{ note: 0, label: 'C', sign: 'sharp' },
		{ note: 1, label: 'D♭', sign: 'flat' },
		{ note: 2, label: 'D', sign: 'sharp' },
		{ note: 3, label: 'E♭', sign: 'flat' }, // D♯ would have 2 double sharps.
		{ note: 4, label: 'E', sign: 'sharp' },
		{ note: 5, label: 'F', sign: 'flat' },
		{ note: 6, label: 'G♭', sign: 'flat' }, // Subsequently change B to C♭ to avoid having two Bs in the scale.
		{ note: 7, label: 'G', sign: 'sharp' },
		{ note: 8, label: 'A♭', sign: 'flat' },
		{ note: 9, label: 'A', sign: 'sharp' },
		{ note: 10, label: 'B♭', sign: 'flat' },
		{ note: 11, label: 'B', sign: 'sharp' },
	],
	sharp: [
		{ note: 0, label: 'C', sign: 'sharp' },
		{ note: 1, label: 'C♯', sign: 'sharp' },
		{ note: 2, label: 'D', sign: 'sharp' },
		{ note: 3, label: 'E♭', sign: 'flat' }, // D♯ would have 2 double sharps.
		{ note: 4, label: 'E', sign: 'sharp' },
		{ note: 5, label: 'F', sign: 'flat' },
		{ note: 6, label: 'F♯', sign: 'sharp' }, // Fix
		{ note: 7, label: 'G', sign: 'sharp' },
		{ note: 8, label: 'G♯', sign: 'sharp' },
		{ note: 9, label: 'A', sign: 'sharp' },
		{ note: 10, label: 'A♯', sign: 'sharp' },
		{ note: 11, label: 'B', sign: 'sharp' },
	],
};

const PATTERNS = {
	scale: {
		//					1  2  3  4  5  6  7
		diatonic: [ 0, 2, 4, 5, 7, 9, 11 ],
		mixolydian: [ 0, 2, 4, 5, 7, 9, 10 ],
		pentatonic: [ 0, 2, 4, 7, 9 ],
		majorBlues: [ 0, 2, 3, 4, 7, 9 ],
		minorBlues: [ 0, 3, 5, 6, 7, 10 ],
	},
	diatonic: {
		triad: [ 0, 2, 4 ],
		seventhChord: [ 0, 2, 4, 6 ],
		pentatonic: [ 0, 1, 2, 4, 5 ],
	},
};

const PATTERN = {
	'scale.diatonic': PATTERNS.scale.diatonic,
	'scale.mixolydian': PATTERNS.scale.mixolydian,
	'scale.pentatonic': PATTERNS.scale.pentatonic,
	'scale.majorBlues': PATTERNS.scale.majorBlues,
	'scale.minorBlues': PATTERNS.scale.minorBlues,

	'diatonic.triad': PATTERNS.diatonic.triad,
	'diatonic.seventhChord': PATTERNS.diatonic.seventhChord,
	'diatonic.pentatonic': PATTERNS.diatonic.pentatonic,
};

const sign = label =>	label && label.includes('♭')
	? 'flat'
	: label && label.includes('♯')
		? 'sharp'
		: '';

// TODO: rename
// will rootnote be a number or an object?
export const deriveNotes = ({
	rootNote, // 0 to 11
	keySign, // sharp or flat
	// scaleBasisId = 'MAJOR',
	pattern,
	degree = 0
}) => {
	console.log('deriveNotes pattern', pattern);

	// Get 12 notes, either sharp or flat according to sign.
	// e.g. [ 'C', 'C♯', 'D', 'D♯', 'E', 'F', 'F♯', 'G', 'G♯', 'A', 'A♯', 'B' ],
	const derivedSign = keySignatureSign[defaultLabel[rootNote]] || keySign;
	let twelve = enharmonic[derivedSign];

	// Then derive a scale of 7 notes, or a cluster from a scale.
	// Scales only need to jump through the 12.
	// pattern === scale.minorBlues
	// diatonic.pentatonic
	const regex = /(\w+)(\.)(.*)/i;
	const match = pattern.match(regex);

	let notes = [];

	console.log('match', match);

	if (match[1] === 'diatonic') {
		const diatonic = PATTERNS.scale.diatonic; // [ 0, 2, 4, 5, 7, 9, 11

		const scale = (degree === 0)
			? diatonic
			: [
				...diatonic.slice(degree),
				...diatonic.slice(0, degree),
			];

		const sevenNotes = scale
			.map(note => ((rootNote + note) % 12))
			.map((note, index) => ({
				note,
				label: twelve[note],
				degree: (index + degree) % scale.length,
				sign: sign(twelve[note]),
			}));

		notes = PATTERN[pattern].map(degree => sevenNotes[degree]);
		//
	} else if (match[1] === 'scale') {
		// const scale = PATTERN[match[0]]; // === PATTERNS.scale[match[3]]
		const scale = (degree === 0)
			? PATTERN[pattern]
			: [
				...PATTERN[pattern].slice(degree),
				...PATTERN[pattern].slice(0, degree),
			];

		notes = scale
			.map(note => ((rootNote + note) % 12))
			.map((note, index) => ({
				note,
				label: twelve[note],
				degree: (index + degree) % scale.length,
				sign: sign(twelve[note]),
			}));
	}

	console.log('notes', notes);

	return new Map(notes.map(
		({
			note, label, sign, degree
		}) => ([
			note,
			{ note, label, sign, degree }
		])
	));
};

// For G♭ /E♭m hack B to C♭ to avoid having two Bs in the scale.
// If F♯ / D♯m enharmonics were used then F would need to become E♯.
if (scales.major[6][0].label === 'G♭') {
	scales.major[6][3].label = 'C♭';
} else if (scales.major[6][0].label === 'F♯') {
	scales.major[6][6].label = 'E♯';
}

if (scales.minor[3][0].label === 'E♭') {
	scales.minor[3][5].label = 'C♭';
} else if (scales.minor[3][0].label === 'D♯') {
	scales.minor[3][1].label = 'E♯';
}

const SCALES = Object.freeze(scales);

export default SCALES;
