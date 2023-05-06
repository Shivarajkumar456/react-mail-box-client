import { Fragment } from 'react';
import Login from './Components/SignUp/Login';
import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ForgotPassword from './Components/SignUp/ForgotPassword';
import Header from './Components/Header/Header';
import Home from './Components/Pages/Home';
import MailHome from './Components/Mail/MailHome';
import Inbox from './Components/Mail/Inbox';

function App() {
  const isLoggedIn = useSelector(state=> state.auth.isLoggedin);
  return (
    <Fragment>
      <Header />
      <Routes>
        <Route path='/' element={<Login />} exact/>
        <Route path='/forgotpassword' element={<ForgotPassword />} exact/>
        <Route path='/home' element={<Home />} exact/>
        {isLoggedIn && <Route path='/compose' element={<MailHome />} exact/>}
        {isLoggedIn && <Route path='/inbox' element={<Inbox />} exact/>}
      </Routes>
    </Fragment>
  )
}
export default App;
