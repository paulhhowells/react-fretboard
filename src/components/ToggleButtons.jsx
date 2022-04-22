import React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

function ToggleButtons ({
	className,
	options, // [ { key, label } ]
	value,
	handleToggle,
	ariaLabel,
}) {
	const handleChange = (_event, updatedValue) => (updatedValue !== null) &&	handleToggle(updatedValue);

	return (
		<div className={className}>
			<ToggleButtonGroup
				value={value}
				exclusive
				onChange={handleChange}
				aria-label={ariaLabel}
				size="small"
			>
				{
					options.map(({ key, label }) => (
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

export default ToggleButtons;
