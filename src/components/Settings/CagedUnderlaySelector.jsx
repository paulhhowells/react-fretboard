import ToggleButtons from '../ToggleButtons';
import { CHORD_SHAPE } from '../CagedUnderlay/constants';

const booleanOptions = [
	{ label: 'Show', key: true },
	{ label: 'Hide', key: false },
];

function CagedUnderlaySelector ({
	isCagedVisible,
	setCagedVisibility,
	tuningKey,
}) {
	const handleToggle = updatedVisibility => setCagedVisibility(updatedVisibility);

	return (CHORD_SHAPE[tuningKey])
		? (
			<>
				CAGED
				<ToggleButtons
					className='caged-underlay-selector'
					options={booleanOptions}
					value={isCagedVisible}
					handleToggle={handleToggle}
				/>
			</>
		)
		: '';
}

export default CagedUnderlaySelector;
