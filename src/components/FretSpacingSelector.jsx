import React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import { FRET_SPACING } from '../constants';

const fretSpacingOptions = [
	{ key: FRET_SPACING.EVEN, label: 'Even' },
	{ key: FRET_SPACING.RULE_OF_EIGHTEEN, label: 'Diminishing' },
];

function FretSpacingSelector ({ fretSpacing
	, setFretSpacing }) {
	function handleChange (_event, updatedFretSpacing
	) {
		setFretSpacing(updatedFretSpacing);
	}

	return (
		<div className='style-mode-selector'>
			<ToggleButtonGroup
				value={fretSpacing}
				exclusive
				onChange={handleChange}
				aria-label="Fret Mode"
				size="small"
			>
				{
					fretSpacingOptions.map(({ key, label }) => (
						<ToggleButton
							key={key}
							value={key}
							aria-label={label}
						>
							{ label}
						</ToggleButton>
					))
				}
			</ToggleButtonGroup>
		</div>
	);
}

export default FretSpacingSelector;
