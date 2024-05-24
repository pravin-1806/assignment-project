import { calc } from 'antd/es/theme/internal'
import React from 'react'
import { useSidebar } from '../../ContextStore/SideBarContext'

const Dashboard = () => {
  const {isCollapsed}=useSidebar();
  return (
    <div className='pl-3' style={{ width: isCollapsed ? `calc(100% - 80px)` : `calc(100% - 222px)`,marginLeft:isCollapsed?'80px':'220px' }}>
      <h1 className='text-4xl font-semibold '>Dashboard</h1>
    </div>
  )
}

export default Dashboard
