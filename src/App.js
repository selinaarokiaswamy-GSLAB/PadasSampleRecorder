import { Routes, BrowserRouter, Route } from 'react-router-dom'; 
import { useContext } from 'react'; 
import AuthContext from './store/auth-context'; 
import Layout from './components/Layout/Layout'; 
import AuthPage from './pages/AuthPage';
import RecordPage from './pages/RecordPage'; 
import HomePage from './pages/HomePage';


function App() {
	const authCtx = useContext(AuthContext); 
	console.log(authCtx.isLoggedIn); 
	return (
		<BrowserRouter>
			<Layout />
			<Routes>
				<Route exact path='/' element={<HomePage />}/>
				<Route path='/record' element={<RecordPage />}/>
				{/* {!authCtx.isLoggedIn && (
					<Route path='/auth' element={<AuthPage />}/>
				)}
				{authCtx.isLoggedIn && (
					<Route path='/record' element={<RecordPage />}/>
				)} */}
			</Routes>
		</BrowserRouter>
	);
};

export default App;
