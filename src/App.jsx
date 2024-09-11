import Navbar from "./components/Navbar"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Outlet } from 'react-router-dom';

const App = () => {
	return (
		<>
			<Navbar />
			<ToastContainer />
			<Outlet />
		</>
	);
};

export default App;
