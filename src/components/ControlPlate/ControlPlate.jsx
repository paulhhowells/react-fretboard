import React from 'react';
import DegreeSelector from './DegreeSelector';
import PatternSelector from './PatternSelector';
import StyleModeSelector from './StyleModeSelector';
import KeySelector from './KeySelector';
import { useScaleOptions } from '../../context/ScaleContext';

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
		</div>
	);
}
