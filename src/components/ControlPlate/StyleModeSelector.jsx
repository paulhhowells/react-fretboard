import React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import { STYLE_MODE } from '../../hooks/useNotes/constants';

const styleModeOptions = [
	{ key: STYLE_MODE.DIATONIC, label: 'Diatonic' },
	{ key: STYLE_MODE.BLUES, label: 'Blues' },
];

function StyleModeSelector ({ styleMode, setStyleMode }) {
	function handleChange (_event, value) {
		setStyleMode(value);
	}

	return (
		<div className='style-mode-selector'>
			<ToggleButtonGroup
				value={styleMode}
				exclusive
				onChange={handleChange}
				aria-label="Style Mode"
				size="small"
			>
				{
					styleModeOptions.map(({ key, label }) => (
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

export default StyleModeSelector;
