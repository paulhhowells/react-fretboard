import {
	FRETBOARD_LEFT_PAD,
	NUT_WIDTH,
	NUT_X,
	STRING_TO_EDGE_OF_FRETBOARD,
	STRING_TO_STRING_VERTICAL_OFFSET,
} from '../constants';

export default function Nut ({ fretboardHeight, tuning }) {
	return (
		<g>
			<rect
				x={NUT_X}
				y="0"
				width={NUT_WIDTH}
				height={fretboardHeight} className="fretboard__nut"
			/>
			<g
				className="fretboard__nut-notes"
				transform={`translate(${ FRETBOARD_LEFT_PAD } ${ STRING_TO_EDGE_OF_FRETBOARD })`}
			>
				{
					tuning.noteLabels.map((noteLabel, index) => (
						<text
							x={-8}
							y={index * STRING_TO_STRING_VERTICAL_OFFSET}
							dy="0.33em"
							textAnchor="middle"
							key={noteLabel + index}
						>
							{ noteLabel }
						</text>
					))
				}
			</g>
		</g>
	);
}
