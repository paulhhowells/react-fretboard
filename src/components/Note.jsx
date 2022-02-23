const elementClassName = 'fretboard__note';

export default function Note ({ note }) {
	const { degree, label, sign, x } = note;
	const radius = 8;
	let className = elementClassName;

	if (sign.length > 0) {
		// Signal sharp or flat with a modifier.
		className += ` ${elementClassName}--${sign}`;
	}

	if (degree === 1) {
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
