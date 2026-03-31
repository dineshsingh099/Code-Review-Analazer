import React, { useState, useEffect } from "react";
import "./Sidebar.css";

function Sidebar({ onSelectHistory, onNewChat, onLogout }) {
	const [extended, setExtended] = useState(false);
	const [history, setHistory] = useState([]);

	useEffect(() => {
		const fetchHistory = async () => {
			try {
				const response = await fetch("/users/history", {
					method: "GET",
					credentials: "include",
				});
				const data = await response.json();
				setHistory(data.history || []);
			} catch (err) {
				console.error("Failed to load history:", err);
			}
		};
		fetchHistory();
	}, []);

	return (
		<div className="sidebar">
			<div className="top">
				<span
					onClick={() => setExtended((prev) => !prev)}
					className="menu material-icons"
				>
					menu
				</span>

				<div className="new-chat" onClick={onNewChat}>
					<span className="material-icons">add</span>
					{extended ? <p>New chat</p> : null}
				</div>

				{extended ? (
					<div className="recent">
						<p className="recent-title">History</p>
						<div className="recent-list">
							{history.length > 0 ? (
								history.map((item, index) => (
									<div key={index} className="recent-entry" onClick={()=> onSelectHistory(item)}>
										<span className="material-icons">history</span>
										<p>{item.prompt.slice(0, 15)}...</p>
									</div>
								))
							) : (
								<p>No history yet</p>
							)}
						</div>
					</div>
				) : null}
			</div>

			<div className="bottom">
				<div className="bottom-item" onClick={onLogout}>
					<span className="material-icons">logout</span>
					{extended ? <p>Logout</p> : null}
				</div>
			</div>
		</div>
	);
}

export default Sidebar;
