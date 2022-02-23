import React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { KEY_TYPE_OPTIONS } from '../../constants';

export default function KeySelector ({
	keyType,
	setKeyType,
	rootNote,
	rootNoteChoices,
	setRootNote,
}) {
	const handleKeyRoot = (event, keyRootNote) => {
		setRootNote(keyRootNote);
	};

	const handleKeyType = (event, keyType) => {
		setKeyType(keyType);
	};

	console.log('rootNoteChoices', rootNoteChoices);

	return (
		<>
			<ToggleButtonGroup
				value={rootNote}
				exclusive
				onChange={handleKeyRoot}
				aria-label="Key Root Note"
				size="small"
			>
				{
					rootNoteChoices.map(
						({ note, label }) => (<ToggleButton key={label + '-' + note} value={note} aria-label={label}>{ label }</ToggleButton>)
					)
				}
			</ToggleButtonGroup>
			{ rootNote }
			<ToggleButtonGroup
				value={keyType}
				exclusive
				onChange={handleKeyType}
				aria-label="Key Type"
				size="small"
			>
				{
					KEY_TYPE_OPTIONS.map(
						({ key, label }) => (<ToggleButton key={key} value={key} aria-label={label}>{ label }</ToggleButton>)
					)
				}
			</ToggleButtonGroup>
		</>
	);
}
