export const FRET_TO_FRET_HORIZONTAL_OFFSET = 50;
export const FRET_WIDTH = 2;
export const FRETBOARD_LEFT_PAD = 30;
export const FRETBOARD_RIGHT_PAD = 20;
export const NUT_WIDTH = 4;
export const NUT_X = FRETBOARD_LEFT_PAD + FRET_WIDTH - NUT_WIDTH;
export const STRING_TO_EDGE_OF_FRETBOARD = 20;
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
