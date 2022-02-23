// ROOTS:
// 0   1   2   3   4   5   6   7   8   9   10  11
// C   C#  D   D#  E   F   F#  G   G#  A   A#  B
//     Db      Eb          Gb      Ab      Bb

// Circle of fifths:
// 6   5   4   3   2   1   0   1   2   3   4   5   6  // flats & sharps
// Gb  Db  Ab  Eb  Bb  F   C   G   D   A   E   B   F#
// =                       C                       =

// Ebm Bbm Fm  Cm  Gm  Dm  Am  Em  Bm  F#m C#m G#m D#m

const SCALE_PATTERN = {
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

export const ROOTS = {
	major: [
		{ note: 0, label: 'C', enharmonic: 'sharp' },
		{ note: 1, label: 'D♭', enharmonic: 'flat' },
		{ note: 2, label: 'D', enharmonic: 'sharp' },
		{ note: 3, label: 'E♭', enharmonic: 'flat' }, // D♯ would have 2 double sharps.
		{ note: 4, label: 'E', enharmonic: 'sharp' },
		{ note: 5, label: 'F', enharmonic: 'flat' },
		{ note: 6, label: 'G♭', enharmonic: 'flat' }, // Subsequently change B to C♭ to avoid having two Bs in the scale.
		{ note: 7, label: 'G', enharmonic: 'sharp' },
		{ note: 8, label: 'A♭', enharmonic: 'flat' },
		{ note: 9, label: 'A', enharmonic: 'sharp' },
		{ note: 10, label: 'B♭', enharmonic: 'flat' },
		{ note: 11, label: 'B', enharmonic: 'sharp' },
	],
	minor: [
		{ note: 0, label: 'C', enharmonic: 'flat' },
		{ note: 1, label: 'C♯', enharmonic: 'sharp' },
		{ note: 2, label: 'D', enharmonic: 'flat' },
		{ note: 3, label: 'E♭', enharmonic: 'flat' }, // Subsequently change B to C♭ to avoid having two Bs in the scale.
		{ note: 4, label: 'E', enharmonic: 'sharp' },
		{ note: 5, label: 'F', enharmonic: 'flat' },
		{ note: 6, label: 'F♯', enharmonic: 'sharp' },
		{ note: 7, label: 'G', enharmonic: 'flat' },
		{ note: 8, label: 'G♯', enharmonic: 'sharp' },
		{ note: 9, label: 'A', enharmonic: 'sharp' },
		{ note: 10, label: 'B♭', enharmonic: 'flat' },
		{ note: 11, label: 'B', enharmonic: 'sharp' },
	],
};

const sign = label =>	label.includes('♭')
	? 'flat'
	: label.includes('♯')
		? 'sharp'
		: '';

// TODO: probably should just generate a Look Up Table from this, and freeze it.
const scales = {
	major: ROOTS.major.map(scale => {
		const twelve = enharmonic[scale.enharmonic];
		const pattern = SCALE_PATTERN.MAJOR
			.map((note, degree) => ([ (scale.note + note) % 12, degree + 1 ]))
			.map(([ note, degree ]) => ({
				note,
				degree,
				label: twelve[note],
				sign: sign(twelve[note]),
			}));

		return pattern;
	}),
	minor: ROOTS.minor.map(scale => {
		const twelve = enharmonic[scale.enharmonic];
		const pattern = SCALE_PATTERN.MINOR
			.map((note, degree) => ([ (scale.note + note) % 12, degree + 1 ]))
			.map(([ note, degree ]) => ({
				note,
				degree,
				label: twelve[note],
				sign: sign(twelve[note]),
			}));

		return pattern;
	})
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
