import { NOTE } from '../../constants';

export const CHORD_SHAPE = {
	EADGBE: {
		C: [
			{ note: NOTE.E, string: 0, fret: 0 },
			{ note: NOTE.C, string: 1, fret: 1 },
			{ note: NOTE.G, string: 2, fret: 0 },
			{ note: NOTE.E, string: 3, fret: 2 },
			{ note: NOTE.C, string: 4, fret: 3 },
		],
		A: [
			{ note: NOTE.G, string: 0, fret: 3 }, // 5 },
			{ note: NOTE.E, string: 1, fret: 5 }, // 7 },
			{ note: NOTE.C, string: 2, fret: 5 }, // 7 },
			{ note: NOTE.G, string: 3, fret: 5 }, // 7 },
			{ note: NOTE.C, string: 4, fret: 3 }, // 5 },
		],
		G: [
			{ note: NOTE.C, string: 0, fret: 8 },
			{ note: NOTE.E, string: 1, fret: 5 },
			{ note: NOTE.C, string: 2, fret: 5 },
			{ note: NOTE.G, string: 3, fret: 5 },
			{ note: NOTE.E, string: 4, fret: 7 },
			{ note: NOTE.C, string: 5, fret: 8 },
		],
		E: [
			{ note: NOTE.C, string: 0, fret: 8 },
			{ note: NOTE.G, string: 1, fret: 8 },
			{ note: NOTE.E, string: 2, fret: 9 },
			{ note: NOTE.C, string: 3, fret: 10 },
			{ note: NOTE.G, string: 4, fret: 10 },
			{ note: NOTE.C, string: 5, fret: 8 }, // lowest string
		],
		D: [
			{ note: NOTE.E, string: 0, fret: 12 },
			{ note: NOTE.C, string: 1, fret: 13 },
			{ note: NOTE.G, string: 2, fret: 12 },
			{ note: NOTE.C, string: 3, fret: 10 },
		],
	}
};
