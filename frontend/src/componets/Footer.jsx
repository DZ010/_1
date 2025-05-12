import React from 'react'

const Footer = () => {
  return (
    <div>
      <footer className='fixed bg-blue-500 bottom-0 h-30 w-full text-center items-center text-white '>
   <h1 className='mt-12'>&copy; {new Date().getFullYear()} All rights reserved St</h1>
      </footer>
    </div>
  )
}

export default Footer
