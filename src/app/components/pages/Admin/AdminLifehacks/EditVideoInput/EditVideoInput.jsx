import React, {  useRef } from "react";
import "./EditVideoInput.sass";

export default function EditVideoInput({ selectedFile, setSelectedFile, filePath }) {
	const inputRef = useRef();

	const handleFileChange = (event) => {
    const file = event.target.files[0]
	  setSelectedFile(file)
	}

	return (
		<div className="VideoInput">
			{(
				<video
					className="VideoInput__video"
					width="100%"
					height="280px"
					controls
					src={filePath}
				/>
			)}
			<input
				ref={inputRef}
				className="VideoInput_input"
				type="file"
				onChange={handleFileChange}
				accept=".mov,.mp4"
				
			/>
			{selectedFile && (
				<button className="video-remove" onClick={() => setSelectedFile(null)}>
					Remove
				</button>
			)}
		</div>
	);
}
