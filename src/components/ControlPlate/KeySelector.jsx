import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { keySelectOptions } from '../../constants';

export default function KeySelector ({ keyRoot, setKeyRoot }) {
	const handleChange = event => setKeyRoot(event.target.value);

	return (
		<FormControl
			size="small"
			className="key-select"
		>
			<Select
				fullWidth
				id="key-select"
				value={keyRoot}
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
