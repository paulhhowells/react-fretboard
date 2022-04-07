import { NOTE_LABELLING_OPTIONS } from '../constants';

const INTERVAL = NOTE_LABELLING_OPTIONS[1].key; // TODO refactor to be less fragile
const elementClassName = 'fretboard__note';

export default function Note ({ note, noteLabelling }) {
	const {
		degree,
		noteLabel,
		intervalLabel,
		sign,
		x,
		keyRoot,
		scaleRoot,
		passingNote,
	 } = note;
	const radius = (passingNote === true) ? 5 : 8; // TODO: move to constants
	const dy = (passingNote === true) ? '0.36em' : '0.33em'; // TODO use CSS instead?
	let className = elementClassName;

	const label = (noteLabelling === INTERVAL)
		? intervalLabel
		: noteLabel;

	if (sign.length > 0) {
		// Signal sharp or flat with a modifier.
		className += ` ${elementClassName}--${sign}`;
	}

	if (keyRoot) {
		// Signal it matches the key root.
		className += ` ${elementClassName}--key-root`;
	}

	if (scaleRoot) {
		// Signal it’s the root of the mode or chord.
		className += ` ${elementClassName}--scale-root`;
	}


	if (degree === 0) {
		// Signal it’s a root note.
		className += ` ${elementClassName}--root`;
	}

	if (passingNote === true) {
		className += ` ${elementClassName}--passing`;
	}

	return (
		<g transform={`translate(${ x })`} className={className}>
			<circle cx={-radius} cy="0" r={radius} />
			<text
				x={-radius}
				y="0"
				dy={dy}
				textAnchor="middle"
			>
				{ label }
			</text>
		</g>
	);
}
