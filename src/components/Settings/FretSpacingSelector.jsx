import { FRET_SPACING } from '../../constants';
import ToggleButtons from '../ToggleButtons';

const fretSpacingOptions = [
	{ key: FRET_SPACING.EVEN, label: 'Even' },
	{ key: FRET_SPACING.RULE_OF_EIGHTEEN, label: 'Diminishing' },
];

function FretSpacingSelector ({ fretSpacing
	, setFretSpacing }) {
	const handleToggle = updatedFretSpacing => setFretSpacing(updatedFretSpacing);

	return (
		<>
			Fret spacing
			<ToggleButtons
				className='fret-spacing-selector'
				options={fretSpacingOptions}
				value={fretSpacing}
				handleToggle={handleToggle}
				ariaLabel="Fret Spacing"
			/>
		</>
	);
}

export default FretSpacingSelector;
