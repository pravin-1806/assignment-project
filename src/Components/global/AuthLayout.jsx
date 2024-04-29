import React from 'react'
import Header from './Header'
import {Outlet} from 'react-router-dom'

const Auth = () => {
  return (
    <div className='h-50'>
      <Header/>
      <Outlet/>
    </div>
  )
}

export default Auth
