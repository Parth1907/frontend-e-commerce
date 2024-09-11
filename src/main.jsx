import ReactDOM from 'react-dom/client'
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from 'react-router-dom';
import App from './App'
import AuthProvider from "./context/AuthProvider.jsx"
import "./index.css"
import Home from "./pages/Home.jsx"
import Register from "./pages/Register.jsx"
import Login from './pages/Login.jsx';
import CreateProduct from './pages/CreateProduct.jsx';
import Checkout from "./pages/Checkout.jsx";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<App />}>
            <Route index={true} path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/checkout' element={<Checkout />} />
            <Route path='/create/product' element={<CreateProduct />}></Route>
        </Route>
    )
);

ReactDOM.createRoot(document.getElementById('root')).render(
    <AuthProvider>
        <RouterProvider router={router} />
    </AuthProvider>
)