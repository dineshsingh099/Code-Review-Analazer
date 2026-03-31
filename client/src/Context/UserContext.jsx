import React, { createContext, useState, useEffect } from "react";

export const UserDataContext = createContext();

function UserContext({ children }) {
	const [user, setUser] = useState(null);

	useEffect(() => {
		const storedUser = localStorage.getItem("user");
		if (storedUser) setUser(JSON.parse(storedUser));
	}, []);

	useEffect(() => {
		if (user) {
			localStorage.setItem("user", JSON.stringify(user));
		} else {
			localStorage.removeItem("user");
		}
	}, [user]);

	return (
		<UserDataContext.Provider value={{ user, setUser }}>
			{children}
		</UserDataContext.Provider>
	);
}

export default UserContext;
