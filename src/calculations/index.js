import {
	STRING_TO_STRING_VERTICAL_OFFSET,
} from '../constants';

export const getNotePositions = (note, nut, numberOfFrets) => {
	const octave = 12;
	const numberOfOctaves = Math.ceil(numberOfFrets / octave);

	// position will be in the range 0 to 11
	const position = (octave + note - nut) % octave;
	const positions = [];

	for (let index = 0; index <= numberOfOctaves; index++) {
		// E at nut = fret 0
		// F at 11 fret = fret 11 - 12th note
		// E at 12 fret = fret 12 - 13th note - octave
		const fret = position + (octave * index);

		if (fret <= numberOfFrets) {
			positions.push(fret);
		}
	}

	return positions;
};

export const nearestObjectNeighbour = (target, items, itemAttribute) => {
	const itemSortedByCloseness = items.sort(
		({ [itemAttribute]: a }, { [itemAttribute]: b }) => {
			const targetToA = Math.abs(a - target);
			const targetToB = Math.abs(b - target);
			const sort = (targetToA === targetToB)
				? 0
				: (targetToA < targetToB)
					? -1
					: 1;

			return sort;
		}
	);
	const nearestItem = itemSortedByCloseness[0];

	return nearestItem;
};

export const getChordFrets = ({
	chordShape,
	rootNote,
	tuning,
	numberOfFrets,
}) => {
	return chordShape.map(({ note: shapeNote, string }) => {
		const note = (shapeNote + rootNote) % 12;
		const y = string * STRING_TO_STRING_VERTICAL_OFFSET;
		const nut = tuning.notes[string];

		// frets could be plural, is this a problem?
		// positions will be wrong, unless note is correct
		const frets = getNotePositions(note, nut, numberOfFrets);

		return frets.map(fret => ({ fret,
		// x: calculateFretX(fret),
			y, note }));
	})
		.reverse()
		.reduce(
			(previousValue, currentValue, index) => {
				// For the first (lowest) string, return the first (left most) fret.
				// Also don’t bother picking the fret previous to the nearest if
				// there is only one to pick from.
				if (index === 0 || currentValue.length === 1) {
					return [
						...previousValue,
						currentValue[0],
					];
				}

				// Find nearest neighbour to previousPosition.
				const previousPosition = previousValue[ index - 1].fret;

				// Doesn't sort C6 very well, so generate a different E for each tuning.
				const nearestFret = nearestObjectNeighbour(previousPosition, currentValue, 'fret');

				return [
					...previousValue,
					nearestFret,
				];
			},
			[]
		);
};
