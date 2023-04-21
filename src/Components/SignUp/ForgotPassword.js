import React, { useRef, useState} from 'react';
import { NavLink } from 'react-router-dom';
import './ForgotPassword.css';

const ForgotPassword = () => {
    const [state, setState] = useState(false);
    const mailRef = useRef()


    const submitHandler = async (e) => {
        e.preventDefault();
        setState(true)
        try {
            const res = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCw0nOIxvh5dFnlOOfE-EDndXjI2wIL2OQ', {
                method: 'POST',
                body: JSON.stringify({
                    requestType: "PASSWORD_RESET",
                    email: mailRef.current.value
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            if (res.ok) {
                const data = await res.json();
                alert('Sent you a link, Please check your mail inbox!');
                console.log(data);
                setState(false);
            }
        }
        catch (error) {
            alert(error)
            console.log(error)
            setState(false)
        }
    }
    return (
        <div className='forgot'>
        <div className="signup">
          <form onSubmit={submitHandler}>
          <h2>Forgot Password!</h2>
            <label>Enter the Registered Email:</label>
            <input type="email" id="email" name="email" placeholder='Email' ref={mailRef} required />
            {state && <h5>Loading...</h5>}
            <button type="submit" className="btn-primary">Send Link</button>
          </form>
          <div className='link'>
          <NavLink to='/' style={{ textDecoration: 'none' }}>Click here to SignIn/SignUp</NavLink>
          </div>
          </div>
        </div>
    )
}

export default ForgotPassword;