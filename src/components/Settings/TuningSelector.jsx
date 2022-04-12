import React from 'react';
import { TUNING } from '../../constants';
import ToggleButtons from '../ToggleButtons';

const tuningOptions = Object.entries(TUNING).map(
	([ tuningKey, { label } ]) => ({ key: tuningKey, label })
);

function TuningSelector ({ tuningKey, setTuningKey }) {
	const handleToggle = updatedTuningKey => setTuningKey(updatedTuningKey);

	return (
		<ToggleButtons
			className='fret-spacing-selector'
			options={tuningOptions}
			value={tuningKey}
			handleToggle={handleToggle}
			ariaLabel="Tuning"
		/>
	);
}

export default TuningSelector;
