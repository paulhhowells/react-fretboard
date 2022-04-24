import {
	STRING_TO_STRING_VERTICAL_OFFSET,
} from '../../constants';

export function getChordShapes ({
	chords,
	calculateFretX,
	rootNote,
	rootPositions,
}) {
	return Object.fromEntries(
		Object
			.entries(chords) // contains a set of chord shapes
			.map(
				([ chordShapeLabel, chordStrings ]) => {
					const shapeRootString = chordStrings[chordStrings.length - 1].string;
					const shapeRootFret = chordStrings[chordStrings.length - 1].fret;
					const rootNotePositions = rootPositions[shapeRootString][1];

					// Make a chord shape for each rootPosition.
					const frets = rootNotePositions.map(
						rootNotePosition => {
							return chordStrings.map(
								({
									note,
									string,
									fret,
								}) => {
									const newFret = rootNotePosition + fret - shapeRootFret;

									return {
										x: calculateFretX(newFret), // (fret + offset),

										// TODO precalculate?
										y: string * STRING_TO_STRING_VERTICAL_OFFSET,

										// The below are superfluous. Only x & y are needed.
										// But it's useful while developing to check these are correct.
										string,
										note: (note + rootNote) % 12,
										fret: newFret, // fret + offset,
									};
								}
							);
						}
					);

					return [
						chordShapeLabel,
						frets,
					];
				}
			)
	);
}
