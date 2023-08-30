import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import Validation from './LoginValidation';
import axios from 'axios';

function Login() {
    
    const[values,setValues]=useState({
        email:'',
        password:''
    })

    const navigate=useNavigate();

    const[errors,setErrors]=useState({})
    const handleInput=(event)=>{
        setValues(prev=> ({...prev,[event.target.name]:[event.target.value]}))
    }


    const handleSubmit=(event)=>{
        event.preventDefault();
        setErrors(Validation(values));
        if(errors.email==="" && errors.password===""){
            axios.post('http://localhost:8081/signup',values)
            .then(res=>{
                if(res.data==='success'){
                    navigate('/home');
                }else{
                    alert('no record exists');
                }
            })
            .catch(err=>console.log(err))
        }
    }

    return(
        <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
            <div className='bg-white p-3 ronded w-25'>
            <h2>Sign In</h2>
                <form action='' onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor='email'>Email</label>
                        <input type='email' placeholder='Enter email' onChange={handleInput} name='email'/>
                        {errors.email && <span>{errors.email}</span>}
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='password'>Password</label>
                        <input type='password' placeholder='Enter Password' onChange={handleInput} name='password'/>
                        {errors.password && <span>{errors.password}</span>}
                    </div>
                    <button type='submit' btn btn-success w-100 >Login</button>
                    <p>you agree to our terms</p>
                    <Link to="/signup" className='btn btn-default border w-100'>Create Account</Link>
                </form>
            </div>
        </div>
    )
}

export default Login;