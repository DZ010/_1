import React from 'react'
import Footer from '../componets/footer'
import { useState } from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [username, setUsername] = useState("")
  const[password,setPassword]=useState("")
  const [errmsg,setErrmsg]= useState("")
  const navigate = useNavigate()
  const handleLogin=async(e)=>{
  e.preventDefault();
  try{
    const response = await axios.post("http://localhost:2121/api/auth/login",{username,password},{withCredentials:true})
    if(response.status==200){
      navigate("/home")
    }
  }
  catch(err){
    if(err.response && err.response.data.message){
    setErrmsg(err.response.data.message)
    }
    else{
      setErrmsg("failed to login try agin later")
    }
  }
  }
  return (
    <>
    <div className="bg-blue-500 h-12 flex">
            <h1 className='text-3xl text-white pl-5 font-sans'>St Luke Hospital</h1>
       
    </div>
    <div className="flex flex-col items-center justify-center text-center mt-70 ">
       <div className="shadow-md p-6 rounded-md w-80">
        <form action="" onSubmit={handleLogin}>
          {errmsg &&(
            <div className="mb-4 text-red-600 text-sm"></div>
          )}
        <div className="mb-4">
            <label htmlFor="usernaem" className='text-left  mb-2 text-gray-700'>Username:</label>
            <input type="text"
            value={username}
            onChange={(e)=>setUsername(e.target.value)}
            className='
            border-2 border-gray-200 
            ' placeholder='enter username....'/>
        </div>
          <div className="mb-4">
            <label htmlFor="password" className='text-left  mb-2 text-gray-700'
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            >password:</label>
            <input type="text" className='
            border-2 border-gray-200 
            ' placeholder='enter password....'/>
        </div>
               <input type="submit" name="" value="login" className='bg-blue-300 rounded-md cursor-pointer p-2' />
        </form>
       </div>
    </div>

    <Footer />
    </>
  )
}

export default Login
