import React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

export default function DegreeSelector ({ degree, setDegree, degreeOptions }) {
	const handleDegree = (_event, degree) => {
		setDegree(degree);
	};

	return (
		<div className="degree-selector">
			<ToggleButtonGroup
				value={degree}
				exclusive
				onChange={handleDegree}
				aria-label="Scale Degree"
				size="small"
			>
				{
					degreeOptions.map(({ degreeLabel, degree }) => (
						<ToggleButton
							key={degreeLabel}
							value={degree}
							aria-label={degreeLabel}
						>
							{ degreeLabel}
						</ToggleButton>
					))
				}
			</ToggleButtonGroup>
		</div>
	);
}
