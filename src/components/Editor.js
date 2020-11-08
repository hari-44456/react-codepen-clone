import React, { useState, useEffect } from 'react';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/xml/xml';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/css/css';
import { Controlled as ControlledEditor } from 'react-codemirror2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCompressAlt, faExpandAlt } from '@fortawesome/free-solid-svg-icons';

const Editor = (props) => {
	const { language, displayName, value, onChange } = props;
	const [open, setOpen] = useState(true);

	const handleChange = (editor, data, value) => onChange(value);

	useEffect(() => {
		document.addEventListener('contextmenu', (e) => {
			e.preventDefault();
			console.log('Right Click is disabled');
		});

		document.addEventListener('copy', (e) => {
			e.clipboardData.setData('text/plain', 'Copy option is disabled');
			e.preventDefault();
		});

		document.addEventListener('cut', (e) => {
			e.clipboardData.setData('text/plain', 'Cut option is disabled');
			e.preventDefault();
		});
	});

	return (
		<div className={`editor-container ${open ? '' : 'collapsed'}`}>
			<div className='editor-title'>
				{displayName}
				<button
					type='button'
					className='expand-collapse-btn'
					onClick={() => setOpen((prevOpen) => !prevOpen)}>
					<FontAwesomeIcon
						icon={open ? faCompressAlt : faExpandAlt}
					/>
				</button>
			</div>
			<ControlledEditor
				onBeforeChange={handleChange}
				value={value}
				className='code-mirror-wrapper target-trial'
				options={{
					lineWrapping: true,
					lint: true,
					mode: language,
					theme: 'material',
					lineNumbers: true,
				}}
			/>
		</div>
	);
};

export default Editor;
