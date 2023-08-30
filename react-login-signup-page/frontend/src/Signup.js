import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Validation from './SignupValidation';
import { useState } from 'react';
import axios from 'axios';

function Signup() {

    const[values,setValues]=useState({
        name:'',
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
        if(errors.name==="" && errors.email==="" && errors.password===""){
            axios.post('http://localhost:8081/credentials',values)
            .then(res=>{
                navigate('/');
            })
            .catch(err=>console.log(err))
        }
    }

    return (
        <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
            <div className='bg-white p-3 ronded w-25'>
            <h2>SIgn up</h2>
                <form action='' onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor='name'>Name</label>
                        <input type='text' placeholder='Enter name' name='name' onChange={handleInput}/>
                        {errors.name && <span>{errors.name}</span>}
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='email'>Email</label>
                        <input type='email' placeholder='Enter email' name='email' onChange={handleInput}/>
                        {errors.email && <span>{errors.email}</span>}
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='password'>Password</label>
                        <input type='password' placeholder='Enter Password' name='password' onChange={handleInput}/>
                        {errors.password && <span>{errors.password}</span>}
                    </div>
                    <button type='submit' className='btn btn-success w-100'>Sign up</button>
                    <p>you agree to our terms</p>
                    <Link to="/login" className='btn btn-default border w-100'>Log in</Link>
                </form>
            </div>
        </div>
    )
}

export default Signup;