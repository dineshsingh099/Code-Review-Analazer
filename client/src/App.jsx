import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home"
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import Dashboard from "./pages/Dashboard/Dashboard";
function App() {
	return (
		<>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<Login />} />
				<Route path="/sign-up" element={<SignUp />} />
				<Route path="/dashboard" element={<Dashboard />}/>
			</Routes>
		</>
	);
}

export default App;
