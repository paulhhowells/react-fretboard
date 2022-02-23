const elementClassName = 'fretboard__note';

export default function Note ({ note }) {
	const { label, x, sign } = note;
	const radius = 8;
	const className = elementClassName + (
		(sign.length > 0)
			? ` ${elementClassName}--${sign}`
			: ''
	);

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
