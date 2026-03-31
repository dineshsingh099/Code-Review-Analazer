import React, { useState, useEffect } from "react";
import "./Main.css";
import Sidebar from "../Sidebar/Sidebar";

function Main({ selectedHistory }) {
	const [code, setCode] = useState("");
	const [output, setOutput] = useState("");
	const [isAnalyzing, setIsAnalyzing] = useState(false);
	const username = "Dinesh";
	const firstLetter = username.charAt(0).toUpperCase();
	
	
	
	useEffect(() => {
		if (selectedHistory) {
			setCode(selectedHistory.prompt || selectedHistory.input || "");
			let resp = selectedHistory.responses || selectedHistory.response;
			if (Array.isArray(resp)) resp = resp.join("\n");
			setOutput(resp && resp.trim() !== "" ? resp : "🕒 Loaded from history");
		} else {
			setCode("");
			setOutput("");
		}
	}, [selectedHistory])
	
	const handleFileUpload = (event) => {
		const file = event.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = (e) => {
				setCode(e.target.result);
				setOutput("✅ File uploaded successfully!");
			};
			reader.readAsText(file);
		}
	};

	const handleAnalyze = async () => {
		if (!code.trim()) return;
		setOutput("");
		setIsAnalyzing(true);

		try {
			const response = await fetch("/users/generate", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				credentials: "include",
				body: JSON.stringify({ prompt: code }),
			});

			const reader = response.body.getReader();
			const decoder = new TextDecoder();
			let done = false;

			while (!done) {
				const { value, done: readerDone } = await reader.read();
				done = readerDone;
				if (value) {
					setOutput((prev) => prev + decoder.decode(value));
				}
			}
		} catch (err) {
			setOutput("❌ Error: " + err.message);
		} finally {
			setIsAnalyzing(false);
		}
	};

	return (
		<div className="main">
			<div className="nav">
				<p>Code Analyzer</p>
				<div className="profile-icon">{firstLetter}</div>
			</div>

			<div className="editor-layout">
			
				<div className="editor-left">
					<div className="button-group">
						<label className="upload-btn" htmlFor="file-upload">
							<span className="material-icons">upload_file</span>
							Upload
						</label>
						<input
							id="file-upload"
							type="file"
							style={{ display: "none" }}
							onChange={handleFileUpload}
						/>

					</div>

					<div className="textarea-container">
						<textarea
							value={code}
							onChange={(e) => setCode(e.target.value)}
							placeholder="Type or paste your code here..."
						/>
						<button
							className="analyze-btn"
							onClick={handleAnalyze}
							disabled={isAnalyzing}
						>
							<span className="material-icons">analytics</span>
							{isAnalyzing ? "Analyzing..." : "Analyze"}
						</button>
					</div>
				</div>

				<div className="editor-right">
					<div className="output-header">Output Console</div>
					<div className="output-content">
						{isAnalyzing ? (
							<div className="loading">
								<div className="spinner"></div>
								<p>Analyzing your code... Please wait ⏳</p>
							</div>
						) : output ? (
							<div
								className="formatted-output"
								dangerouslySetInnerHTML={{
									__html: output
										.replace(
											/(✅ Recommended Fix:|❌ Bad Code:|💡 Improvements:|🔍 Issues:)/g,
											'<span style="color:#00FF7F; font-weight:bold;">$1</span>'
										)

										
										.replace(/```python([\s\S]*?)```/g, (match, code) => {
											const cleanCode = code
												.replace(/""".*?"""/gs, "") 
												.replace(/#.*/g, "") 
												.trim();

											return `<pre style="background:#1e1e1e; color:#f8f8f2; padding:12px; border-radius:8px; font-family: 'Fira Code', monospace; overflow-x:auto;  line-height:1.5;  white-space:pre-wrap;"><code>${cleanCode}</code></pre>`;
										})

										.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>")
										.replace(/\n/g, "<br/>")
										.replace(/❌/g, "❌")
										.replace(/✅/g, "✅")
										.replace(/💡/g, "💡")
										.replace(/🔍/g, "🔍"),
								}}
							/>
						) : (
							<p>No output yet.</p>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

export default Main;
