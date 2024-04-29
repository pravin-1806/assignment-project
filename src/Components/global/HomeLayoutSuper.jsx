import React from 'react'
import SideBar from '../superComp/Global/SideBar'
import { Outlet } from 'react-router-dom'
import TopBar from './TopBar'

const HomeLayoutSuper = () => {
  const RouteListSuper=[
    {title:'Dashboard'},
    {title:'Review-Request'},
    {title:'Questions'}
  ];

  return (
    <div>
      <TopBar
        RouteList={RouteListSuper}
      />
      <div>
        <SideBar />
        <Outlet />
      </div>
    </div>
  )
}

export default HomeLayoutSuper