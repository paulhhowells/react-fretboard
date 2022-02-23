import { FRETBOARD_LEFT_PAD, FRET_WIDTH } from '../constants';

const fretMarkerPositions = [
	// 1  2  3  4  5  6  7  8  9  10 11 12 13 14 15 16 17 18 19 20 21 22 23 24
	0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 2, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 2,
];

const adjustmentX = FRETBOARD_LEFT_PAD + (FRET_WIDTH / 2);

export default function Markers ({ frets, fretHeight }) {
	let previousFret = 0;
	const markers = frets.map(
		(fret, index) => {
			const markerX = adjustmentX + previousFret + ((fret - previousFret) / 2);
			const position = fretMarkerPositions[index];
			const marker = position > 0
				? {
					x: markerX,
					...(position === 2 && { octave: true })
				}
				: false;

			previousFret = fret;

			return marker;
		}
	);

	return (
		<g id="markers" className="fretboard__markers">
			{
				markers.map(
					(marker, index) => marker
						? marker.octave
							? (
								<g key={'marker' + index}>
									<circle
										cx={marker.x - 4}
										cy={fretHeight}
										r="2"
										className="fretboard__marker" />
									<circle
										cx={marker.x + 4}
										cy={fretHeight}
										r="2"
										className="fretboard__marker" />
								</g>
							)
							: (
								<circle
									key={'marker' + index}
									cx={marker.x}
									cy={fretHeight}
									r="2"
									className="fretboard__marker"
								/>
							)
						: ''
				)
			}
		</g>
	);
}
