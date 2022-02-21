import { FRETBOARD_LEFT_PAD, FRET_WIDTH } from '../constants';

const fretMarkerPositions = [
	// 1  2  3  4  5  6  7  8  9  10 11 12 13 14 15 16 17 18 19 20 21 22 23 24
	0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1,
];

const adjustmentX = FRETBOARD_LEFT_PAD + (FRET_WIDTH / 2);

export default function Markers ({ frets, fretHeight }) {
	let previousFret = 0;
	const markers = frets.map(
		(fret, index) => {
			const markerX = adjustmentX + previousFret + ((fret - previousFret) / 2);

			previousFret = fret;

			return fretMarkerPositions[index] ? markerX : false;
		}
	);

	return (
		<g id="markers" className="fretboard__markers">
			{
				markers.map(
					(marker, index) => marker
						? <circle
							key={'marker' + index}
							cx={marker}
							cy={fretHeight}
							r="2"
							className="fretboard__marker"
						/>
						: ''
				)
			}
		</g>
	);
}
