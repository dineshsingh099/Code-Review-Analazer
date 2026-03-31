import React, { useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaEnvelope, FaLock } from "react-icons/fa";
import bg from "../../assets/background.jpg";
import { UserDataContext } from "../../context/UserContext";
import "./Login.css";

const Login = () => {
	const navigate = useNavigate();
	const { setUser } = useContext(UserDataContext);
	const [formData, setFormData] = useState({ email: "", password: "" });
	const [message, setMessage] = useState("");
	const [isSuccess, setIsSuccess] = useState(false);
	const [loading, setLoading] = useState(false);

	const handleChange = (e) =>
		setFormData({ ...formData, [e.target.name]: e.target.value });

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setMessage("");
		try {
			const res = await axios.post("/users/login", formData, {
				withCredentials: true,
			});
			setUser(res.data.user);
			setMessage(res.data.msg);
			setIsSuccess(true);
			navigate("/dashboard");
		} catch (err) {
			setMessage(err.response?.data?.detail || "Login failed");
			setIsSuccess(false);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div
			className="login-page-container"
			style={{ backgroundImage: `url(${bg})` }}
		>
			<h2 className="login-logo-text">
				Code<span className="login-logo-highlight">X</span>
			</h2>
			<div className="login-card-container">
				<div className="login-form-left">
					<h2 className="login-form-title">Login</h2>
					<form className="login-form-fields" onSubmit={handleSubmit}>
						<div className="login-input-group">
							<FaEnvelope className="login-input-icon" />
							<input
								type="email"
								name="email"
								placeholder="Email"
								value={formData.email}
								onChange={handleChange}
								className="login-input-field"
								required
							/>
						</div>
						<div className="login-input-group">
							<FaLock className="login-input-icon" />
							<input
								type="password"
								name="password"
								placeholder="Password"
								value={formData.password}
								onChange={handleChange}
								className="login-input-field"
								required
							/>
						</div>
						<button type="submit" className="login-button" disabled={loading}>
							{loading ? "Logging in..." : "Login"}
						</button>
						{message && (
							<p className={`login-message ${isSuccess ? "success" : "error"}`}>
								{message}
							</p>
						)}
						<div className="login-register-msg">
							Don't have an account?{" "}
							<NavLink to="/sign-up" className="login-register-link">
								Sign Up
							</NavLink>
						</div>
					</form>
				</div>
				<div className="login-info-right">
					<h1 className="login-info-title">Welcome Back!</h1>
					<p className="login-info-desc">
						Access your AI-powered code tools, review code, and improve your
						workflow easily.
					</p>
				</div>
			</div>
		</div>
	);
};

export default Login;
