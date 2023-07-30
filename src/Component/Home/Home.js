import React, { useEffect, useState } from 'react'
import { Navbar } from '../Navbar/Navbar'
import './Home.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Http } from '../Http';
import { useNavigate } from 'react-router-dom';


export const Home = ()=>{
    const [show , setShow] = useState(true);
    const [userContact, setUserContact] = useState({})
    const [userContactUpdate, setUserContactUpdate] = useState({});
    const [contact, setContact] = useState([])
    const [userID, setUserID] = useState()
    const navigate = useNavigate()

    const handleChange = ()=>{
        show ? setShow(false) : setShow(true)
    }

    const handleContactData = (e)=>{
        const name = e.target.name;
        const value = e.target.value;
        setUserContact(userContact=>({...userContact, [name]:value}))

    }

    const handleContact = (e)=>{
        const { name, email , phone} = userContact
        e.preventDefault();
        Http.post("/api/contact", {
            name,
            email,
            phone
        },{
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("Token")}`,
            }

        }).then((res)=>{
            console.log(res.data)
        }).catch((err)=>{
            console.log(err.response.data.message)
        })
        setUserContact({name:'', email:'', phone:''})


    }
    const handleUpdateContactData = (e)=>{
        const name = e.target.name;
        const value = e.target.value;
        setUserContactUpdate(userContactUpdate=>({...userContactUpdate, [name]:value }))

    }
    

   
    
    const handleDelete = (id)=>{
       Http.delete(`/api/contact/${id}`, {
        headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("Token")}`,
            }

       }).then((res)=>{
        console.log("delete")
       }).catch((err)=>{
        console.log(err)
       })
    }
    const handleUpdate = (id)=>{
        setUserID(id)
        setShow(false)

    }
    const handleUpdateContact = (e)=>{
        e.preventDefault()
        const {name, email, phone} = userContactUpdate
        Http.put(`/api/contact/${userID}`, {
            name,
            email,
            phone

        }, {
            headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("Token")}`,
                }
    
           }).then((res)=>{
            setShow(true)
           }).catch((err)=>{
            console.log(err)
           })
           setUserContactUpdate({name:'', email:'', phone:''})
        
    }


    useEffect(()=>{
        Http.get("api/contact",{
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("Token")}`,
            },
        }).then((res)=>{
           
            setContact(res.data)
            
        }).catch((err)=>{

        })
    },[handleContact, handleUpdateContact])

    useEffect(()=>{
        Http.get("/api/user/current", {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("Token")}`,
            },
        }).then((res)=>{
             
        }).catch((err)=>{
            navigate("/")
        })
    }, [handleContact, handleContactData , handleUpdate, handleDelete])
    
    const data = [
        {
            name:"arjun kushwah",
            email:"arm",
            phone:"999999999999"
        },
        {
            name:" kushwah",
            email:"arjun@ganilcom",
            phone:"6+659+55"
        },
        {
            name:"arjun kushwah",
            email:"arjun@ganilcom",
            phone:"6+659+55"
        },
        {
            name:"arjun kushwah",
            email:"arjun@ganilcom",
            phone:"6+659+55"
        },
        {
            name:"arjun kushwah",
            email:"arjun@ganilcom",
            phone:"6+659+55"
        },
    ]
    return(
        <>
        <Navbar/>
        {
            show ? (
                <>
                <form  className='addcontactform' onSubmit={handleContact}>
                    <label className='logo'>Add Contact details</label>
                    
                    <input placeholder='Name' name='name' value={userContact.name} onChange={handleContactData} />
                    <input placeholder='Email' name='email' value={userContact.email} onChange={handleContactData} />
                    <input placeholder='Phone' name='phone' value={userContact.phone} onChange={handleContactData} />
                    <button className='addconatct'> Add Contact</button>
                    
                </form>

                {
                    <ul className='showdata1'>
                        <li className='item1'>Name</li>
                        <li className='item1'>Email</li>
                        <li className='item1'>Phone</li>
                        <li className='item1'>Action</li>
                    </ul>
                }
                {
                    
                    contact.map((data, index)=>{
                        return(
                            <ul className='showdata' key={index}>
                                <li className='item'>{data.name}</li>
                                <li className='item'>{data.email}</li>
                                <li className='item'>{data.phone}</li>
                                <li className='item'>
                                    <ul className='innerShow'>
                                        <li className='inner' onClick={()=>handleDelete(data._id)}>Delete</li>
                                        <li className='inner' onClick={()=>handleUpdate(data._id)}>Update</li>
                                    </ul>
                                </li>
        
                            </ul>
                        )
                    })
                }

                </>
            ):(
                <>
                <form  className='addcontactform' onSubmit={handleUpdateContact}>
                    <label className='logo'>Update Contact details</label>
                    
                    <input placeholder='Name' name='name' value={userContactUpdate.name} onChange={handleUpdateContactData} />
                    <input placeholder='Email' name='email' value={userContactUpdate.email} onChange={handleUpdateContactData} />
                    <input placeholder='Phone' name='phone' value={userContactUpdate.phone} onChange={handleUpdateContactData} />
                    <button className='addconatct'>Update Contact</button>
                    
                </form>
                </>
            )
        }












        
        
        </>
    )
}