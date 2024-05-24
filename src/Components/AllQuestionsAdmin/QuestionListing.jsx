import React, { useEffect, useState } from 'react'
import Grid from './Grid';

const QuestionListing = ({type}) => {
    const [tests,setTests]=useState();
    const [filteredData,setFilteredData]=useState();

    const [rowData,setRowData]=useState();

    useEffect(()=>{
        const url=`https://660ce9c73a0766e85dbeed02.mockapi.io/api/p1/manualQuestions`;
        fetch(url,{
            method: 'GET',
            headers: { 'content-type': 'application/json' }
        }).then(res=>{
            if(res.ok){
                return res.json();
            }
        }).then(data=>{
            console.log(type)
            console.log(data);
            setTests(data);
            if(type=='nothing')
            {
                const rowDatas = data.map((item) => {
                    return { TestCode: item.testCode, CreatedAt: item.createdAt, Status: item.status, CreatedBy: item.createdBy }
                });
                setRowData(rowDatas)
            }else if(type=='review'){
                const filteredD = data.filter(item => item.status == 'review');
                setFilteredData(filteredD);
                const rowDatas = filteredD.map((item) => {
                    return { TestCode: item.testCode, CreatedAt: item.createdAt, Status: item.status, CreatedBy: item.createdBy }
                });
                setRowData(rowDatas)
                console.log('review',rowDatas)
                console.log('state',rowData)
            }else if(type=='published'){
                const filteredD=data.filter(item=>item.status==type)
                setFilteredData(filteredD);
                const rowDatas = filteredD.map((item) => {
                    return { TestCode: item.testCode, CreatedAt: item.createdAt, Status: item.status, CreatedBy: item.createdBy }
                });
                setRowData(rowDatas)
                console.log('published',rowDatas)
                console.log('state',rowData)
            }else if(type=='rejected'){
                const filteredD=data.filter(item=>item.status==type)
                setFilteredData(filteredD);
                const rowDatas = filteredD.map((item) => {
                    return { TestCode: item.testCode, CreatedAt: item.createdAt, Status: item.status, CreatedBy: item.createdBy }
                });
                setRowData(rowDatas)
                console.log('rejected',rowDatas)
                console.log('state',rowData)
            }
        })
    },[]);
    
  return (
    <div>
      <Grid rowData={rowData}
      />
    </div>
  )
}

export default QuestionListing
