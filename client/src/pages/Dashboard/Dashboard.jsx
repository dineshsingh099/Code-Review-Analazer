import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserDataContext } from "../../context/UserContext";
import Sidebar from "../Sidebar/Sidebar";
import Main from "../Main/Main";
import "./Dashboard.css";

const Dashboard = () => {
	const { user, setUser } = useContext(UserDataContext);
	const [loading, setLoading] = useState(true);
	const [selectedHistory, setSelectedHistory] = useState(null);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const res = await axios.get("/users/profile", {
					withCredentials: true,
				});
				setUser(res.data);
			} catch {
				setUser(null);
				navigate("/login");
			} finally {
				setLoading(false);
			}
		};
		if (!user) fetchUser();
		else setLoading(false);
	}, [navigate, setUser, user]);

	const handleLogout = async () => {
		await axios.post("/users/logout", {}, { withCredentials: true });
		setUser(null);
		navigate("/login");
	};

	const handleSelectHistory = (historyItem) => {
		setSelectedHistory(historyItem);
	};
	
	
	const handleNewChat = () => {
		setSelectedHistory(null); 
	};


	if (loading) return <div>Loading...</div>;

	return (
		<div className="dashboard-wrapper">
			<Sidebar
				onSelectHistory={handleSelectHistory}
				onNewChat={handleNewChat}
				onLogout={handleLogout}
			/>

			<Main selectedHistory={selectedHistory} />
		</div>
	);
};

export default Dashboard;
