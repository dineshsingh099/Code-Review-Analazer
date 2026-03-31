import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
	return (
		<div className="app" id="home">
			<nav className="navbar">
				<h2 className="logo">
					Code<span>X</span>
				</h2>
				<div className="nav-links">
					<a href="#home">Home</a>
					<a href="#about">About</a>
					<a href="#features">Features</a>
					<a href="#contact">Contact</a>
				</div>
				<Link to="/login" className="home-btn">
					<span>Login</span>
				</Link>
			</nav>
			<div className="content">
				<h1>AI-Powered Code Review Analyzer</h1>
				<h3>Analyze your code efficiently with cutting-edge AI</h3>
				<p>
					Automatically review, detect bugs, suggest improvements, and ensure
					best coding practices with a single click.
				</p>
			</div>
			<section className="about" id="about">
				<h2>About CodeX</h2>
				<p>
					CodeX is an AI-driven tool designed to help developers write clean,
					bug-free code faster. Using advanced machine learning algorithms, it
					reviews your code, highlights potential issues, and provides
					actionable suggestions to improve efficiency and maintainability.
				</p>
				<p>
					Whether you are a beginner or a professional developer, CodeX ensures
					that your projects follow the best coding practices and standards
					automatically.
				</p>
			</section>
		</div>
	);
}

export default Home;
