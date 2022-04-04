export const FRET_TO_FRET_HORIZONTAL_OFFSET = 50;
export const FRET_WIDTH = 2;
export const FRETBOARD_LEFT_PAD = 30;
export const FRETBOARD_RIGHT_PAD = 20;
export const NUT_WIDTH = 4;
export const NUT_X = FRETBOARD_LEFT_PAD + FRET_WIDTH - NUT_WIDTH;
export const STRING_TO_EDGE_OF_FRETBOARD = 10;
export const STRING_TO_STRING_VERTICAL_OFFSET = 20;

export const FRET_MODE = Object.freeze({
	EVEN: 'EVEN',
	RULE_OF_EIGHTEEN: 'RULE_OF_EIGHTEEN',
});

export const KEY_SIGN = Object.freeze({
	FLAT: 'flat',
	SHARP: 'sharp',
});

export const KEY_SIGN_OPTIONS = [
	{ sign: KEY_SIGN.FLAT, label: 'Flat' },
	{ sign: KEY_SIGN.SHARP, label: 'Sharp' },
];

const DEGREE_LABEL = Object.freeze({
	0: 'I',
	1: 'II',
	2: 'III',
	3: 'IV',
	4: 'V',
	5: 'VI',
	6: 'VII',
});

export const degreeLabels = Object.values(DEGREE_LABEL);

export const PATTERN = Object.freeze({
	// diatonic
	DIATONIC: 'scale.diatonic',
	TRIAD: 'diatonic.triad',
	SEVENTH_CHORD: 'diatonic.seventhChord',
	PENTATONIC: 'diatonic.pentatonic',
	// blues
	DOMINANT_SEVENTH_CHORD: 'modal.dominantSeventhChord',
	MIXOLYDIAN: 'modal.mixolydian',
	MAJOR_BLUES: 'modal.majorBlues',
	MINOR_BLUES: 'modal.minorBlues',
	DIAD_3_7: 'modal.diad_3_7',
	// TODO: how to offer a subset of these options in UI?
	PENTATONIC_1: 'diatonic.pentatonic',
	/*
	If piano is rolling through 1, 4, 5
	need to mute interval options
	or mute pattern options
	*/
	// PENTATONIC_4: 'diatonic.pentatonic.4',
	// PENTATONIC_5: 'diatonic.pentatonic.5',
});

export const patternLabels = Object
	.entries(PATTERN)
	.map(([ pattern, label ]) => ({ pattern, label }));

export const STYLE_MODE_OPTIONS = Object.freeze({
	DIATONIC: {
		patternOptions: [
			{
				pattern: PATTERN.DIATONIC,
				patternId: 'DIATONIC',
				label: 'Diatonic scale',
			},
			{
				pattern: PATTERN.TRIAD,
				patternId: 'TRIAD',
				label: 'Triad',
			},
			{
				pattern: PATTERN.SEVENTH_CHORD,
				patternId: 'SEVENTH_CHORD',
				label: 'Seventh Chord',
			},
			{
				pattern: PATTERN.PENTATONIC,
				patternId: 'PENTATONIC',
				label: 'Pentatonic scale',
			},
		],
		degreeOptions: [
			{
				degree: 0,
				degreeLabel: DEGREE_LABEL[0],
				intervalLabel: null,
				noteLabel: null,
			 },
			 {
				degree: 1,
				degreeLabel: DEGREE_LABEL[1],
				intervalLabel: null,
				noteLabel: null,
			 },
			 {
				degree: 2,
				degreeLabel: DEGREE_LABEL[2],
				intervalLabel: null,
				noteLabel: null,
			 },
			 {
				degree: 3,
				degreeLabel: DEGREE_LABEL[3],
				intervalLabel: null,
				noteLabel: null,
			 },
			 {
				degree: 4,
				degreeLabel: DEGREE_LABEL[4],
				intervalLabel: null,
				noteLabel: null,
			 },
			 {
				degree: 5,
				degreeLabel: DEGREE_LABEL[5],
				intervalLabel: null,
				noteLabel: null,
			 },
			 {
				degree: 6,
				degreeLabel: DEGREE_LABEL[6],
				intervalLabel: null,
				noteLabel: null,
			 },
		],
	},
	BLUES: {
		patternOptions: [
			{
				pattern: PATTERN.TRIAD,
				patternId: 'TRIAD',
				label: 'Triad',
			},
			{
				pattern: PATTERN.DOMINANT_SEVENTH_CHORD,
				patternId: 'DOMINANT_SEVENTH_CHORD',
				label: 'Dominant 7 Chord',
			},
			{
				pattern: PATTERN.MIXOLYDIAN,
				patternId: 'MIXOLYDIAN',
				label: 'Mixolydian scale',
			},
			{
				pattern: PATTERN.MAJOR_BLUES,
				patternId: 'MAJOR_BLUES',
				label: 'Major Blues scale',
			},
			{
				pattern: PATTERN.MINOR_BLUES,
				patternId: 'MINOR_BLUES',
				label: 'Minor Blues scale',
			},
			{
				pattern: PATTERN.DIAD_3_7,
				patternId: 'DIAD_3_7',
				label: 'Diad: 3 & 7',
			},
		],
		degreeOptions: [
			{
				// 1
				degree: 0,
				degreeLabel: DEGREE_LABEL[0],
				intervalLabel: null,
				noteLabel: null,
			},
			// {
			// 	degree: 1,
			// 	degreeLabel: DEGREE_LABEL[1],
			// 	intervalLabel: null,
			// 	noteLabel: null,
			// },
			// {
			// 	degree: 2,
			// 	degreeLabel: DEGREE_LABEL[2],
			// 	intervalLabel: null,
			// 	noteLabel: null,
			// },
			{
				// 4
				degree: 3,
				degreeLabel: DEGREE_LABEL[3],
				intervalLabel: null,
				noteLabel: null,
			},
			{
				 // 5
				degree: 4,
				degreeLabel: DEGREE_LABEL[4],
				intervalLabel: null,
				noteLabel: null,
			},
			// {
			// 	degree: 5,
			// 	degreeLabel: DEGREE_LABEL[5],
			// 	intervalLabel: null,
			// 	noteLabel: null,
			// },
		],
	},
});


// TODO: replace open string pitches.
export const TUNING = Object.freeze({
	// Notes are listed low to high, then reversed.
	EADGBE: { label: 'Spanish', notes: [ 4, 9, 2, 7, 11, 4 ].reverse() },
	E_FLAT: { label: 'E flat', notes: [ 3, 8, 1, 6, 10, 3 ].reverse() },
	DADGAD: { label: 'DADGAD', notes: [ 2, 9, 2, 7, 9, 2 ].reverse() },
	DADGBD: { label: 'Double Drop D', notes: [ 2, 9, 2, 7, 11, 2 ].reverse() },
});

// Enum
export const KEY = Object.freeze({
	C: 'C',
	C_SHARP: 'C_SHARP',
	D_FLAT: 'D_FLAT',
	D: 'D',
	D_SHARP: 'D_SHARP', // has 2 double sharps.
	E_FLAT: 'E_FLAT',
	E: 'E',
	F: 'F',
	F_SHARP: 'F_SHARP',
	G_FLAT: 'G_FLAT', // Subsequently change B to C♭ to avoid having two Bs in the scale.
	G: 'G',
	G_SHARP: 'G_SHARP',
	A_FLAT: 'A_FLAT',
	A: 'A',
	A_SHARP: 'A_SHARP',
	B_FLAT: 'B_FLAT',
	B: 'B',
});

export const KEY_DEFINITION = {
	C: { label: 'C', note: 0 },
	C_SHARP: { label: 'C♯', note: 1, sharp: true },
	D_FLAT: { label: 'D♭', note: 1, flat: true },
	D: { label: 'D', note: 2 },
	D_SHARP: { label: 'D♯', note: 3, sharp: true },
	E_FLAT: { label: 'E♭', note: 3, flat: true },
	E: { label: 'E', note: 4 },
	F: { label: 'F', note: 5 },
	F_SHARP: { label: 'F♯', note: 6, sharp: true },
	G_FLAT: { label: 'G♭', note: 6, flat: true },
	G: { label: 'G', note: 7 },
	G_SHARP: { label: 'G♯', note: 8, sharp: true },
	A_FLAT: { label: 'A♭', note: 8, flat: true },
	A: { label: 'A', note: 9 },
	A_SHARP: { label: 'A♯', note: 10, sharp: true },
	B_FLAT: { label: 'B♭', note: 10, flat: true },
	B: { label: 'B', note: 11 },
};

const KEY_LIST = [
	KEY.C,
	KEY.C_SHARP,
	KEY.D_FLAT,
	KEY.D,
	// KEY.D_SHARP, has 2 double sharps.
	KEY.E_FLAT,
	KEY.E,
	KEY.F,
	KEY.F_SHARP,
	KEY.G_FLAT,
	KEY.G,
	KEY.G_SHARP,
	KEY.A_FLAT,
	KEY.A,
	KEY.A_SHARP,
	KEY.B_FLAT,
	KEY.B,
];

export const keySelectOptions = KEY_LIST.map(id => ({ id, label: KEY_DEFINITION[id].label }));
