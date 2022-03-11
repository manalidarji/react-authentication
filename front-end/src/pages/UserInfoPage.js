import {useState} from 'react';

const UserInfoPage = () => {
	const [favoriteFood, setFavoriteFood] = useState('');
	const [hairColor, setHairColor] = useState('');
	const [bio, setBio] = useState('');

	const saveChanges = async () => {
			alert('Save Changes clicked');
	}
	
	const resetValues = () => {
		alert('Reset Values clicked');
	}

	const logOut = () => {
			alert('Log out clicked');
	}

	return (
		<div className="content-container">
			<h1>Info Page</h1>
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