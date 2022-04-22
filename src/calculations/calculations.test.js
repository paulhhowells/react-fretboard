import {
	getNotePositions,
	nearestObjectNeighbour,
} from './index';

test('getNotePositions', () => {
	// E on D string
	expect(getNotePositions(4, 2, 17)).toEqual([ 2, 14 ]);

	// E on E string:
	// 10 frets
	expect(getNotePositions(4, 4, 10)).toEqual([ 0 ]);
	// 17 frets
	expect(getNotePositions(4, 4, 17)).toEqual([ 0, 12 ]);
	// 24 frets
	expect(getNotePositions(4, 4, 24)).toEqual([ 0, 12, 24 ]);

	// D on E string:
	// 12 frets
	expect(getNotePositions(2, 4, 12)).toEqual([ 10 ]);
	// 17 frets
	expect(getNotePositions(2, 4, 17)).toEqual([ 10 ]);
	// 24 frets
	expect(getNotePositions(2, 4, 24)).toEqual([ 10, 22 ]);

	// D on E string:
	// 9 frets
	expect(getNotePositions(2, 4, 9)).toEqual([]);
	// 24 frets
	expect(getNotePositions(2, 4, 24)).toEqual([ 10, 22 ]);

	// G on E string
	expect(getNotePositions(7, 4, 17)).toEqual([ 3, 15 ]);

	// A on E string
	expect(getNotePositions(9, 4, 17)).toEqual([ 5, 17 ]);

	// C on E string
	expect(getNotePositions(0, 4, 12)).toEqual([ 8 ]);
	expect(getNotePositions(0, 4, 22)).toEqual([ 8, 20 ]);
});

describe('nearestObjectNeighbour', () => {
	const cases = [
		[
			7,
			[
				{ x: 1 },
				{ x: 12 },
			],
			'x',
			{ x: 12 }
		],
		[
			6,
			[
				{ y: 1 },
				{ y: 12 },
			],
			'y',
			{ y: 1 }
		]
	];

	test.each(cases)(
		'given %d, %j, and %s as arguments, returns %p',
		(target, items, itemAttribute, expected) => {
			expect(nearestObjectNeighbour(target, items, itemAttribute)).toEqual(expected);
		},
	);
});
