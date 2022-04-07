import { useScaleNotes } from '../context/ScaleContext';
import NotesOnAString from './NotesOnAString';
import {
	FRETBOARD_LEFT_PAD,
	STRING_TO_STRING_VERTICAL_OFFSET,
	STRING_TO_EDGE_OF_FRETBOARD,
} from '../constants';

export default function Notes ({
	numberOfFrets,
	calculateFretX,
	tuning,
	noteLabelling,
}) {
	const notes = useScaleNotes();

	return (
		<g
			id="strings"
			transform={`translate(${ FRETBOARD_LEFT_PAD } ${ STRING_TO_EDGE_OF_FRETBOARD })`}
		>
			{
				tuning.notes.map(
					(openStringPitch, index) => (<NotesOnAString
						nut={openStringPitch}
						notes={notes}
						numberOfFrets={numberOfFrets}
						offsetY={index * STRING_TO_STRING_VERTICAL_OFFSET}
						key={openStringPitch + '-' + index}
						calculateFretX={calculateFretX}
						noteLabelling={noteLabelling}
					/>)
				)
			}
		</g>
	);
}
