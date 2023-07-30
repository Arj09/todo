import React, { useEffect, useState } from 'react'
import "./Navbar.css"
import { useNavigate } from 'react-router-dom';
import { Http } from '../Http';

export const Navbar = ()=>{
    const [hide, setHide] = useState(false);
    const [currentUser, setCurrentUser] = useState("Un")
    const navigate = useNavigate()
    const handlebtnSHow = ()=>{
        hide ? setHide(false) :setHide(true)
    }

    const handleLogout = ()=>{
        localStorage.removeItem("Token")
        navigate("/")
       
    }

    useEffect(()=>{
        Http.get("/api/user/current", {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("Token")}`,
            },
        }).then((res)=>{
            setCurrentUser(res.data.username)
        }).catch((err)=>{
            console.log(err.response.data.message)
        })

    },[])
    return(
        <>
        <nav>
            <label className='logo'>MernStack</label>
            <div className='avatar'>
                <div className='circle' onClick={handlebtnSHow}>{currentUser}</div>
                <div className={hide ? 'option' : 'option1'}>
                    <button className='optbtn' onClick={handleLogout}>Logout</button>
                </div>

            </div>
        </nav>
        
        </>
    )
}