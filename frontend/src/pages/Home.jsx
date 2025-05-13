import React from 'react'
import Footer from '../componets/footer'
import Appbar from '../componets/Appbar'

const Home = () => {
  return (
    <>
    <Appbar />
      <div className="flex items-center text-center justify-center pt-80 ">
   <h1 className='text-4xl font-serif'>Welcome to HR Dashboard</h1>
      </div>
    <Footer />
    </>
  )
}

export default Home
