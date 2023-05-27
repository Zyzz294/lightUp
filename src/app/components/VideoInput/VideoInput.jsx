import React, { useState, useRef } from "react";
import "./VideoInput.sass";

export default function VideoInput({ selectedFile, setSelectedFile }) {
	const inputRef = useRef();

	const handleFileChange = (event) => {
    const file = event.target.files[0]
	  setSelectedFile(file)
	}

	return (
		<div className="VideoInput">
			{selectedFile && (
				<video
					className="VideoInput__video"
					width="100%"
					height="280px"
					controls
					src={selectedFile}
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
