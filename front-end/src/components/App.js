import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LogInPage from '../pages/LogInPage';

const App = () => {
	return(
		<BrowserRouter>
			<Routes>
				<Route path='/login' element={<LogInPage/>} />
			</Routes>
		</BrowserRouter>
	)
}

export default App;