import React from 'react'
import Footer from '../componets/footer'

const Login = () => {
  return (
    <>
    <div className="bg-blue-500 h-12 flex">
            <h1 className='text-3xl text-white pl-5 font-sans'>St Luke Hospital</h1>
       
    </div>
    <div className="flex flex-col items-center justify-center text-center mt-70 ">
       <div className="shadow-md p-6 rounded-md w-80">
        <div className="mb-4">
            <label htmlFor="usernaem" className='text-left  mb-2 text-gray-700'>Username:</label>
            <input type="text" className='
            border-2 border-gray-200 
            ' placeholder='enter username....'/>
        </div>
          <div className="mb-4">
            <label htmlFor="password" className='text-left  mb-2 text-gray-700'>password:</label>
            <input type="text" className='
            border-2 border-gray-200 
            ' placeholder='enter password....'/>
        </div>
               <input type="submit" name="" value="login" className='bg-blue-300 rounded-md cursor-pointer p-2' />

       </div>
    </div>
    <Footer />
    </>
  )
}

export default Login
