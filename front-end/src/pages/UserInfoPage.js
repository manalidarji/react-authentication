import {useNavigate} from 'react-router-dom';
import {useState, useEffect} from 'react';
import useToken from '../auth/useToken';
import useUser from '../auth/useUser';
import axios from 'axios';

const UserInfoPage = () => {
	const navigate = useNavigate();
	const [token, setToken] = useToken();
	const user = useUser();
	const {_id, email, info} = user;

	const [favoriteFood, setFavoriteFood] = useState(info.favoriteFood || '');
	const [hairColor, setHairColor] = useState(info.hairColor || '');
	const [bio, setBio] = useState(info.bio || '');

	const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [showErrorMessage, setShowErrorMessage] = useState(false);

	// This useEffect hook automatically hides the success and error messages after 3 seconds when they're shown. Just a little user interface improvement.
    useEffect(() => {
        if (showSuccessMessage || showErrorMessage) {
            setTimeout(() => {
                setShowSuccessMessage(false);
                setShowErrorMessage(false);
            }, 3000);
        }
    }, [showSuccessMessage, showErrorMessage]);

	// updating the user afte save btn was clicked
	const saveChanges = async () => {
		try {
			const response = await axios.put(`/api/users/${_id}`, 
				{favoriteFood, hairColor, bio},
				{headers: {Authorization: `Bearer ${token}`}}
			);
			setToken(response.data.token);
			setShowSuccessMessage(true);
		} catch (error) {
			setShowErrorMessage(true);
		}
	}
	
	// resetting value to the initial values
	const resetValues = () => {
		setFavoriteFood(info.favoriteFood);
		setHairColor(info.hairColor);
		setBio(info.bio);
	}

	const logOut = () => {
		localStorage.removeItem('token');
		navigate('/login', { replace: true });
	}

	return (
		<div className="content-container">
			<h1>Info Page for {email}</h1>
			{showSuccessMessage && <div className="success">Successfully saved user data!</div>}
            {showErrorMessage && <div className="fail">Uh oh... something went wrong and we couldn't save changes</div>}
			<label>
				Favorite Food:
				<input
					onChange={e => setFavoriteFood(e.target.value)}
					value={favoriteFood} />
			</label>
			<label>
				Hair Color:
				<input
					onChange={e => setHairColor(e.target.value)}
					value={hairColor} />
			</label>
			<label>
				Bio:
				<input
					onChange={e => setBio(e.target.value)}
					value={bio} />
			</label>
		<hr />
		<button onClick={saveChanges}>Save Changes</button>
		<button onClick={resetValues}>Reset Values</button>
		<button onClick={logOut}>Log Out</button>
		</div>
	)
}

export default UserInfoPage;