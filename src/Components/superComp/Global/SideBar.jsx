import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu, Button } from 'antd';
import { MenuOutlined, DoubleRightOutlined, CloseOutlined,PieChartOutlined } from '@ant-design/icons';
import PostAddIcon from '@mui/icons-material/PostAdd';
import { useSidebar } from '../../../ContextStore/SideBarContextSuper';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
const { Sider } = Layout;

const SideBar = () => {
  // const [isCollapsed, setIsCollapsed] = useState(false);
  const {isCollapsedSuper, setIsCollapsedSuper}=useSidebar();

  return (
    <div>
      <Sider collapsed={isCollapsedSuper} collapsible trigger={null} style={{ height: '90vh', backgroundColor: 'white',width:'200px', borderRight: '1px solid #f0f0f0',position:'fixed'}}>
      <Menu>
        {isCollapsedSuper
         && (
          <menuBox className='d-flex justify-content-center'>
            <Button key='Expand' onClick={() => { setIsCollapsedSuper(!isCollapsedSuper) }} icon={<DoubleRightOutlined />} />
          </menuBox>
        )}
      </Menu>
      <Menu>
      {!isCollapsedSuper && (
          <menuBox className='' style={{position:'absolute',marginLeft:'100%'}}>
            <Button onClick={() => { setIsCollapsedSuper(!isCollapsedSuper) }} icon={<CloseOutlined />} />
          </menuBox>
        )}
      </Menu>

      <Menu className='' style={{marginTop:!isCollapsedSuper?'30px':'15px'}}> 
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
