import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PrivateRoute from '../auth/PrivateRoute';
import UserInfoPage from '../pages/UserInfoPage';
import LogInPage from '../pages/LogInPage';
import SignUpPage from '../pages/SignUpPage';

const App = () => {
	return(
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<PrivateRoute />}>
					<Route element={<UserInfoPage />} />
				</Route>
				<Route path='/login' element={<LogInPage/>} />
				<Route path='/signup' element={<SignUpPage />} />
			</Routes>
		</BrowserRouter>
	)
}

export default App;