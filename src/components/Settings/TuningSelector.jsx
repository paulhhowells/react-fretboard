import React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import { TUNING } from '../../constants';

const tuningOptions = Object.entries(TUNING).map(
	([ tuningKey, { label } ]) => ({ tuningKey, label })
);

function TuningSelector ({ tuningKey, setTuningKey }) {
	function handleChange (_event, updatedTuningKey) {
		setTuningKey(updatedTuningKey);
	}

	return (
		<div className='tuning-selector'>
			<ToggleButtonGroup
				value={tuningKey}
				exclusive
				onChange={handleChange}
				aria-label="Tuning"
				size="small"
			>
				{
					tuningOptions.map(({ tuningKey, label }) => (
						<ToggleButton
							key={tuningKey}
							value={tuningKey}
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

export default TuningSelector;
