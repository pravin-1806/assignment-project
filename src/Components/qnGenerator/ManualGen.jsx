import React, { useState, useEffect } from 'react'
import { Steps, Button } from 'antd'
import TimeLine from './subComp/TimeLine'
import TextArea from './subComp/TextArea'
import { useForm, Controller } from 'react-hook-form'
import AddIcon from '@mui/icons-material/Add';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import { message, Space } from 'antd';
import { useNavigate } from 'react-router-dom'
import { Form } from 'react-hook-form'
import './qnGen.css'

const ManualGen = () => {
  const { handleSubmit, control, reset } = useForm();
  const [boxCount, setBoxCount] = useState(3);
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState({});
  const [testCode, setTestCode] = useState('');
  const [userCredent,setUserCredent]=useState();
  const [messageApi, contextHolder] = message.useMessage();

  const nav=useNavigate();

  const handleAddNew = () => {
    setBoxCount(boxCount + 1);
  }
  const handleRemoveNew=()=>{
    setBoxCount(boxCount - 1);
  }

  useEffect(() => {
    // Retrieve the object from local storage
    const storedObject = localStorage.getItem('userCredent');
    if (storedObject) {
      const parsedObj = JSON.parse(storedObject);
      setUserCredent(parsedObj);
    }
  }, []);

  const handleReview = (data) => {
    setQuestions(data);
    const code = handleTestCodeGeneration();
    
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    const dateFormat = `${year}-${month}-${day}`

    const obj =
    {
      'testCode': code,
      'status': 'review',
      'createdAt': dateFormat,
      'questions': data,
      'createdBy': userCredent.name,
    }
    
    console.log(JSON.stringify(obj));

    //POST METHOD
    try{
      const url = new URL('https://660ce9c73a0766e85dbeed02.mockapi.io/api/p1/manualQuestions');
    fetch(url, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(obj) 
    }).then(res => {
      if (res.ok) {
        return res.json();
      }
      throw new Error('Failed to post manual questions');
    }).then(task => {
      console.log('New task posted ', task);
      reset();
      messageApi.open({
        type: 'success',
        content: 'Sent to Super-Admin for review',
      });
      setBoxCount(3);

    }).catch(error => {
      console.log('Error spotted on Posting data to manualQuestions ',error);
    })
    }catch(error){
      console.error('JSON stringify error',error)
    }

    //--------------------------------
    //alert
    
  }


  const handleTestCodeGeneration = () => {
    let code = `TEST@M${questions.length + 1}`;
    setTestCode(code);
    return code;
  }

  const renderForm = () => {
    const arr = [];
    for (let i = 0; i < boxCount; i++) {
      arr.push(
        <Controller
          key={i + 1}
          name={`Question${i + 1}`}
          control={control}
          render={({ field }) => (
            <TextArea
              num={i + 1}
              {...field}
            />
          )}
        />
      )
    }
    return arr
  }

  useEffect(() => {
    const url = new URL('https://660ce9c73a0766e85dbeed02.mockapi.io/api/p1/manualQuestions');

    fetch(url, {
      method: 'GET',
      headers: { 'content-type': 'application/json' }
    }).then(res => {
      return res.json();
    }).then(data => {
      setQuestions(data);
    }).catch(error => {
      console.log("error spoted on fetching data from ManualQuestions " + error);
    })
  }, [])

  // const handleSubmitButton=()=>{
  //   r
  //   //alert
  //   messageApi.open({
  //     type: 'success',
  //     content: 'Sent to Super-Admin for review',
  //   });

  //   nav('/admin/home/question-generator');
  // }

  return (
    <div>
      <form onSubmit={handleSubmit((data) => { handleReview(data) })}>
        {/* <TimeLine /> */}
        <Space className='flex justify-end'>
        {contextHolder}
        <div className='mr-5'>
          <button type='submit' className='border button-review'  style={{borderRadius:'4px', padding:'5px 8px', backgroundColor:'#5cb85c', color:'white', fontWeight:'bold'}}>Review <PublishedWithChangesIcon/></button>
        </div>
        </Space>
        {
          renderForm()
        }
        <div className='sticky bottom-0 '>
        <Button onClick={handleAddNew} icon={<ControlPointIcon/>} className='mt-3 mb-2'>Add</Button>
        <Button onClick={handleRemoveNew} icon={<RemoveCircleOutlineIcon/>} className='mt-3 mb-2 ml-1'>Remove</Button>
        </div>
      </form>
      
    </div>
  )
}
export default ManualGen
