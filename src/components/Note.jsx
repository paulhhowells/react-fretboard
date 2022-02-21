export default function Note ({ note }) {
	const { label, x } = note;
	const radius = 8;

	return (
		<g transform={`translate(${ x })`} className="fretboard__note">
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
