import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LogInPage from '../pages/LogInPage';
import SignUpPage from '../pages/SignUpPage';

const App = () => {
	return(
		<BrowserRouter>
			<Routes>
				<Route path='/login' element={<LogInPage/>} />
				<Route path='/signup' element={<SignUpPage />} />
			</Routes>
		</BrowserRouter>
	)
}

export default App;