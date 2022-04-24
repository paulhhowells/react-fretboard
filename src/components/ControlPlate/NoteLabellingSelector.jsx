import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import { NOTE_LABELLING_OPTIONS } from '../../constants';

function NoteLabellingSelector ({ noteLabelling, setNoteLabelling }) {
	function handleChange (_event, key) {
		if (key !== null) {
			setNoteLabelling(key);
		}
	}

	return (
		<div className='note-label-representation-selector'>
			<ToggleButtonGroup
				value={noteLabelling}
				exclusive
				onChange={handleChange}
				size="small"
				aria-label="Note Labelling"
			>
				{
					NOTE_LABELLING_OPTIONS.map(({ key, label }) => (
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

export default NoteLabellingSelector;
