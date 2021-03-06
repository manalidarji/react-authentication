import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PrivateRoute from '../auth/PrivateRoute';
import UserInfoPage from '../pages/UserInfoPage';
import LogInPage from '../pages/LogInPage';
import SignUpPage from '../pages/SignUpPage';
import PleaseVerifyEmailPage from '../pages/PleaseVerifyEmailPage';
import EmailVerificationLandingPage from '../pages/EmailVerificationLandingPage';

const App = () => {
	return(
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<PrivateRoute />}>
					<Route path='/' element={<UserInfoPage />} />
				</Route>
				<Route path='/login' element={<LogInPage/>} />
				<Route path='/signup' element={<SignUpPage />} />
				<Route path='/please-verify' element={<PleaseVerifyEmailPage />} />
				<Route path='/verify-email/:verificationString' element={<EmailVerificationLandingPage />} />
			</Routes>
		</BrowserRouter>
	)
}

export default App;