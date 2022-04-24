import React from 'react';

import {
	FRET_TO_FRET_HORIZONTAL_OFFSET,
	FRETBOARD_LEFT_PAD,
	FRETBOARD_RIGHT_PAD,
	STRING_TO_STRING_VERTICAL_OFFSET,
	STRING_TO_EDGE_OF_FRETBOARD,
	FRET_SPACING,
} from '../constants';

export const useFretboard = ({
	fretSpacing,
	numberOfFrets,
	numberOfStrings,
}) => {
	// Calculate fret positions using the Rule Of Eighteen in case they are needed.
	// Add on a safety margin for chord shapes whose root notes start on
	// a fret that is <= numberOfFrets but whose other notes are on frets
	// that are greater than the numberOfFrets.
	// 12 is clearly more than is needed but this is very cheap so
	// save time finding the smallest number.
	const chordShapeMargin = 12;
	const ruleOfEighteen = React.useMemo(() => deriveRuleOfEighteenFretPositions(numberOfFrets + chordShapeMargin), [ numberOfFrets ]);

	const calculateFretX = React.useCallback(
		position => {
			// TODO simplify
			if (fretSpacing === FRET_SPACING.RULE_OF_EIGHTEEN) {
				return (position >= 0) ? ruleOfEighteen[position] : position * FRET_TO_FRET_HORIZONTAL_OFFSET;
			} else {
				return position * FRET_TO_FRET_HORIZONTAL_OFFSET;
			}
		},
		[ fretSpacing, ruleOfEighteen ]
	);

	const { fretboardHeight, fretboardWidth } = React.useMemo(
		() => {
			const fretboardHeight = (STRING_TO_EDGE_OF_FRETBOARD * 2) + (STRING_TO_STRING_VERTICAL_OFFSET * (numberOfStrings - 1));
			const fretboardPadding = FRETBOARD_LEFT_PAD + FRETBOARD_RIGHT_PAD;
			const fretboardWidth = Math.ceil(
				(fretSpacing === FRET_SPACING.RULE_OF_EIGHTEEN)
					? fretboardPadding + ruleOfEighteen[ruleOfEighteen.length - (chordShapeMargin + 2)]
					: fretboardPadding + (numberOfFrets * FRET_TO_FRET_HORIZONTAL_OFFSET)
			);

			return { fretboardWidth, fretboardHeight };
		},
		[ fretSpacing, numberOfFrets, numberOfStrings, ruleOfEighteen ]
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
