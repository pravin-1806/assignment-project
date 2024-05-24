  import React from 'react';
  import { Tabs } from 'antd';
  import ManualGen from './ManualGen';
  import TimeLine from './subComp/TimeLine';
  import './qnGen.css'
  import { calc } from 'antd/es/theme/internal';
  import { useSidebar } from '../../ContextStore/SideBarContext';

  const QnGenetator = () => {
    const {isCollapsed} =useSidebar();

    // const onChange = (key) => {
    //   console.log(key);
    // };

    const items = [
      {
        key: '1',
        label: 'Manual Entry',
        children: <ManualGen />,
      },
      {
        key: '2',
        label: 'AI Generator',
        children: 'Content of Tab Pane 2'
      },
      {
        key: '3',
        label: 'AI Generator using Sample',
        children: 'Content of Tab Pane 3'
      },
    ];

    return (
      <div className='pl-3' style={{ width: isCollapsed ? `calc(100% - 80px)` : `calc(100% - 222px)`,marginLeft:isCollapsed?'80px':'220px' }}>
        <Tabs
          defaultActiveKey='1'
          items={items}
          size='small'
          tabPosition='top'
        />
        
      </div>
    )
  }

  export default QnGenetator
