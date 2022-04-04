import React from 'react';
import DegreeSelector from './DegreeSelector';
import PatternSelector from './PatternSelector';
import StyleModeSelector from './StyleModeSelector';
import KeySelector from './KeySelector';

export default function ControlPlate ({
	degree,
	pattern,
	patternOptions,
	degreeOptions,
	setDegree,
	setPattern,
}) {
	return (
		<div className="control-plate">
			<div className="row">
				<StyleModeSelector />
				<KeySelector />
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
