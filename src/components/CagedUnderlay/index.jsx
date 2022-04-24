import { useScaleNotes } from '../../context/ScaleContext';
import {
	FRETBOARD_LEFT_PAD,
	STRING_TO_EDGE_OF_FRETBOARD,
	NOTE_RADIUS,
} from '../../constants';
import {	getNotePositions } from '../../calculations';
import {	CHORD_SHAPE } from './constants';
import {	getChordShapes } from './shapes';

export default function CagedUnderlay ({
	calculateFretX,
	numberOfFrets,
	tuning,
}) {
	const { rootNote } = useScaleNotes();
	const tuningChordShapes = CHORD_SHAPE[tuning.id];

	if (!tuningChordShapes) {
		return null;
	}

	// List the positions on each string
	// where the rootNote may be found.
	const rootPositions = tuning.notes.map((string, index) => ([
		tuning.noteLabels[index],
		getNotePositions(rootNote, string, numberOfFrets)
	]));

	const chordShapes = getChordShapes({
		chords: tuningChordShapes,
		calculateFretX,
		rootNote,
		rootPositions,
	});

	// TODO refactor x y into above?
	const lines = Object.entries(chordShapes).map(([ chordId, chords ], index) => ({
		chordId,
		chords: chords.map(
			chord => chord.map(({ x, y }) => (x + ', ' + y)).join(' ')
		),
		stroke: '#777' + (2 + (1 * index)).toString(16),
	}));

	return (
		<g
			id="cagedUnderlay"
			transform={`translate(${ FRETBOARD_LEFT_PAD - NOTE_RADIUS } ${ STRING_TO_EDGE_OF_FRETBOARD })`}
			strokeWidth="20"
			fill="none"
			strokeLinejoin="round"
			strokeLinecap="round"
		>
			{
				lines.map(
					({ chords, stroke, chordId }) => {
						return chords.map(
							(points, index) => (
								<polyline
									key={chordId + index}
									points={points}
									stroke={stroke}
								/>
							)
						);
					}
				)
			}
		</g>
	);
}
