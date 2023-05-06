import React from "react";
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authActions } from "../../store/Auth";
import './Header.css';

const Header = ()=> {
    const isLoggedIn = useSelector(state=> state.auth.isLoggedin);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const logoutHandler = (e) => {
      e.preventDefault();
      dispatch(authActions.logout());
      alert("logout successful");
      navigate('/');
    }
  return (
      <nav>
        <div className = 'logo'>
          <p>Mail-Box</p>
        </div>
        <ul>
          <li><NavLink to='/home' className='NavLink'>Home</NavLink></li>
          <li>{isLoggedIn?<button onClick={logoutHandler}>Logout</button>:<NavLink to='/' className='NavLink'>Login</NavLink>}</li>
        </ul>
      </nav>
  );
}

export default Header;