import React, { useState, useEffect, useRef, useMemo } from 'react'
import { useSidebar } from '../../../ContextStore/SideBarContextSuper';
import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import PublishBtn from '../Global/PublishBtn'
import { useNavigate } from 'react-router-dom'
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useSelector } from 'react-redux';

const ReviewRequest = () => {
  const { isCollapsedSuper } = useSidebar();
  const [reviewRequest, setReviewRequest] = useState();
  const ThemeMode=useSelector(store=>store.Theme.mode);

  const nav=useNavigate();

  const setReviewRequestRef=useRef();
  const reviewRequestRef=useRef();

  // const PublishBtn = ({data}) => {
  //   console.log(data);
  //   const {testCode}=data;
  //   return (
  //     <div>
  //         <button className='me-3' onClick={()=>{onClickAction(testCode)}}>Publish!!</button>
  //         <button onClick={()=>alert('heyyyyyyyy')}>View</button>
  //     </div>
  //   )
  // }

  const [colDef, setColDef] = useState([
    { field: 'TestCode' },
    { field: 'CreatedAt' },
    { field: 'Status' },
    { field: 'CreatedBy' },
    // { field: 'Action',cellRenderer:PublishBtn },
    {
      headerName: 'Actions',
      cellRenderer: (params) => (
        <PublishBtn
          data={params.data}
          onFirstButtonClick={(data)=>handleFirstButtonClick(data)}
          onSecondButtonClick={(data)=>handleSecondButtonClick(data)}
          onThirdButtonClick={(data)=>handleThirdButtonClick(data)}
          component={VisibilityIcon}
        />
      )
    },
  ]);

  useEffect(() => {
    reviewRequestRef.current = reviewRequest;
    setReviewRequestRef.current = setReviewRequest;
  }, [reviewRequest]);

  const [rowData, setRowData] = useState();

  useEffect(() => {
    //creating useRef for setReviewRequest
    // setReviewRequestRef.current=setReviewRequest;
    // reviewRequestRef.current=reviewRequest;

    //fetching data from API
    const url = new URL('https://660ce9c73a0766e85dbeed02.mockapi.io/api/p1/manualQuestions');
    fetch(url, {
      method: 'GET',
      headers: { 'content-type': 'application/json' }
    }).then(res => {
      if (res.ok) {
        return res.json();
      }
    }).then(data => {
      console.log(data);
      setReviewRequest(data);
      const filteredData = data.filter(item => item.status == 'review')
      console.log('filtered data ', filteredData)
      const rowDatas = filteredData.map((item) => {
        return { TestCode: item.testCode, CreatedAt: item.createdAt, Status: item.status, CreatedBy: item.createdBy }
      });

      setRowData(rowDatas)
      console.log('rowDatas', rowDatas)

    }).catch(error => {
      console.log("error spoted on fetching data on Review Request " + error);
    })
  }, [])

  // const onClickAction = (testCode) => {
  //   if (testCode) {
  //     console.log(testCode);
  //     console.log(rowData);
  //     const updatedRowData = rowData.map(item => {
  //       if (item.TestCode === testCode) {
  //         return { ...item, Status: 'Published' };
  //       }
  //       return item;
  //     });
  //     setRowData(updatedRowData);
  //   }

  //     fetch('https://PROJECT_TOKEN.mockapi.io/tasks/testCode=something', {
  //       method: 'PUT', // or PATCH
  //       headers: { 'content-type': 'application/json' },
  //       body: JSON.stringify({ completed: true })
  //     }).then(res => {
  //       if (res.ok) {
  //         return res.json();
  //       }
  //       // handle error
  //     }).then(task => {
  //       // Do something with updated task
  //     }).catch(error => {
  //       // handle error
  //     })

  // };

  const updateReviewRequest=(updatedTask)=>{
    setReviewRequestRef.current(updatedTask);
    console.log(reviewRequest);
  }

  const handleFirstButtonClick = (Rdata) => {
    console.log('First Button Clicked', Rdata);

    fetch('https://660ce9c73a0766e85dbeed02.mockapi.io/api/p1/manualQuestions', {
      method: 'GET',
      headers: { 'content-type': 'application/json' }
    }).then(res => {
      if (res.ok) {
        return res.json();
      }
      throw new Error('Network response was not ok.');
    }).then(tasks => {
      const taskToUpdate = tasks.find(task => task.testCode === Rdata.TestCode);
      if (taskToUpdate) {
        taskToUpdate.status = 'published';

        return fetch(`https://660ce9c73a0766e85dbeed02.mockapi.io/api/p1/manualQuestions/${taskToUpdate.id}`, {
          method: 'PUT',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify(taskToUpdate)
        });
      } else {
        throw new Error('Task with testCode TEST@M1 not found.');
      }
    }).then(res => {
      if (res.ok) {
        return res.json();
      }
      throw new Error('PUT request failed.');
    }).then(updatedTask => {
      console.log('Status updated successfully:', updatedTask);
      updateReviewRequest(updatedTask);
      console.log('Heyyyyyyyyyy',reviewRequestRef.current);
    }).catch(error => {
      console.error('Error:', error);
    });
  };
  

  const handleSecondButtonClick = (Rdata) => {
    console.log('Second Button Clicked', Rdata);
    nav(`/super-admin/home/review-request/details/${Rdata.TestCode}`);
  };

  const handleThirdButtonClick=(Rdata)=>{
    console.log('Third Button Clicked', Rdata);

    fetch('https://660ce9c73a0766e85dbeed02.mockapi.io/api/p1/manualQuestions', {
      method: 'GET',
      headers: { 'content-type': 'application/json' }
    }).then(res => {
      if (res.ok) {
        return res.json();
      }
      throw new Error('Network response was not ok.');
    }).then(tasks => {
      const taskToUpdate = tasks.find(task => task.testCode === Rdata.TestCode);
      if (taskToUpdate) {
        taskToUpdate.status = 'rejected';

        return fetch(`https://660ce9c73a0766e85dbeed02.mockapi.io/api/p1/manualQuestions/${taskToUpdate.id}`, {
          method: 'PUT',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify(taskToUpdate)
        });
      } else {
        throw new Error('Task with testCode TEST@M? not found.');
      }
    }).then(res => {
      if (res.ok) {
        return res.json();
      }
      throw new Error('PUT request failed.');
    }).then(updatedTask => {
      console.log('Status updated successfully:', updatedTask);
      updateReviewRequest(updatedTask);
    }).catch(error => {
      console.error('Error:', error);
    });
  };

  const defaultColDef=useMemo(()=>{
    return {
      filter:'agTextColumnFilter',
      floatingFilter:true,
    }
  },[]);


  return (
    <div className={`p-3   dark:bg-slate-900 text-white`} id="myGrid" style={{ width: isCollapsedSuper ? `calc(100% - 80px)` : `calc(100% - 200px)`, marginLeft: isCollapsedSuper ? '80px' : '200px', height: '92.8vh' }}>
      <h2 className='font-semibold text-4xl mb-4'>Review Requests</h2>
      <div style={{ width: '1050px', height: '500px' }} className={`${ThemeMode==='light'? 'ag-theme-quartz':'ag-theme-quartz-dark'}`}>
        <AgGridReact
          rowData={rowData}
          columnDefs={colDef}
          pagination={true}
          paginationPageSize={10}
          paginationPageSizeSelector={[10, 25, 50]}
          defaultColDef={defaultColDef}
        />
      </div>
    </div>
  )
}

export default ReviewRequest