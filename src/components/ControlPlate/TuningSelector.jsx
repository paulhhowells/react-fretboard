import React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import { TUNING } from '../../constants';

const tuningOptions = Object.entries(TUNING).map(
	([ key, { label } ]) => ({ key, label })
);

function TuningSelector ({ tuning, setTuning }) {
	function handleChange (_event, tuningKey) {
		setTuning(TUNING[tuningKey]);
	}

	return (
		<div className='style-mode-selector'>
			<ToggleButtonGroup
				value={tuning}
				exclusive
				onChange={handleChange}
				aria-label="Style Mode"
				size="small"
			>
				{
					tuningOptions.map(({ key, label }) => (
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

export default TuningSelector;
