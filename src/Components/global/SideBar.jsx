import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu, Button } from 'antd';
import { MenuOutlined, DoubleRightOutlined, DoubleLeftOutlined ,CloseOutlined,PieChartOutlined } from '@ant-design/icons';
import PostAddIcon from '@mui/icons-material/PostAdd';
import { useSidebar } from '../../ContextStore/SideBarContext';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import SearchBar from './SearchBar';
const { Sider } = Layout;

const SideBar = () => {
  // const [isCollapsed, setIsCollapsed] = useState(false);
  const {isCollapsed, setIsCollapsed}=useSidebar();

  return (
    <div>
      <Sider collapsed={isCollapsed} collapsible trigger={null} style={{ height: '90vh', backgroundColor: 'white',width:'200px', borderRight: '1px solid #f0f0f0',position:'fixed'}}>
      <Menu>
        {isCollapsed && (
          <menuBox className='d-flex justify-content-center'>
            <Button key='Expand' onClick={() => { setIsCollapsed(!isCollapsed) }} icon={<DoubleRightOutlined />} />
          </menuBox>
        )}
      </Menu>
      <Menu>
      {!isCollapsed && (
          <menuBox className='' style={{position:'absolute',marginLeft:'80%'}}>
            <Button onClick={() => { setIsCollapsed(!isCollapsed) }} icon={<DoubleLeftOutlined />} />
          </menuBox>
        )}
      </Menu>
      
      
      <Menu className='' style={{marginTop:!isCollapsed?'30px':'15px'}}>
        <Menu.Item key="Dashboard" icon={<PieChartOutlined />}>
          <Link to='/admin/home/dashboard'/>Dashboard
        </Menu.Item>
        <Menu.Item key="Question Generator" icon={<PostAddIcon />}>
          <Link to='/admin/home/question-generator'/>Question Generator
        </Menu.Item>
        <Menu.Item key="Questions" icon={<FormatListBulletedIcon />}>
          <Link to='/admin/home/all-questions'/>All Questions
        </Menu.Item>
      </Menu>
    </Sider>
    </div>
  );
}

export default SideBar;
