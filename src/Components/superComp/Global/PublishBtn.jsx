import React from 'react';
import { Button , IconButton} from '@mui/material';
import { useState } from 'react';
import {Link, Tooltip} from '@mui/material';
import { Navigate, useNavigate } from 'react-router-dom';
import {FileDoneOutlined} from '@ant-design/icons'
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { message, Space } from 'antd';

const PublishBtn = ({ data, onFirstButtonClick, onSecondButtonClick, onThirdButtonClick, component:Component }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const handleFirstButtonClick = () => {
    onFirstButtonClick(data);

    //alert
    messageApi.open({
      type: 'success',
      content: 'Published',
    });
  };

  const handleSecondButtonClick = () => {
    onSecondButtonClick(data);
  };

  const handleThirdButtonClick=()=>{
    onThirdButtonClick(data);

    //alert
    messageApi.open({
      type: 'error',
      content: 'Rejected',
    });
  }

  return (
    <div className=''>
      <Space>
        {contextHolder}
      <Tooltip title='Submit' arrow>
        <IconButton color='success' onClick={handleFirstButtonClick}>
          <ThumbUpAltIcon />
        </IconButton>
      </Tooltip>

      <Tooltip title='View' arrow>
        <IconButton color='warning' onClick={handleSecondButtonClick}>
          <Component />
        </IconButton>
      </Tooltip>

      <Tooltip title='Reject' arrow>
        <IconButton color='error' onClick={handleThirdButtonClick}>
          <ThumbDownAltIcon />
        </IconButton>
      </Tooltip>
      </Space>
      
      {/* <Tooltip title='Submit' arrow>
        <Button onClick={handleFirstButtonClick} color='success' endIcon={<FileDoneOutlined />}></Button>
      </Tooltip>
      <Tooltip title='Submit' arrow>
        <Button onClick={handleSecondButtonClick} color='warning'>View</Button>
      </Tooltip>
      <Tooltip title='Submit' arrow>
        <Button onClick={handleThirdButtonClick} color='error'>rejected</Button>
      </Tooltip> */}
    </div>
  );
};

export default PublishBtn;
