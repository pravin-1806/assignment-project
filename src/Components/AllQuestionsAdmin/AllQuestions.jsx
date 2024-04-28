import React, { useEffect, useState } from 'react'
import { useSidebar } from '../../ContextStore/SideBarContext'
import { Tabs } from 'antd';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import QuestionListing from './QuestionListing';
import Grid from './Grid';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

const AllQuestions = () => {
    const { isCollapsed } = useSidebar();
    const [questionType,setQuestionType]=useState('Manual Entry');
    const [testDetails,setTestDetails]=useState();


    const items = [
        {
            key: '1',
            label: 'All',
            children: <QuestionListing type='nothing'/>,
        },
        {
            key: '2',
            label: 'Pending',
            children: <QuestionListing type='review'/>
        },
        {
            key: '3',
            label: 'Published',
            children: <Grid/>
        },
        {
            key: '4',
            label: 'Rejected',
            children: <QuestionListing type='rejected'/>
        }
    ];

    const ListItem=[
        {label:'Manual Entry'},
        {label:'AI Generator'},
        {label:'AI Generator With Sample'},
    ]

    const defaultValue = ListItem.find(item => item.label === "Manual Entry");

    const handleOptionChange=(event,value)=>{
        setQuestionType(value.label);
        console.log(value.label)
    }

    return (
        <div className='ps-4' style={{ width: isCollapsed ? `calc(100% - 80px)` : `calc(100% - 222px)`, marginLeft: isCollapsed ? '80px' : '220px' }}>
            <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={ListItem}
                sx={{ width: 300 }}
                onChange={handleOptionChange}
                renderInput={(params) => <TextField {...params} label="Select Type" />}
                size='small'
                style={{width:'200px',marginTop:'5px'}}
                defaultValue={defaultValue}
            />
            <Tabs
                defaultActiveKey='1'
                items={items}
                size='small'
                tabPosition='top'
            />
        </div>
    )
}

export default AllQuestions
