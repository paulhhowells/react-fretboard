import Nut from './Nut';
import Frets from './Frets';
import Strings from './Strings';
import Markers from './Markers';

import './fretboard.css';

export default function Fretboard ({
	fretboardWidth,
	fretboardHeight,
	numberOfFrets,
	numberOfStrings,
	calculateFretX,
}) {
	const fretHeight = fretboardHeight;
	let frets = Array(numberOfFrets).fill(null);

	frets = frets.map((_, position) => calculateFretX(position));

	return (
		<g id="fretboard" className="fretboard">
			<rect
				x="0" y="0"
				width={fretboardWidth} height={fretboardHeight}
				className="fretboard__blank"
			/>
			<Frets frets={frets} fretHeight={fretHeight}/>
			<Nut fretboardHeight={fretboardHeight} />
			<Strings fretboardWidth={fretboardWidth} numberOfStrings={numberOfStrings} />
			<Markers frets={frets} fretHeight={fretHeight} />
		</g>
	);
}
