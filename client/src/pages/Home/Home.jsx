import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
	Bug,
	Shield,
	Zap,
	Folder,
	FileText,
	Code,
	ArrowRight,
	Layers,
	Menu,
	X,
} from "lucide-react";
import "./Home.css";

const Home = () => {
	const [open, setOpen] = useState(false);

	return (
		<div className="home-wrapper">
			<nav className="glass navbar">
				<div className="nav-content">
					<div className="logo">
						<Layers className="logo-icon" />
						<span>
							CodeReview<b>AI</b>
						</span>
					</div>

					<div className={`nav-links ${open ? "active" : ""}`}>
						<a href="#home" onClick={() => setOpen(false)}>
							Home
						</a>

						<a href="#features" onClick={() => setOpen(false)}>
							Features
						</a>
						<a href="#how-it-works" onClick={() => setOpen(false)}>
							How it Works
						</a>
						<a href="#contact" onClick={() => setOpen(false)}>
							Contact
						</a>
					</div>

					<Link to="/login" className="btn-primary login-btn">
						<span>Login</span>
						<ArrowRight size={18} />
					</Link>

					<div className="menu-toggle" onClick={() => setOpen(!open)}>
						{open ? <X size={24} /> : <Menu size={24} />}
					</div>
				</div>
			</nav>

			<header className="hero container" id="home">
				<div className="hero-text">
					<span className="badge">Powered by Gemini 2.0 Flash</span>

					<h1>
						Accelerate Your <span>Code Reviews</span> with AI
					</h1>

					<p>
						Experience lightning-fast, high-accuracy code analysis. Upload
						entire projects or paste snippets to identify bugs, security risks,
						and performance bottlenecks instantly.
					</p>

					<div className="cta-group">
						<Link to="/login" className="btn-primary lg">
							Analyze My Code Now
						</Link>

						<div className="stats">
							<div>
								<b>100%</b> Accuracy
							</div>
							<div>
								<b>Instant</b> PDF Reports
							</div>
						</div>
					</div>
				</div>

				<div className="hero-visual">
					<div className="visual-card glass">
						<pre>
							<code>{`function processUsers(users) {
  let result = [];

  for (let i = 0; i < users.length; i++) {
	let user = users[i];

	if (!user || !user.active) continue;

	let newUser = { ...user };

	newUser.isVerified = false;
	newUser.category = newUser.age > 18 ? "adult" : "minor";

	if (!newUser.email) {
	  console.warn("Missing email for user:", newUser.id);
	}

	result.push(newUser);
  }

  return result;
}`}</code>
						</pre>
					</div>
				</div>
			</header>
			<section id="features" className="features-section container">
				<div className="section-header">
					<h2>
						Build Better <span>Code Faster</span>
					</h2>
					<p>
						Find bugs, improve performance, and write cleaner code instantly.
					</p>
				</div>

				<div className="feature-grid">
					<FeatureCard
						icon={<Bug size={24} />}
						title="Bug Detection"
						desc="Quickly find errors and issues in your code."
					/>

					<FeatureCard
						icon={<Shield size={24} />}
						title="Security Check"
						desc="Identify basic security problems in your code."
					/>

					<FeatureCard
						icon={<Zap size={24} />}
						title="Fast Analysis"
						desc="Analyze your code instantly with AI."
					/>

					<FeatureCard
						icon={<Folder size={24} />}
						title="Project Support"
						desc="Upload and review complete projects easily."
					/>

					<FeatureCard
						icon={<FileText size={24} />}
						title="Reports"
						desc="Get simple and clear code review reports."
					/>

					<FeatureCard
						icon={<Code size={24} />}
						title="Clean Code View"
						desc="See your code in a clean and readable format."
					/>
				</div>
			</section>

			<section id="how-it-works" className="how-section">
				<div className="container">
					<div className="section-header">
						<h2>
							How It <span>Works</span>
						</h2>
						<p>Analyze your code in just a few simple steps.</p>
					</div>

					<div className="how-grid">
						<div className="how-card glass">
							<div className="step">01</div>
							<h3>Upload Code</h3>
							<p>Paste your code or upload your project files.</p>
						</div>

						<div className="how-card glass">
							<div className="step">02</div>
							<h3>AI Analysis</h3>
							<p>Our AI scans your code to detect bugs and issues.</p>
						</div>

						<div className="how-card glass">
							<div className="step">03</div>
							<h3>Get Results</h3>
							<p>Receive suggestions, improvements, and reports instantly.</p>
						</div>
					</div>
				</div>
			</section>

			<footer className="container">
				<div className="footer-content">
					<p>© 2026 CodeReviewAI. All rights reserved.</p>
				</div>
			</footer>
		</div>
	);
};

const FeatureCard = ({ icon, title, desc }) => {
	return (
		<div className="feature-card glass">
			<div className="icon-box">{icon}</div>
			<h3>{title}</h3>
			<p>{desc}</p>
		</div>
	);
};

export default Home;
