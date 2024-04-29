import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSidebar } from '../../../ContextStore/SideBarContextSuper';
import { List } from 'antd'
import PublishBtn from './PublishBtn';
import { useNavigate } from 'react-router-dom';
import CancelIcon from '@mui/icons-material/Cancel';
import { message, Space } from 'antd';
import Divider from '@mui/material/Divider';

const ViewQuestion = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const { id } = useParams();
  const { isCollapsedSuper } = useSidebar();
  const [testDetails,setTestDetails]=useState();
  const [datas, setDatas] = useState();
  const [questions, setQuestions] = useState();

  const nav=useNavigate();

  useEffect(() => {
    const url = 'https://660ce9c73a0766e85dbeed02.mockapi.io/api/p1/manualQuestions'
    fetch(url, {
      method: 'GET',
      headers: { 'content-type': 'application/json' }
    }).then(res => {
      if (res.ok) {
        return res.json();
      }
    }).then(
      data => {
        const filteredData = data.filter(item => item.testCode == id);
        setTestDetails(filteredData[0]);
        setDatas(filteredData[0].questions);
        const f = filteredData[0].questions;
        const dataArray = Object.keys(f).map(key => ({
          title: key,
          description: f[key]
        }));
        console.log(dataArray);
        setQuestions(dataArray);
      })
  }, []);

  const handleFirstButtonClick = () => {
    console.log('First Button Clicked', testDetails);

    const taskToUpdate={...testDetails};
    taskToUpdate.status='published';

    console.log(taskToUpdate.id)
    fetch(`https://660ce9c73a0766e85dbeed02.mockapi.io/api/p1/manualQuestions/${taskToUpdate.id}`, {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(taskToUpdate)
    }).then(res=>{
      if(res.ok){
        return res.json();
      }
    }).then(data=>{
      console.log('Final updated data',data);
    });
    nav(`/super-admin/home/review-request`);
  };

  const handleSecondButtonClick = () => {
    console.log('Second Button Clicked', testDetails);
    nav(`/super-admin/home/review-request`);
  };

  const handleThirdButtonClick=()=>{
    console.log('Third Button Clicked', testDetails);

    const taskToUpdate={...testDetails};
    taskToUpdate.status='rejected';

    console.log(taskToUpdate.id);
    fetch(`https://660ce9c73a0766e85dbeed02.mockapi.io/api/p1/manualQuestions/${taskToUpdate.id}`, {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(taskToUpdate)
    }).then(res=>{
      if(res.ok){
        return res.json();
      }
    }).then(data=>{
      console.log('Final updated data',data);
    });
    nav(`/super-admin/home/review-request`);

    //alert
    messageApi.open({
      type: 'error',
      content: 'Rejected',
    });
  }

  return (
    <div className='ps-3' style={{ width: isCollapsedSuper ? `calc(100% - 80px)` : `calc(100% - 222px)`, marginLeft: isCollapsedSuper ? '80px' : '220px' }}>
      
      <div className='d-flex flex-row justify-content-between me-5'>
        <div>
          <h3>Review request/details</h3>
          <p>Question ID: {id}</p>
        </div>
        
        <Space>
        <div className='d-flex align-items-end'>
          
            {contextHolder}
          <PublishBtn
            onFirstButtonClick={(data)=>handleFirstButtonClick(data)}
            onSecondButtonClick={(data)=>handleSecondButtonClick(data)}
            onThirdButtonClick={(data)=>handleThirdButtonClick(data)}
            component={CancelIcon}
          />
          
        </div>
        </Space>
      </div>
      <div>
        <List
          itemLayout="horizontal"
          dataSource={questions}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                title={item.title}
                description={item.description}
              />
            </List.Item>
          )}
        />
      </div>
      
    </div>
  )
}

export default ViewQuestion
