import React from 'react'
import { useSidebar } from '../../../ContextStore/SideBarContextSuper'

const Dashboard = () => {
  const {isCollapsedSuper} =useSidebar();

  return (
    <div className='ps-3' style={{ width: isCollapsedSuper ? `calc(100% - 80px)` : `calc(100% - 222px)`,marginLeft:isCollapsedSuper?'80px':'220px'}}>
      <h1>Dash test</h1>
    </div>
  )
}

export default Dashboard
