import React, { useState } from 'react';

export const AuthContext = React.createContext({
	isAuth: false,
	login: () => {}
});

const AuthContextProvider = props => {
	const [isAuthentic, setIsAuthentic] = useState(false);

	const loginHandler = () => {
		setIsAuthentic(true);
	};

	return( 
		<AuthContext.Provider value={{login: loginHandler, isAuth: isAuthentic }}>
			{props.children}
		</AuthContext.Provider>
		)
};

export default AuthContextProvider;