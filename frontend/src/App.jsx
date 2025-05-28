import './App.css';
import { Link, Route, Routes, BrowserRouter } from 'react-router-dom';
import IndexPage from './pages/index';
import NoPageFound from './pages/NoPageFound';
import LoginPage from './pages/LoginPage';
import { Feed } from './pages/Feed';
import { useState } from 'react';
import useDarkMode from './hooks/useDarkMode';
import { UserProvider } from './hooks/useUser';
function App() {
	const { darkMode, toggleDarkMode } = useDarkMode();
	const [user, setUser] = useState(null);

	return (
		<UserProvider>
			<BrowserRouter>
				<Routes>
					<Route index element={<IndexPage darkMode={darkMode} toggleDarkMode={toggleDarkMode} />}></Route>
					<Route path='/login' element={<LoginPage darkMode={darkMode} setUser={setUser} />}></Route>
					<Route path='/feed' element={<Feed darkMode={darkMode} />}></Route>
					<Route path='*' element={<NoPageFound />} />
				</Routes>
			</BrowserRouter>
		</UserProvider>
	);
}

export default App;
