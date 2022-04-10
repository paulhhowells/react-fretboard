import {
	FRETBOARD_LEFT_PAD,
	FRET_WIDTH,
} from '../../constants';

export default function Frets ({ frets, fretHeight }) {
	return (
		<g
			id="frets"
			className="fretboard__frets"
			transform={`translate(${ FRETBOARD_LEFT_PAD })`}
		>
			{
				frets.map((x, index) => (
					<rect
						key={'fret-' + index}
						x={x}
						y="0"
						width={FRET_WIDTH}
						height={fretHeight} className="fretboard__fret"
					/>
				))
			}
		</g>
	);
}
