import { Fragment } from 'react';
import './App.css';
import Login from './Components/SignUp/Login';
import { Routes, Route } from 'react-router-dom';
import ForgotPassword from './Components/SignUp/ForgotPassword';

function App() {
  return (
    <Fragment>
      <Routes>
        <Route path='/' element={<Login />} exact/>
        <Route path='/forgotpassword' element={<ForgotPassword />} exact/>
      </Routes>
    </Fragment>
  )
}

export default App;
