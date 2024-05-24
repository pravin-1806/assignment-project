import React from 'react'
import { useSidebar } from '../../../ContextStore/SideBarContextSuper'

const Dashboard = () => {
  const {isCollapsedSuper} =useSidebar();

  return (
    <div className='pl-3 dark:bg-slate-900' style={{ width: isCollapsedSuper ? `calc(100% - 80px)` : `calc(100% - 200px)`, marginLeft: isCollapsedSuper ? '80px' : '200px', height:'92.80vh' }}>
      <h1 className='font-semibold text-4xl dark:text-white'>Dash test</h1>
    </div>
  )
}

export default Dashboard
