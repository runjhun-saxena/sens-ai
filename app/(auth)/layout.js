import React from 'react'

const AuthLayout = ({ children }) => {
  return (
    <div className='flex justify-center pt-38 mb-3.5'>
      {children}
    </div>
  )
}

export default AuthLayout