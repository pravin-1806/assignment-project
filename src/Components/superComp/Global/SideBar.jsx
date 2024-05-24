import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu, Button } from 'antd';
import { MenuOutlined, DoubleRightOutlined,DoubleLeftOutlined, CloseOutlined,PieChartOutlined } from '@ant-design/icons';
import PostAddIcon from '@mui/icons-material/PostAdd';
import { useSidebar } from '../../../ContextStore/SideBarContextSuper';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import { useSelector } from 'react-redux';
const { Sider } = Layout;

const SideBar = () => {
  // const [isCollapsed, setIsCollapsed] = useState(false);
  const {isCollapsedSuper, setIsCollapsedSuper}=useSidebar();
  const ThemeMode=useSelector(store=>store.Theme.mode);

  return (
    <div className='dark:bg-slate-800 dark:text-white fixed left-0' style={{backgroundColor: `${ThemeMode?'white':'#001529'}`,marginRight:'0px',paddingRight:'0px'}}>
      <Sider theme={`${ThemeMode==='dark'?'dark':'light'}`} className='dark:bg-slate-800 dark:text-white ' collapsed={isCollapsedSuper} collapsible trigger={null} style={{ height: '93vh', backgroundColor: `${ThemeMode==='light'?'white':'#001529'}`, borderRight: `${ThemeMode==='light'?'1px solid #f0f0f0':'1px solid #001529'}`,width:'200px'}}>
      <Menu theme={`${ThemeMode==='dark'?'dark':'light'}`}>
        {isCollapsedSuper
         && (
          <menuBox className='flex justify-center pt-2' theme={`${ThemeMode==='dark'?'dark':'light'}`}>
            <Button key='Expand' onClick={() => { setIsCollapsedSuper(!isCollapsedSuper) }} icon={<DoubleRightOutlined />} />
          </menuBox>
        )}
      </Menu>
      <Menu theme={`${ThemeMode==='dark'?'dark':'light'}`}>
      {!isCollapsedSuper && (
          <menuBox className='absolute ml-40 pt-2' >
            <Button onClick={() => { setIsCollapsedSuper(!isCollapsedSuper) }} icon={<DoubleLeftOutlined />} />
          </menuBox>
        )}
      </Menu>

      <Menu style={{paddingTop:!isCollapsedSuper?'45px':'15px'}} theme={`${ThemeMode==='dark'?'dark':'light'}`}> 
        <Menu.Item key="Dashboard" icon={<PieChartOutlined />}>
          <Link to='/super-admin/home/dashboard'/>Dashboard
        </Menu.Item>
        <Menu.Item key="Question Generator" icon={<PostAddIcon />}>
          <Link to='/super-admin/home/review-request'/>Review Request
        </Menu.Item>
        <Menu.Item key="Questions" icon={<FormatListBulletedIcon />}>
          <Link to='/super-admin/home/all-questions'/>All Questions
        </Menu.Item>
      </Menu>
      
    </Sider>
    </div>
  );
}

export default SideBar;
