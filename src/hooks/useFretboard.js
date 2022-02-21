import React from 'react';

import {
	FRET_TO_FRET_HORIZONTAL_OFFSET,
	FRETBOARD_LEFT_PAD,
	FRETBOARD_RIGHT_PAD,
	STRING_TO_STRING_VERTICAL_OFFSET,
	STRING_TO_EDGE_OF_FRETBOARD,
	FRET_MODE,
} from '../constants';

export const useFretboard = ({
	fretMode,
	numberOfFrets,
	numberOfStrings,
}) => {
	// Calculate fret positions using the Rule Of Eighteen in case they are needed.
	const ruleOfEighteen = React.useMemo(() => deriveRuleOfEighteenFretPositions(numberOfFrets), [ numberOfFrets ]);

	const calculateFretX = React.useCallback(
		position => {
			if (fretMode === FRET_MODE.RULE_OF_EIGHTEEN) {
				return ruleOfEighteen[position];
			} else {
				return position * FRET_TO_FRET_HORIZONTAL_OFFSET;
			}
		},
		[ fretMode, ruleOfEighteen ]
	);

	const { fretboardHeight, fretboardWidth } = React.useMemo(
		() => {
			const fretboardHeight = (STRING_TO_EDGE_OF_FRETBOARD * 2) + (STRING_TO_STRING_VERTICAL_OFFSET * (numberOfStrings - 1));
			const fretboardPadding = FRETBOARD_LEFT_PAD + FRETBOARD_RIGHT_PAD;
			const fretboardWidth = Math.ceil(
				(fretMode === FRET_MODE.RULE_OF_EIGHTEEN)
					? fretboardPadding + ruleOfEighteen[ruleOfEighteen.length - 1]
					: fretboardPadding + (numberOfFrets * FRET_TO_FRET_HORIZONTAL_OFFSET)
			);

			return { fretboardWidth, fretboardHeight };
		},
		[ fretMode, numberOfFrets, numberOfStrings, ruleOfEighteen ]
	);

	return { fretboardHeight, fretboardWidth, calculateFretX };
};

function deriveRuleOfEighteenFretPositions (numberOfFrets) {
	const denominator = 18;
	let remainder = FRET_TO_FRET_HORIZONTAL_OFFSET * denominator;
	const fretToFretDistances = Array.from(
		{ length: numberOfFrets },
		()=> {
			const fret = remainder / denominator;

			remainder -= fret;

			return fret;
		}
	);

	let fretPosition = 0;
	const ruleOfEighteen = Array.from(
		[ 0, ...fretToFretDistances ],
		distance => fretPosition = fretPosition + distance
	);

	return ruleOfEighteen;
};
