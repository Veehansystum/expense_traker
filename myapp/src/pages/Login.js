
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';


function Login() {
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: ""
  });

  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    //console.log(name, value)
    const copyLoginInfo = { ...loginInfo };
    copyLoginInfo[name] = value;
    setLoginInfo(copyLoginInfo);

  }

  const handlesubmit = async (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;
    if (!email || !password) {
      return handleError('email and password are required')
    }
    try {
      const url = "https://expense-traker-aozw.vercel.app/auth/login";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginInfo)
      })
      const result = await response.json();
      const { success, message, jwtToken, name, error } = result;
      if (success) {
        handleSuccess(message);
        localStorage.setItem('token', jwtToken);
        localStorage.setItem('loggedInUser', name);
        setTimeout(() => {
          navigate('/home')
        }, 1000)
      } else if (error) {
        const details = error?.details[0].message;
        handleError(details);

      } else if (!success) {
        handleError(message)
      }
      console.log(result)
    } catch (err) {
      handleError(err);
    }
  }
  return (
    <div className='container'>
      <h1>Login</h1>
      <form action="" onSubmit={handlesubmit}>
        <div className="">
          <label htmlFor="">Email</label>
          <input type="email" name='email'
            onChange={handleChange}
            autoFocus
            placeholder='Enter your email...'
            value={loginInfo.email} />
        </div>
        <div className="">
          <label htmlFor="password">Password</label>
          <input type='password'
            name='password'
            onChange={handleChange}
            autoFocus
            placeholder='Enter your password...'
            value={loginInfo.password}
          />
        </div>
        <button>Login</button>
        <span>Dont have an account ? <Link to="/signup">Signup</Link></span>
      </form>
      <ToastContainer />
    </div>
  )
}

export default Login
