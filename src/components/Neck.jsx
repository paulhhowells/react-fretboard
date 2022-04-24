import { useSettingsContext } from '../context/SettingsContext';
import { useFretboard } from '../hooks';
import Notes from './Notes';
import Fretboard from './Fretboard';
import CagedUnderlay from './CagedUnderlay';

export default function Neck () {
	// numberOfFrets includes the nut as fret 0, so for 1 nut + 24 frets use 25.
	const {
		fretSpacing,
		isCagedVisible,
		noteLabelling,
		numberOfFrets,
		numberOfStrings,
		tuning,
	} = useSettingsContext();

	const { fretboardHeight, fretboardWidth, calculateFretX } = useFretboard({ fretSpacing, numberOfFrets, numberOfStrings });

	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox={'0 0 ' + fretboardWidth + ' ' + fretboardHeight}
			style={{ width: fretboardWidth * 2, height: 'auto', margin: '1rem' }}
		>
			<Fretboard
				calculateFretX={calculateFretX}
				fretboardHeight={fretboardHeight}
				fretboardWidth={fretboardWidth}
				numberOfFrets={numberOfFrets}
				numberOfStrings={numberOfStrings}
				tuning={tuning}
			/>
			{
				isCagedVisible
					? (
						<CagedUnderlay
							calculateFretX={calculateFretX}
							fretboardHeight={fretboardHeight}
							fretboardWidth={fretboardWidth}
							numberOfFrets={numberOfFrets}
							numberOfStrings={numberOfStrings}
							tuning={tuning}
						/>
					)
					: null
			}
			<Notes
				numberOfFrets={numberOfFrets}
				calculateFretX={calculateFretX}
				tuning={tuning}
				noteLabelling={noteLabelling}
			/>
		</svg>
	);
}
