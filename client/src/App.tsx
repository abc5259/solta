import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import StatsPage from './pages/StatsPage';
import ProfilePage from './pages/ProfilePage';
import ProblemSearchPage from './pages/ProblemSearchPage';

function App() {
	return (
		<Router>
			<Header />
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/stats" element={<StatsPage />} />
				<Route path="/profile/:username" element={<ProfilePage />} />
				<Route path="/problems" element={<ProblemSearchPage />} />
			</Routes>
		</Router>
	);
}

export default App;
