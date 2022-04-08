import React from 'react';
import { useScaleOptions } from '../../context/ScaleContext';
import { useSettingsContext } from '../../context/SettingsContext';

import DegreeSelector from './DegreeSelector';
import PatternSelector from './PatternSelector';
import StyleModeSelector from './StyleModeSelector';
import KeySelector from './KeySelector';
import NoteLabellingSelector from './NoteLabellingSelector';

export default function ControlPlate ({ children }) {
	const {
		degree,
		degreeOptions,
		keyRoot,
		pattern,
		patternOptions,
		setDegree,
		setKeyRoot,
		setPattern,
		setStyleMode,
		styleMode,
	} = useScaleOptions();
	const {
		noteLabelling,
		setNoteLabelling,
	} = useSettingsContext();

	return (
		<div className="control-plate">
			<div className="row">
				{ children }
			</div>
			<div className="row">
				<StyleModeSelector
					styleMode={styleMode}
					setStyleMode={setStyleMode }
				/>
				<KeySelector
					keyRoot={keyRoot}
					setKeyRoot={setKeyRoot}
				/>
			</div>
			<div className="row">
				<PatternSelector
					patternOptions={patternOptions}
					pattern={pattern}
					setPattern={setPattern}
				/>
				<DegreeSelector
					degreeOptions={degreeOptions}
					degree={degree}
					setDegree={setDegree}
				/>
			</div>
			<div className='row'>
				<NoteLabellingSelector
					noteLabelling={noteLabelling}
					setNoteLabelling={setNoteLabelling}
				/>
			</div>
		</div>
	);
}
