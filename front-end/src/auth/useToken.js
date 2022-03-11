import { useState } from 'react';

// creating a hook for JWT(token)
const useToken = () => {
	const [token, setTokenInternal] = useState( () => {
		return localStorage.getItem('token');
	});

	const setToken = newToken => {
		localStorage.setItem('token', newToken);
		setTokenInternal(newToken);
	}
	
	return [token, setToken];
}

export default useToken;