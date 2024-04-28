import React from 'react'
import SideBar from './SideBar'
import TopBar from './TopBar'
import {Outlet} from 'react-router-dom'

const HomeLayoutAdmin = () => {
  const RouteListAdmin=[
    {title:'Dashboard'},
    {title:'Question-Generator'},
    {title:'All-Questions'},
  ];
  return (
    <div>
      <TopBar
        RouteList={RouteListAdmin}
      />
      <div className=''>
        <SideBar/>
        <Outlet/>
      </div>
    </div>


    // <div className='d-flex '>
    //   <SideBar/>
    //   <main className='w-100 h-100'>
    //     <TopBar/>
    //     <Outlet/>
    //   </main>
    // </div>
  )
}

export default HomeLayoutAdmin