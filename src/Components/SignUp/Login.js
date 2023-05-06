import React, { Fragment, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import avatar from '../../Img/avatar.svg';
import wave from '../../Img/wave.png';
import bg from '../../Img/bg.svg';
import './Login.css';
import { useNavigate, NavLink } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { authActions } from "../../store/Auth";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const emailInputRef=useRef();
  const passwordInputRef=useRef();
  const confirmPasswordRef = useRef();
  const [isLogin ,setIsLogin] = useState(true);
  
  const submitHandler = (event)=>{
      event.preventDefault();
      const enteredEmail=emailInputRef.current.value;
      const enteredPassword=passwordInputRef.current.value;
      let url;
      if(isLogin){
        url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCw0nOIxvh5dFnlOOfE-EDndXjI2wIL2OQ';
      }else {
        if(passwordInputRef.current.value===confirmPasswordRef.current.value){
        url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCw0nOIxvh5dFnlOOfE-EDndXjI2wIL2OQ'
      }else{
        alert('password not matched');
        return; }
    }
      fetch(url,{
          method:'POST',
          body:JSON.stringify({
              email: enteredEmail,
              password : enteredPassword,
              returnSecureToken : true 
          }),
          headers :{'Content-type':'application/json'},
      }).then((res)=>{
        if(res.ok){
          return res.json();
        }else{
          return res.json().then(data=>{
            let errorMessage = 'Authentication Failed!';
            // if(data && data.error && data.error.message){
            //   errorMessage = data.error.message
            // }
            throw new Error(errorMessage);
          })
        }
      }).then((data) => {
        dispatch(authActions.updateAuthInfo({
          token: data.idToken,
          email: emailInputRef.current.value
        }))
          navigate('/home');
      })
      .catch((err) => {
        alert(err.message);
      });
    }
  const switchAuthHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

    return (
        <Fragment>
        <div className='loginMain'>
            <img className="wave" src={wave} alt='wave'/>
            <div className="container">
                <div className="img">
                    <img src={bg} alt='Backgrounfd' />
                </div>
                <div className="login-content">
                    <form onSubmit={submitHandler}>
                        <img src={avatar} alt='avatar' />
                            <h2 className="title">Welcome</h2>
                            <div className="input-div one">
                                <div className="i">
                                    <FontAwesomeIcon icon={faUser}/>
                                </div>
                                <div className="div">
                                    <input type="email" className="input" ref={emailInputRef} placeholder='User Email'/>
                                </div>
                            </div>
                            <div className="input-div pass">
                                <div className="i">
                                <FontAwesomeIcon icon={faLock}/>
                                </div>
                                <div className="div">
                                    <input type="password" ref={passwordInputRef} className="input" placeholder='Password' />
                                </div>
                            </div>
                            { !isLogin && <div className="input-div pass">
                                <div className="i">
                                <FontAwesomeIcon icon={faLock}/>
                                </div>
                                <div className="div">
                                    <input type="password" ref={confirmPasswordRef} className="input" placeholder='Confirm Password' />
                                </div>
                            </div>}
                            {isLogin && <NavLink to='/forgotpassword' className='anchor'>Forgot Password?</NavLink>}
                            <button type="submit" className="btn" >{isLogin ? "Login" : "Sign up"}</button>
                    </form>
                    <div className='text-center'>
                    <button onClick={switchAuthHandler} className='btn-change'>{isLogin ? 'Create a new account' : 'Sign in with an existing account'}</button>
                </div>
                </div>
            </div>
          </div>
        </Fragment>
    )
}

export default Login;