import React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

export default function PatternSelector ({
	patternOptions,
	patternId,
	setPatternId,
}) {
	const handlePattern = (_event, patternId) => {
		if (patternId !== null) {
			setPatternId(patternId);
		}
	};

	return (
		<div className="pattern-selector">
			<ToggleButtonGroup
				value={patternId}
				exclusive
				onChange={handlePattern}
				aria-label="Scale Pattern"
				size="small"
			>
				{
					patternOptions.map(({ patternId, label }) => (
						<ToggleButton
							key={patternId}
							value={patternId}
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
