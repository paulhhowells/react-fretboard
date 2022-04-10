import {
	FRETBOARD_LEFT_PAD,
	STRING_TO_STRING_VERTICAL_OFFSET,
	STRING_TO_EDGE_OF_FRETBOARD,
} from '../../constants';

export default function Strings ({ fretboardWidth, numberOfStrings }) {
	const stringWidth = fretboardWidth - FRETBOARD_LEFT_PAD;
	const strings = [ ...Array(numberOfStrings).keys() ];

	// Narrow string: 0.5 -> Wider sixth string: 2
	const narrowString = 0.5;
	const wideString = 2;
	const stringHeightMultiplier = (wideString - narrowString) / (numberOfStrings - 1);

	return (
		<g id="strings" className="fretboard__strings">
			{
				strings.map(index =>
					(
						<rect
							key={'string_' + index}
							x={FRETBOARD_LEFT_PAD}
							y={(index * STRING_TO_STRING_VERTICAL_OFFSET) + STRING_TO_EDGE_OF_FRETBOARD}
							height={narrowString + (index * stringHeightMultiplier)}
							width={stringWidth}
							className="fretboard__string"
						/>
					)
				)
			}
		</g>
	);
}
