import {
	NUT_WIDTH,
	NUT_X,
} from '../constants';

export default function Nut ({ fretboardHeight }) {
	return (
		<rect
			x={NUT_X}
			y="0"
			width={NUT_WIDTH}
			height={fretboardHeight} className="fretboard__nut"
		/>
	);
}
