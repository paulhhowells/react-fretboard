import React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { KEY_SIGN_OPTIONS } from '../../constants';

export default function KeySelector ({
	keySign,
	setKeySign,
	rootNote,
	rootNoteChoices,
	setRootNote,
}) {
	const handleKeyRoot = (event, keyRootNote) => {
		setRootNote(keyRootNote);
	};

	const handleSign = (event, sign) => {

		if (sign) {
			setKeySign(sign);
		}
	};

	console.log('rootNoteChoices', rootNoteChoices);

	return (
		<>
			Key
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
			<ToggleButtonGroup
				value={keySign}
				exclusive
				onChange={handleSign}
				aria-label="Sign Type"
				size="small"
			>
				{
					KEY_SIGN_OPTIONS.map(
						({ sign, label }) => (<ToggleButton key={sign} value={sign} aria-label={label}>{ label }</ToggleButton>)
					)
				}
			</ToggleButtonGroup>
		</>
	);
}
