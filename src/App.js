import { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ReactToastify, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import NavBar from './components/NavBar';
import Explore from './pages/Explore';
import ForgotPassword from './pages/ForgotPassword';
import Offers from './pages/Offers';
import Profile from './pages/Profile';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';


function App() {
  return (
    <Fragment>
        <Router>
            <Routes>
                <Route path='/' element={<Explore />} />
                <Route path='/offers' element={<Offers />} />
                <Route path='/profile' element={<Profile />} />
                <Route path='/sign-in' element={<SignIn />} />
                <Route path='/sign-up' element={<SignUp />} />
                <Route path='/forgot-password' element={<ForgotPassword />} />
            </Routes>
            <NavBar />
        </Router>
    <ToastContainer />
    </Fragment>
  );
}

export default App;
