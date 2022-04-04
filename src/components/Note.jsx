const elementClassName = 'fretboard__note';

export default function Note ({ note }) {
	const { degree, noteLabel, sign, x, keyRoot, scaleRoot } = note;
	const radius = 8;
	let className = elementClassName;

	// TODO: intervalLabel
	const label = noteLabel;

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

	return (
		<g transform={`translate(${ x })`} className={className}>
			<circle cx={-radius} cy="0" r={radius} />
			<text
				x={-radius}
				y="0"
				dy="0.33em"
				textAnchor="middle"
			>
				{ label }
			</text>
		</g>
	);
}
