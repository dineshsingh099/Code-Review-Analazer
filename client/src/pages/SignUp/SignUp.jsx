import React, { useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import bg from "../../assets/background.jpg";
import { UserDataContext } from "../../context/UserContext";
import "./SignUp.css";

const Signup = () => {
	const navigate = useNavigate();
	const { setUser } = useContext(UserDataContext);
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
	});
	const [message, setMessage] = useState("");
	const [isSuccess, setIsSuccess] = useState(false);

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setMessage("");
		try {
			const res = await axios.post(
				"http://127.0.0.1:3001/users/register",
				formData,
				{ withCredentials: true }
			);
			setUser(res.data.user);
			setMessage(res.data.msg);
			setIsSuccess(true);
			setFormData({ name: "", email: "", password: "" });
			setTimeout(() => navigate("/dashboard"), 1500);
		} catch (err) {
			setMessage(err.response.data.detail);
			setIsSuccess(false);
		}
	};

	return (
		<div
			className="signup-page-container"
			style={{ backgroundImage: `url(${bg})` }}
		>
			<h2 className="signup-site-logo">
				Code<span className="signup-logo-highlight">X</span>
			</h2>
			<div className="signup-card-container">
				<div className="signup-form-left">
					<h2 className="signup-form-title">Sign Up</h2>
					<form className="signup-form-fields" onSubmit={handleSubmit}>
						<div className="signup-input-group">
							<FaUser className="signup-input-icon" />
							<input
								type="text"
								name="name"
								placeholder="Name"
								value={formData.name}
								onChange={handleChange}
								className="signup-input-field"
								required
							/>
						</div>
						<div className="signup-input-group">
							<FaEnvelope className="signup-input-icon" />
							<input
								type="email"
								name="email"
								placeholder="Email"
								value={formData.email}
								onChange={handleChange}
								className="signup-input-field"
								required
							/>
						</div>
						<div className="signup-input-group">
							<FaLock className="signup-input-icon" />
							<input
								type="password"
								name="password"
								placeholder="Password"
								value={formData.password}
								onChange={handleChange}
								className="signup-input-field"
								required
							/>
						</div>
						<button type="submit" className="signup-button">
							Sign Up
						</button>
						{message && (
							<div
								className={`signup-message ${isSuccess ? "success" : "error"}`}
							>
								{message}
							</div>
						)}
						<div className="signup-login-msg">
							Already have an account?{" "}
							<NavLink to="/login" className="signup-login-link">
								Login
							</NavLink>
						</div>
					</form>
				</div>
				<div className="signup-info-right">
					<h1 className="signup-info-title">Join CodeX!</h1>
					<p className="signup-info-desc">
						Create your account to access AI-powered code review and analysis
						tools and improve your coding workflow.
					</p>
				</div>
			</div>
		</div>
	);
};

export default Signup;
