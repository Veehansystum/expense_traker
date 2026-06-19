import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';


function Signup() {
    const [signUpInfo, setSignUpInfo] = useState({
        name: "",
        email: "",
        password: ""
    });

    const navigate = useNavigate();
    const handleChange = (e) => {
        const { name, value } = e.target;
        //console.log(name, value)
        const copySignUpInfo = { ...signUpInfo };
        copySignUpInfo[name] = value;
        setSignUpInfo(copySignUpInfo);

    }

    const handlesubmit = async (e) => {
        e.preventDefault();
        const { name, email, password } = signUpInfo;
        if (!name || !email || !password) {
            return handleError('name ,email and password are required')
        }
        try {
            const url = "http://localhost:8080/auth/signup";
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(signUpInfo)
            })
            const result = await response.json();
            const { success, message,error } = result;
            if (success) {
                handleSuccess(message);
                setTimeout(() => {
                    navigate('/login')
                },1000)
            }else if(error){
                const details = error?.details[0].message;
                handleError(details);
            }else if(!success){
                handleError(message)
            }
            console.log(result)
        } catch (err) {
            handleError(err);
        }
    }
    return (
        <div className='container'>
            <h1>SignUp</h1>
            <form action="" onSubmit={handlesubmit}>
                <div className="">
                    <label htmlFor="">Name</label>
                    <input type="text" name='name'
                        onChange={handleChange}
                        autoFocus
                        placeholder='Enter your name...'
                        value={signUpInfo.name}
                    />
                </div>
                <div className="">
                    <label htmlFor="">Email</label>
                    <input type="email" name='email'
                        onChange={handleChange}
                        autoFocus
                        placeholder='Enter your email...'
                        value={signUpInfo.email} />
                </div>
                <div className="">
                    <label htmlFor="password">Password</label>
                    <input type='password'
                        name='password'
                        onChange={handleChange}
                        autoFocus
                        placeholder='Enter your password...'
                        value={signUpInfo.password}
                    />
                </div>
                <button>Signup</button>
                <span>Already have an account ? <Link to="/login">Login</Link></span>
            </form>
            <ToastContainer />
        </div>
    )
}

export default Signup