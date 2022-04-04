import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { keySelectOptions } from '../../constants';
import { NoteContext } from '../App';

export default function KeySelector () {
	const { keyRoot: key, setKeyRoot: setKey } = React.useContext(NoteContext);

	const handleChange = event => setKey(event.target.value);

	return (
		<FormControl
			size="small"
			className="key-select"
		>
			<Select
				fullWidth
				id="key-select"
				value={key}
				onChange={handleChange}
				size="small"
			>
				{
					keySelectOptions.map(
						({ id, label }) => (
							<MenuItem	key={id} value={id}>{ label }</MenuItem>
						)
					)
				}
			</Select>
		</FormControl>
	);
}
