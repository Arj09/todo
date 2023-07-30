import React, { useState } from 'react';
import "./Login.css"
import { useNavigate } from 'react-router-dom';
import { Http } from '../Http';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Login = ()=>{
    const [show, setShow] = useState(true);
    const [userLogindata, setUserlogindata] = useState({})
    const [userRegisterdata, setUserRegisterndata] = useState({})
    const navigate = useNavigate()
    const handleFormChange = ()=>{
        show ? setShow(false) : setShow(true)
    }
    const handleUserlogindata = (e)=>{
        const name = e.target.name;
        const value = e.target.value;
        setUserlogindata(userLogindata=>({...userLogindata, [name]:value}))
    }

    const handleUserlogin = (e)=>{
        const {email, password} = userLogindata
        e.preventDefault();
        Http.post("/api/user/login",{
            email,
            password

        }).then((res)=>{
            localStorage.setItem("Token", res.data.accessToken)
            navigate("/home")
            

        }).catch((err)=>{
            toast.warning(err.response.data.message, {
                position: toast.POSITION.TOP_RIGHT
            });

        })
        setUserlogindata({email:'', password:""})

    }
    const handleUserRegisterdata = (e)=>{
        const name = e.target.name;
        const value = e.target.value;
        setUserRegisterndata(userRegisterdata=>({...userRegisterdata, [name]:value}))
    }

    const handleUserRegister = (e)=>{
        const {username, email, password} = userRegisterdata
        e.preventDefault();
        Http.post("/api/user/register", {
            username,
            email,
            password

        }).then((res)=>{
            console.log(res.data)
            setUserRegisterndata({username:"", email:"", password:""})
            setShow(true)


        }).catch((err)=>{
            console.log(err.response.data.message)
            alert(err.response.data.message)
            

        })
        setUserRegisterndata({username:"", email:"", password:""})

    }
    
    return(
        <>
        {
            show ? (
                <>
                <form  className='Loginform' onSubmit={handleUserlogin}>
                    <ToastContainer/>
                    <label className='logo'>MernStack</label>
                    
                    <input placeholder='Email' name='email' value={userLogindata.email} onChange={handleUserlogindata} />
                    <input placeholder='password' name='password' value={userLogindata.password} onChange={handleUserlogindata} />
                    <button>Login</button>
                    <label className='logof' onClick={handleFormChange}>Click for Register</label>
                </form>

                </>
            ):(
                <>
                <form  className='Loginform' onSubmit={handleUserRegister}>
                    <ToastContainer/>
                    <label className='logo'>MernStack</label>
                    <input placeholder='name' name='username' value={userRegisterdata.username} onChange={handleUserRegisterdata}/>
                    <input placeholder='email' name='email' value={userRegisterdata.email} onChange={handleUserRegisterdata}/>
                    <input placeholder='password' name='password' value={userRegisterdata.password} onChange={handleUserRegisterdata}/>
                    <button>Register</button>
                    <label className='logof' onClick={handleFormChange}>Click for login</label>
                </form>
                </>
            )
        }

        
        
        </>
    )
}